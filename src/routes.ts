import { Router } from 'express';
import userRouter from './app/routes/user/index.routes';
import formRouter from './app/routes/form/index.routes';

const routes = Router();

routes.use(`/user`, userRouter);
routes.use(`/form`, formRouter);

export default routes;
