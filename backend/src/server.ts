import { type Context, Hono } from "@hono/hono";
export type { Hono };
import { logger } from "@hono/hono/logger";

import { app as api } from "./api/mod.ts";

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
  .get("/", (ctx: Context) => ctx.text("Hello, World!"))
  .route("/api", api);

Deno.serve(app.fetch);
