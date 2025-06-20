process.on('uncaughtException', (e) => {
  console.log(
    `uncaughtException (${process.env.SERVICE_NAME || 'unknown'})`,
    e.message,
    e.stack,
  );
  process.exit(1);
});
import dotenv from 'dotenv';
dotenv.config();

import { logger } from './logger/index.js';
import App from './app.js';
import _ from './redis.js';

const app = new App();

app
  .initialize()
  .then(() => app.listen())
  .catch((e) => {
    logger.error(e.stack);
  });
