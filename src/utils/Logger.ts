import { Request, Response } from 'express';
import chalk from 'chalk';
import { resolveStatusCode } from '../utils/httpStatusCodes';

export enum LogType {
  info = 'info',
  warn = 'warn',
  error = 'error',
}

export class ExpressLogger {
  private static timestamp(): string {
    return new Date().toISOString();
  }

  private static colorizedType(type: LogType): string {
    switch (type) {
      case LogType.info:
        return chalk.blue(type.toUpperCase());
      case LogType.warn:
        return chalk.yellow(type.toUpperCase());
      case LogType.error:
        return chalk.red(type.toUpperCase());
    }
  }

  protected static template(type: LogType, req: Request, res: Response, content?: string): string {
    const status = resolveStatusCode(res.statusCode);
    const statusStr = `${status.statusCode} ${status.description}`;

    return `${this.timestamp()} [${this.colorizedType(type)}] - ${req.ip} - ${req.method} ${
      req.originalUrl
    } - ${statusStr} - ${req.get('User-Agent')} ${content && `- ${content}`}`;
  }

  static info(req: Request, res: Response, content = ''): void {
    console.log(this.template(LogType.info, req, res, content));
  }

  static warn(req: Request, res: Response, content = ''): void {
    console.log(this.template(LogType.warn, req, res, content));
  }

  static error(req: Request, res: Response, content = ''): void {
    console.error(this.template(LogType.error, req, res, content));
  }
}
