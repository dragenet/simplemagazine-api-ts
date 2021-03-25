declare namespace Express {
  interface Request {
    startedAt?: bigint;
    error?: Error;
  }
}
