import supertest from 'supertest';
import express from 'express';
import server from '../../index';

type Response = supertest.Response;

let app: express.Express;

describe('/greet', () => {

    beforeEach(() => {
        app = express();
        server(app);
    });

    it('should return a greeting', async () => {
        const response: Response = await supertest(app).get('/greet');
        expect(response.status).toBe(200);
        expect(response.text).toBe('Hello from express!');
    });
});
