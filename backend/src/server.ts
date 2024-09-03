import { type Context, Hono } from "@hono/hono";
export type { Hono };
import { logger } from "@hono/hono/logger";

import { createMessage } from "../../frontend/src/components/router.tsx";

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
  .get("/", (ctx: Context) => ctx.text("Cocktail Message App"))
  .route("/api", api)
  .route("/", createMessage);

Deno.serve(app.fetch);
