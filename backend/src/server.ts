import { type Context, Hono } from "@hono/hono";
export type { Hono };
import { logger } from "@hono/hono/logger";

/**
 * The Hono application for this project.
 *
 * @example
 * ```ts
 * const res: Response = await app.request("/");
 * ```
 */
export const app: Hono = new Hono();
app.use(logger());
app
  .get("/", (ctx: Context) => ctx.text("Hello, World!"));

Deno.serve(app.fetch);
