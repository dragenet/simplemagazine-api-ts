import express from 'express';
import cookieParser from 'cookie-parser';

import { config } from '@/config/config';

import { ClientError } from '@/errors/ClientError';
import { errors } from '@/errors/errors';

import { loggerMiddleware } from '@/middlewares/loggerMiddleware';
import { inejctErrorMiddleware } from '@/middlewares/injectErrorMiddleware';

const app = express();

app.use(cookieParser());

app.use(loggerMiddleware);

app.use(config.API_ENTRY_POINT, (req, res) => res.status(200).send('Hello du**ing world'));
app.use('/error', (req, res) => {
  res.status(500).end();
  throw new Error(`You're master of error finding`);
});
app.use('*', (req, res) => {
  res.status(404).end();
  throw new ClientError(errors.notFound);
});

// app.use(errorHandler);

app.use(inejctErrorMiddleware);

app.listen(config.PORT, () => {
  console.log(`Server listening at http://localhost:${config.PORT}`);
});
