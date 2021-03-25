import { NextFunction, Request, Response } from 'express';
import { ExpressLogger as Logger } from '@/utils/ExpressLogger';
import { ClientError } from '@/errors/ClientError';

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  req.startedAt = process.hrtime.bigint();

  // using native node HTTP event for connection end
  req.on('end', () => {
    if (!req.error) return Logger.info(req, res);
    if (req.error instanceof ClientError) return Logger.warn(req, res, req.error.toString());
    Logger.error(req, res, req.error.toString());
  });

  next();
};
