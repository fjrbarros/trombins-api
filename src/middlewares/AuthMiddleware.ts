import { NextFunction, Request, Response } from 'express';
import AppError from '../error/AppError';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

export default function AuthMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { authorization } = request.headers;

  if (!authorization) {
    throw new AppError('Authorization not informed in the request header!');
  }

  const token = authorization?.replace('Bearer', '').trim() || '';

  try {
    const data = jwt.verify(token, 'secret');

    const { id } = data as TokenPayload;

    request.userId = id;

    return next();
  } catch {
    throw new AppError('Error during request!');
  }
}
