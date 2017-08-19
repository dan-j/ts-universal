import * as fs from 'fs';
import * as path from 'path';
import * as webpack from 'webpack';

const WriteFilePlugin = require('write-file-webpack-plugin');

const resolve = (p: string) => path.resolve(__dirname, p);

const modeModules = resolve('../node_modules');
const output = resolve('../buildServer');

const entry = [resolve('../server/render.tsx')];

type Externals = {
    [key: string]: string,
};

// if you're specifying externals to leave unbundled, you need to tell Webpack
// to still bundle `react-universal-component`, `webpack-flush-chunks` and
// `require-universal-module` so that they know they are running
// within Webpack and can properly make connections to client modules:
const externals = fs
    .readdirSync(modeModules)
    .filter(x => !/\.bin|react-universal-component|webpack-flush-chunks/.test(x))
    .reduce<Externals>(
        (externals, mod: string) => {
            externals[mod] = `commonjs ${mod}`;
            return externals;
        },
        {});

externals['react-dom/server'] = 'commonjs react-dom/server';

const babelPlugins: string[] = ['universal-import', 'react-css-modules'];

if (process.env.NODE_ENV === 'development') {
    babelPlugins.push('react-hot-loader/babel');
}

const config: webpack.Configuration = {
    externals,
    entry,
    name: 'server',
    target: 'node',
    devtool: 'source-map',
    output: {
        path: output,
        filename: '[name].js',
        libraryTarget: 'commonjs2',
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            // include: resolve('../client'),
            exclude: /node_modules/,
            // exclude: [/node_modules/, resolve('../server')],
            use: [{
                loader: 'babel-loader',
                options: {
                    babelrc: false,
                    presets: ['es2015', 'react', 'stage-2'],
                    plugins: babelPlugins,
                },
            }, {
                loader: 'awesome-typescript-loader',
                options: {
                    configFileName: resolve('../tsconfig.json'),
                },
            }],
        }, {
            test: /\.s?css$/,
            use: [{
                loader: 'css-loader/locals',
                options: {
                    modules: true,
                    sourceMap: true,
                    // importLoaders: 1,
                    localIdentName: '[name]__[local]',
                },
                // }, {
                //     loader: 'sass-loader',
                //     options: {
                //         sourceMap: true,
                //     },
            }],
        }],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    plugins: [
        new WriteFilePlugin(),
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1,
        }),
        new webpack.EnvironmentPlugin(['NODE_ENV']),
    ],
};

module.exports = config;
