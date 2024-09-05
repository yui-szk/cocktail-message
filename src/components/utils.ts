import { hc } from "@hono/hono/client";

import { API } from "../api/mod.ts";
import { Cocktail } from "../api/utils/types.ts";

const client = hc<API>("http://0.0.0.0:8000/api");

/**
 * Get cocktails from the server
 *
 * @returns All cocktails
 *
 * @example
 * ```ts
 * const cocktails = await getAllCocktails();
 * ```
 */
export const getAllCocktails = async (): Promise<Cocktail[]> => {
  const res = await client.cocktail.all.$get();
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
};
