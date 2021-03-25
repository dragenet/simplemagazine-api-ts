import { HttpStatus } from '../utils/httpStatusCodes';
import { errors } from './errors';
import { ClientErrorModel } from '../models';

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
}
