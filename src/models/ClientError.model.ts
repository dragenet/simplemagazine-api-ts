import { HttpStatus } from './HttpStatus.model';

export interface ClientErrorModel {
  code: string;
  message: string;
  httpStatus: HttpStatus;
}
