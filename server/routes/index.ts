import { Request, Response, Router } from 'express';

const router = Router();

router.get('/greet', (req: Request, res: Response) => {
    res.send('Hello from express!');
});

module.exports = router;
