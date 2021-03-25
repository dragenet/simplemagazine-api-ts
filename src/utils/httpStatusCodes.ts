export interface HttpStatus {
  statusCode: number;
  description: string;
}

export const httpStatusCodes: Record<string, HttpStatus> = {
  ok: {
    statusCode: 200,
    description: 'Ok',
  },
  notFound: {
    statusCode: 404,
    description: 'Not Found',
  },
  internalError: {
    statusCode: 500,
    description: 'Internal Server Error',
  },
};

export const resolveStatusCode = (code: number): HttpStatus => {
  const [status] = Object.values(httpStatusCodes).filter((value: HttpStatus) => value.statusCode === code);
  return status;
};
