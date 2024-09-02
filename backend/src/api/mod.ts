import { type Context, Hono } from "@hono/hono";
export type { Hono };
import { STATUS_CODE } from "@std/http/status";

import { Cocktail } from "./utils/types.ts";
export { Cocktail };
import { cocktails } from "./utils/data.ts";

/**
 * The cocktail API
 *
 * @example Return a response
 * ```ts
 * const res: Response = await api.request("/");
 * ```
 * @example Return the requested cocktail detail
 * ```ts
 * const res: Response = await api.request("/get?name=アイリッシュコーヒー");
 * ```
 * @example Return an array of all cocktails
 * ```ts
 * const res: Response = await api.request("/all");
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
export const route: Hono = app
  .get("/", (ctx: Context) => ctx.text("Cocktail API"))
  .get("/get", (ctx: Context) => {
    const name: string | undefined = ctx.req.query("name");
    if (!name) {
      return ctx.json(
        { success: false, message: "The name query is required" },
        STATUS_CODE.BadRequest,
      );
    }

    const cocktail: Cocktail | undefined = cocktails.find((c: Cocktail) =>
      c.name === name
    );
    return cocktail ? ctx.json({ success: true, data: cocktail }) : ctx.json(
      { success: false, message: `The cocktail, "${name}" not found` },
      STATUS_CODE.NotFound,
    );
  })
  .get("/all", (ctx: Context) => ctx.json(cocktails));
