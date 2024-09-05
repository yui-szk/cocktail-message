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

/**
 * Get a cocktail from the server
 *
 * @param Cocktail name
 * @returns Cocktail
 *
 * @example
 * \`\`\`ts
 * const cocktail = await getCocktail("アイリッシュコーヒー");
 * \`\`\`
 */
export const getCocktail = async (name: string): Promise<Cocktail> => {
  const res = await client.cocktail.$get({ query: { name } });
  if (!res.ok) throw new Error(`Failed to get the cocktail,  ${name}`);
  return await res.json();
};
