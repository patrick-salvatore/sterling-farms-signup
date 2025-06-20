import { Hono } from 'hono';

export function initialize(app: Hono) {
  app.get('/', (ctx) => {
    ctx.status(200);
    return ctx.json({ now: Date.now() });
  });
}
