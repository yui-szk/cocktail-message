import { hc } from "@hono/hono/client";

import type { API } from "../api/mod.ts";
import { Cocktail } from "../api/utils/types.ts";

const url: string = Deno.env.get("API_URL") || "http://0.0.0.0:8000";
const client = hc<API>(`${url}/api`);

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
