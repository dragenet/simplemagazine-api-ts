import { Request, Response } from 'express';
import chalk from 'chalk';
import { resolveStatusCode } from './httpStatusCodes';

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

  private static resolveExecTime(req: Partial<Request>): number | undefined {
    const endedAt = process.hrtime.bigint();
    if (req.startedAt) {
      return Number(endedAt - req.startedAt) / 1000000;
    }
    return undefined;
  }

  protected static template(type: LogType, req: Request, res: Response, content?: string, execMs?: number): string {
    const status = resolveStatusCode(res.statusCode);
    const statusStr = `${status.statusCode} ${status.description}`;

    return `${this.timestamp()} [${this.colorizedType(type)}] - ${req.ip} - ${req.method} ${
      req.originalUrl
    } - ${statusStr} - ${execMs?.toFixed(2).concat('ms')} - ${req.get('User-Agent')} ${content && `- ${content}`}`;
  }

  static info(req: Request, res: Response, content = ''): void {
    const execTime = this.resolveExecTime(req);
    console.log(this.template(LogType.info, req, res, content, execTime));
  }

  static warn(req: Request, res: Response, content = ''): void {
    const execTime = this.resolveExecTime(req);
    console.error(this.template(LogType.warn, req, res, content, execTime));
  }

  static error(req: Request, res: Response, content = ''): void {
    const execTime = this.resolveExecTime(req);
    console.error(this.template(LogType.error, req, res, content, execTime));
  }
}
