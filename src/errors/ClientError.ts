import { errors } from './errors';
import { HttpStatus } from '@/models/HttpStatus.model';
import { ClientErrorModel } from '@/models/ClientError.model';

export class ClientError extends Error {
  code: string;
  message: string;
  httpStatus: HttpStatus;
  constructor(error: ClientErrorModel = errors.default) {
    super(error.code);
    this.code = error.code;
    this.message = error.message;
    this.httpStatus = error.httpStatus;
  }

  valueOf(): ClientErrorModel {
    return { code: this.code, message: this.message, httpStatus: this.httpStatus };
  }

  toString(): string {
    return `ClientError: ${this.code}`;
  }
}
