import * as webpack from 'webpack';
import { NextHandleFunction } from 'connect';


declare namespace WebpackHotServerMiddleware {
    interface Options {
        chunkName: string;
        serverRendererOptions: any;
    }

    function webpackHotServerMiddleware(
        multiCompiler: webpack.MultiCompiler,
        options?: Options): NextHandleFunction;
}

export = WebpackHotServerMiddleware.webpackHotServerMiddleware;

