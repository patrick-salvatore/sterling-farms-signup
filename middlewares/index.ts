import { Hono } from 'hono';

import { corsMiddleware } from './cors.js';

export async function initialize(app: Hono) {
  corsMiddleware(app);
}
