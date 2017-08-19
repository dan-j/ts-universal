import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';
import server from './server';
import clientConfig from './webpack/client.config';
import serverConfig from './webpack/server.config';


const publicPath = clientConfig.output!.publicPath!;

let isBuilt = false;

const app = express();
server(app);

const done = (app: express.Express) => !isBuilt && app.listen(8080, () => {
    isBuilt = true;
    console.log('App listening on port 8080');
});

const compiler: any = webpack([clientConfig, serverConfig]);
const clientCompiler = compiler.compilers[0];
const options: webpackDevMiddleware.Options = { publicPath, stats: { colors: true } };

app.use(webpackDevMiddleware(compiler, options));
app.use(webpackHotMiddleware(clientCompiler));
app.use(webpackHotServerMiddleware(compiler));

compiler.plugin('done', () => done(app));
