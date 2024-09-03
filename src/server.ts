import { Hono } from "@hono/hono";
export type { Hono };
import { logger } from "@hono/hono/logger";
import { serveStatic } from "@hono/hono/deno";

import { createMessage } from "./components/router.tsx";
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
  .route("/api", api)
  .route("/", createMessage)
  .use("/public/*", serveStatic({ root: "./" }));

Deno.serve(app.fetch);
