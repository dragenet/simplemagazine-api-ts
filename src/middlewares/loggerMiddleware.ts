import { NextFunction, Request, Response } from 'express';
import { ExpressLogger as Logger } from '@/utils/ExpressLogger';
import { ClientError } from '@/errors/ClientError';

export const infoLoggerMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  req.startedAt = process.hrtime.bigint();
  req.on('end', () => {
    if (!req.logged) Logger.info(req, res);
  });

  next();
};

export const errorLoggerMiddleware = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  if (err instanceof ClientError) Logger.warn(req, res, err.toString());
  else Logger.error(req, res, err.toString());

  req.logged = true;
  next();
};
