import { parse } from "@std/jsonc";

import type { Cocktail, Message } from "./types.ts";

const cocktailFile = "./private/cocktails.jsonc";
const cocktailData: string = await Deno.readTextFile(cocktailFile);

/**
 * An array of cocktails data
 *
 * @example
 * ```ts
 * console.log(cocktails);
 * ```
 */
export const cocktails: Cocktail[] = parse(cocktailData) as Cocktail[];

const messageFile = "./private/messages.jsonc";
const messageData: string = await Deno.readTextFile(messageFile);

/**
 * An array of messages data
 *
 * @example
 * ```ts
 * console.log(messages);
 * ```
 */
export const messages: Message[] = parse(messageData) as unknown as Message[];
