import { type Context, Hono } from "@hono/hono";
export type { Hono };

import { cocktailApi, messageApi } from "./router/mod.ts";

/**
 * The Cocktail Message App API
 *
 * @example Return the requested cocktail detail
 * ```ts
 * const res: Response = await api.request("/cocktail?name=アイリッシュコーヒー");
 * ```
 * @example Return an array of all cocktails
 * ```ts
 * const res: Response = await api.request("/cocktail/all");
 * ```
 *
 * @example Return the requested message detail
 * ```ts
 * const res: Response = await api.request("/message?id=62095b31-b643-4566-9e69-7edc9c901fea");
 * ```
 * @example Add a new message
 * ```ts
 * const res: Response = await app.request("/message", {
 *   method: "POST",
 *   headers: { "Content-Type": "application/json" },
 *   body: JSON.stringify({
 *     "cocktails": [
 *       { "name": "アイリッシュコーヒー" },
 *       { "name": "アイ・オープナー" },
 *     ],
 *   }),
 * });
 * ```
 * @example Return an array of all messages
 * ```ts
 * const res: Response = await api.request("/message/all");
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
  .route("/cocktail", cocktailApi)
  .route("/message", messageApi);
