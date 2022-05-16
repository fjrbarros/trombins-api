import 'reflect-metadata';
import 'express-async-errors';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import './database/connect';
import routes from './routes';
import AppError from './error/AppError';
import { errors } from 'celebrate';
import uploadConfig from './config/upload';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/v1/files', express.static(uploadConfig.directory));
app.use('/v1', routes);
app.use(errors());

/* eslint-disable */
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error.',
    });
  },
);

app.listen(3333, () => console.log('Server started on port 3333!'));
/* eslint-enable */

// insert into "user" values (default, 'teste@develop.com','$2a$08$ZCPS3NnVYjcthYhtvSwDe.1O6KRep0.jPSHMaVIDZ78nrNQ91CZG.', 'Teste')
