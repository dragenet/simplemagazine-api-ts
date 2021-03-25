import { Request } from 'express';
import chalk from 'chalk';

export enum LogType {
  info = 'info',
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
      case LogType.error:
        return chalk.red(type.toUpperCase());
    }
  }

  protected static template(type: LogType, req: Request, content?: string): string {
    return `${this.timestamp()} [${this.colorizedType(type)}] - ${req.ip} - ${req.method} ${
      req.originalUrl
    } - ${req.get('User-Agent')} ${content && `- ${content}`}`;
  }

  static info(req: Request, content = ''): void {
    console.log(this.template(LogType.info, req, content));
  }

  static error(req: Request, content = ''): void {
    console.error(this.template(LogType.error, req, content));
  }
}
