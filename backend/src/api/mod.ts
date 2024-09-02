import { type Context, Hono } from "@hono/hono";
export type { Hono };

import { cocktailApi } from "./router/mod.ts";

/**
 * The cocktail API
 *
 * @example Return the requested cocktail detail
 * ```ts
 * const res: Response = await api.request("/cocktail?name=アイリッシュコーヒー");
 * ```
 * @example Return an array of all cocktails
 * ```ts
 * const res: Response = await api.request("/cocktail/all");
 * ```
 */
export const app: Hono = new Hono();

/**
 * The cocktail API type
 *
 * @example
 * ```ts
 * const client = hc<API>("/");
 * ```
 */
export type API = typeof route;

/**
 * The cocktail API route
 */
export const route: Hono = app;
app
  .get("/", (ctx: Context) => ctx.text("Cocktail Message API"))
  .route("/cocktail", cocktailApi);
