import { HttpStatus } from '../utils/httpStatusCodes';

export interface ClientErrorModel {
  code: string;
  message: string;
  httpStatus: HttpStatus;
}
