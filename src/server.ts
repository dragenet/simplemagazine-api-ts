import express from 'express';
import cookieParser from 'cookie-parser';

import { config } from '@/config/config';
import { errorLoggerMiddleware, infoLoggerMiddleware } from '@/middlewares/loggerMiddleware';
import { ClientError } from '@/errors/ClientError';
import { errors } from '@/errors/errors';

const app = express();

app.use(cookieParser());
app.use(infoLoggerMiddleware);

app.use(config.API_ENTRY_POINT, (req, res) => res.status(200).send('Hello du**ing world'));
app.use('/error', (req, res) => {
  res.status(404).end();
  throw new Error('You find error path');
});

// app.use(errorHandler);

app.use(errorLoggerMiddleware);

app.listen(config.PORT, () => {
  console.log(`Server listening at http://localhost:${config.PORT}`);
});
