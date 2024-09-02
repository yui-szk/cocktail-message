import { parse } from "@std/jsonc";

import type { Cocktail } from "../utils/types.ts";

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
