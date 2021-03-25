import { NextFunction, Request, Response } from 'express';
import { ExpressLogger as Logger } from '../utils/Logger';

type Errors = Error;

interface RequestLogged extends Request {
  logged: boolean;
}

export const infoLoggerMiddleware = (req: RequestLogged, res: Response, next: NextFunction): void => {
  req.on('end', () => {
    if (!req.logged) Logger.info(req, res);
  });

  next();
};

export const errorLoggerMiddleware = (err: Errors, req: RequestLogged, res: Response, next: NextFunction): void => {
  Logger.warn(req, res, err.toString());
  req.logged = true;
  next();
};
