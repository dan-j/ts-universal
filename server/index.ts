import { Express, Request, Response, NextFunction } from 'express';

// const app = express();
//
// if (process.env.NODE_ENV === 'development') {
//     app.use(devMiddleware());
// } else {
//     app.use(express.static(path.resolve('dist/client/')));
// }

function forceRequireRoutes(req: Request, res: Response, next: NextFunction) {
    require('./routes')(req, res, next);
}

export default (app: Express) => {
    app.use(forceRequireRoutes);
};
