interface StatusCode {
  statusCode: number;
  description: string;
}

export const httpStatusCodes: Record<string, StatusCode> = {
  ok: {
    statusCode: 200,
    description: 'Ok',
  },
  notFound: {
    statusCode: 404,
    description: 'Not Found',
  },
};

export const resolveStatusCode = (code: number): StatusCode => {
  const [status] = Object.values(httpStatusCodes).filter((value: StatusCode) => value.statusCode === code);
  return status;
};
