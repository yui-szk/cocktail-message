import { type Context, Hono } from "@hono/hono";
export type { Hono };
import { STATUS_CODE } from "@std/http/status";

import { Cocktail } from "../utils/types.ts";
export { Cocktail };
import { getCocktails } from "../utils/data.ts";

/**
 * The cocktail API
 * @internal
 *
 * @example Return the requested cocktail detail
 * ```ts
 * const res: Response = await api.request("/?name=アイリッシュコーヒー");
 * ```
 * @example Return an array of all cocktails
 * ```ts
 * const res: Response = await api.request("/all");
 * ```
 */
export const app = new Hono()
  .get("/", async (ctx: Context) => {
    const name: string | undefined = ctx.req.query("name");
    if (!name) {
      return ctx.text('The "name" query is required', STATUS_CODE.BadRequest);
    }

    const cocktail: Cocktail | undefined = (await getCocktails()).find((
      c: Cocktail,
    ) => c.name === name);
    return cocktail
      ? ctx.json(cocktail)
      : ctx.text(`The cocktail, "${name}" not found`, STATUS_CODE.NotFound);
  })
  .get("/all", async (ctx: Context) => ctx.json(await getCocktails()));
