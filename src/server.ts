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

// エラーハンドリングミドルウェアを追加
app.use("*", async (c, next) => {
  try {
    await next();
  } catch (err) {
    console.error("Error:", err);
    return c.text(`Internal Server Error: ${err.message}`, 500);
  }
});

// ロガーミドルウェアを追加
app.use("*", logger());

app
  .route("/", createMessage)
  .route("/api", api)
  .use("/favicon.ico", serveStatic({ path: "./public/images/favicon.ico" }))
  .use("/public/*", serveStatic({ root: "./" }));

Deno.serve(app.fetch);
