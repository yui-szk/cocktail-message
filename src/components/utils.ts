import { hc } from "@hono/hono/client";

import type { API } from "../api/mod.ts";
import { Cocktail, Message } from "../api/utils/types.ts";

// 本番環境と開発環境で異なるURLを使用
const url: string =
  Deno.env.get("API_URL") ||
  (Deno.env.get("DENO_DEPLOYMENT_ID")
    ? "https://cocktail-message-api.deno.dev"
    : "http://localhost:8000");

console.log("Using API URL:", url);
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
  try {
    console.log("Fetching cocktails from:", `${url}/api/cocktail/all`);
    const res = await client.cocktail.all.$get();
    if (!res.ok) {
      const errorText = await res.text();
      console.error("API Error:", {
        status: res.status,
        statusText: res.statusText,
        error: errorText,
      });
      throw new Error(
        `API Error: ${res.status} ${res.statusText} - ${errorText}`
      );
    }
    const data = await res.json();
    console.log("Successfully fetched cocktails:", data.length);
    return data;
  } catch (error) {
    console.error("Error in getAllCocktails:", error);
    throw error;
  }
};

/**
 * Get a cocktail from the server
 *
 * @param Cocktail name
 * @returns Cocktail
 *
 * @example
 * ```ts
 * const cocktail = await getCocktail("アイリッシュコーヒー");
 * ```
 */
export const getCocktail = async (name: string): Promise<Cocktail> => {
  const res = await client.cocktail.$get({ query: { name } });
  if (!res.ok) throw new Error(`Failed to get the cocktail,  ${name}`);
  return await res.json();
};

/**
 * Get a message from the server
 *
 * @param Message id
 * @returns Message
 *
 * @example
 * ```ts
 * const message = await getMessage("62095b31-b643-4566-9e69-7edc9c901fea");
 * ```
 */
export const getMessage = async (id: string): Promise<Message> => {
  const res = await client.message.$get({ query: { id } });
  if (!res.ok) throw new Error(await res.text());
  const data = await res.json();
  return { ...data, date: new Date(data.date || "") };
};

/**
 * Send a message to the server
 *
 * @param Message
 * @returns Message id
 *
 * @example
 * ```ts
 * const message = await getMessage("62095b31-b643-4566-9e69-7edc9c901fea");
 * ```
 */
export const sendMessage = async (message: Message): Promise<string> => {
  const res = await client.message.$post({ json: message });
  if (!res.ok) throw new Error(await res.text());
  return await res.text();
};
