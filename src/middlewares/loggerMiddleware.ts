import { NextFunction, Request, Response } from 'express';
import { ExpressLogger as Logger } from '@/utils/ExpressLogger';

export const infoLoggerMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  req.on('end', () => {
    if (!req.logged) Logger.info(req, res);
  });

  next();
};

export const errorLoggerMiddleware = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  Logger.warn(req, res, err.toString());
  req.logged = true;
  next();
};
