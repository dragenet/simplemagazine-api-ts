declare namespace Express {
  interface Request {
    logged?: boolean;
    startedAt?: bigint;
  }
}
