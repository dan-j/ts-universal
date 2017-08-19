/* eslint-disable import/no-extraneous-dependencies */
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import chokidar from 'chokidar';
import { Request, Response, RequestHandler, NextFunction } from 'express';
import path from 'path';
import clear from 'clear-require';

import webpackConfig from '../../webpack/client.config';

function setupMiddleware() {
    const compiler = webpack(webpackConfig);
    const devMiddleware: RequestHandler = webpackDevMiddleware(compiler);

    const hotMiddleware: RequestHandler = webpackHotMiddleware(compiler);

    // Do "hot-reloading" of express stuff on the server
    // Throw away cached modules and re-require next time
    // Ensure there's no important state in there!
    const watchPath = path.resolve('server/routes');
    const watcher = chokidar.watch(watchPath, {
        ignored: path.resolve(watchPath, 'app.ts'),
    });

    watcher.on('ready', () => {
        watcher.on('all', (event, filepath) => {
            clear(filepath);
        });
    });

    const delayMiddleware: RequestHandler = (
        req: Request, res: Response, next: NextFunction,
    ) => setTimeout(next, 1000);

    return [devMiddleware, hotMiddleware, delayMiddleware];
}

export default setupMiddleware;
