import { Context, Hono } from "@hono/hono";
export type { Hono };
import { logger } from "@hono/hono/logger";

import { Home } from "./pages/Home.tsx";
import { CreateMessageTop } from "./components/CreateMessageTop.tsx";

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
app.get("/", (ctx: Context) => {
  return ctx.text("Hello, World!");
});
app.get("/home", (ctx: Context) => {
  return ctx.html(<Home />);
});
app.get("/create", (ctx: Context) => {
  return ctx.html(<CreateMessageTop />);
});

Deno.serve(app.fetch);
