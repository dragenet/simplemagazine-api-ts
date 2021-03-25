import { NextFunction, Request, Response } from 'express';

export const inejctErrorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  req.error = err;
  next();
};
