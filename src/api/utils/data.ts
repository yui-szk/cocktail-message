import { parse } from "@std/jsonc";

import type { Cocktail, Message } from "./types.ts";

/**
 * Returns an array of cocktails data
 * @returns The array of cocktails data
 *
 * @example
 * ```ts
 * const cocktails: Cocktail[] = await getCocktails();
 * ```
 */
export async function getCocktails(): Promise<Cocktail[]> {
  const file = "./private/cocktails.jsonc";
  const data: string = await Deno.readTextFile(file);
  return parse(data) as Cocktail[];
}

/**
 * Returns an array of messages data
 * @param The id of the message
 * @returns The message data
 *
 * @example
 * ```ts
 * const message: Message[] = await getMessages();
 * ```
 */
export async function getMessages(): Promise<Message[]> {
  const file = "./private/messages.jsonc";
  const data: string = await Deno.readTextFile(file);
  return parse(data) as unknown as Message[];
}
