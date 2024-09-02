import { parse } from "@std/jsonc";

import type { Cocktail } from "../utils/types.ts";

const file = "./private/cocktails.jsonc";
const data: string = await Deno.readTextFile(file);

/**
 * An array of cocktails data
 *
 * @example
 * ```ts
 * console.log(cocktails);
 * ```
 */
export const cocktails: Cocktail[] = parse(data) as Cocktail[];
