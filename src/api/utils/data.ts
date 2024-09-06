import { parse } from "@std/jsonc";

import type { Cocktail, Message } from "./types.ts";

const kvId: string | undefined = Deno.env.get("KV_ID");
const kvUrl: string | undefined = kvId
  ? `https://api.deno.com/databases/${kvId}/connect`
  : undefined;

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
 * Returns a message data
 * @param The id of the message
 * @returns The message data
 *
 * @example
 * ```ts
 * const id: string = "62095b31-b643-4566-9e69-7edc9c901fea";
 * const message = await getMessage(id);
 * ```
 */
export async function getMessage(id: string): Promise<Message> {
  const kv = await Deno.openKv(kvUrl);
  const result: Deno.KvEntryMaybe<{ message: Message }> = await kv.get([
    "messages",
    id,
  ]);
  kv.close();
  if (!result.value) throw new Error("Failed to get messages");
  return result.value.message;
}

/**
 * Saves a message data
 * @param The message to write
 * @param The id of the message
 *
 * @example
 * ```ts
 * const message: Message = {
 *   cocktails: [
 *     { name: "アイリッシュコーヒー" },
 *     { name: "アイ・オープナー" },
 *   ],
 * }];
 * const id = "62095b31-b643-4566-9e69-7edc9c901fea";
 * await saveMessage(message, id);
 * ```
 */
export async function saveMessage(message: Message, id: string): Promise<void> {
  const kv = await Deno.openKv(kvUrl);
  const result: Deno.KvCommitResult = await kv.set(["messages", id], {
    message,
  });
  kv.close();
  if (!result) throw new Error("Failed to save message");
}
