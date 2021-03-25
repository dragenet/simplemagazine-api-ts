import { httpStatusCodes } from '@/utils/httpStatusCodes';
import { ClientErrorModel } from '@/models/ClientError.model';

export const errors: Record<string, ClientErrorModel> = {
  default: {
    code: 'ERR_UNKNOW_ERROR',
    message: 'Unknow error',
    httpStatus: httpStatusCodes.internalError,
  },
};
