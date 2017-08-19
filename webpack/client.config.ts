// we normally aren't allowed `import` being here because our tsconfig.json file targets ES6
// modules and `ts-node` doesn't support ES6 (hence the use of webpack). However, because the
// only place where `Webpack` is referenced is inside type declarations, the import statement is
// removed at transpilation-time so no error occurs.
import { Configuration, Plugin } from 'webpack';

const webpack = require('webpack');
const path = require('path');
const WriteFilePlugin = require('write-file-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');

const resolve = (p: string) => path.resolve(__dirname, p);

const entry = [resolve('../client/index.tsx')];

const plugins: Plugin[] = [
    new WriteFilePlugin(),
    new ExtractCssChunks(),
    new webpack.optimize.CommonsChunkPlugin({
        names: ['bootstrap'], // needed to put webpack bootstrap code before chunks
        filename: '[name].js',
        minChunks: Infinity,
    }),

    new webpack.EnvironmentPlugin(['NODE_ENV']),
];

const babelPlugins: string[] = ['universal-import', 'react-css-modules'];

if (process.env.NODE_ENV === 'development') {

    const devEntries = [
        'webpack-hot-middleware/client'
            + '?path=/__webpack_hmr&timeout=20000&reload=false&quiet=false&noInfo=false',
        'react-hot-loader/patch',
    ];

    entry.unshift(...devEntries);

    const devPlugins: Plugin[] = [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    ];

    plugins.unshift(...devPlugins);

    babelPlugins.push('react-hot-loader/babel');
}

const config: Configuration = {
    entry,
    plugins,

    name: 'client',
    target: 'web',

    output: {
        filename: '[name].js',
        chunkFilename: '[name].js',
        path: resolve('../buildClient'),
        publicPath: '/static/',
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },

    devtool: 'source-map',

    module: {
        rules: [{
            test: /\.tsx?$/,
            // include: resolve('../client'),
            // exclude: [/node_modules/, resolve('../server')],
            use: [{
                loader: 'babel-loader',
                options: {
                    /* we want to disable es2015 modules ONLY in front-end code for HMR
                     * so we have to disable .babelrc and configure babel for webpack here.
                     */
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
            use: ExtractCssChunks.extract({
                use: [{
                    loader: 'css-loader',
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
            }),
        }],
    },
};

export default config;
