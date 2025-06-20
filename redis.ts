import Redis from 'ioredis';

import dotenv from 'dotenv';
dotenv.config();

const redis =
  process.env.NODE_ENV === 'production'
    ? new Redis(process.env.REDIS_URL!, {
        tls: {
          rejectUnauthorized: false,
        },
      })
    : new Redis({
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT!),
        password: process.env.REDIS_PASSWORD,
        db: Number(process.env.REDIS_DB!),
      });

export default redis;
