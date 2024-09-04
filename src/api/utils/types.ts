import {
  array,
  checkItems,
  date,
  hexColor,
  InferOutput,
  maxLength,
  nonEmpty,
  optional,
  pick,
  pipe,
  strictObject,
  string,
  trim,
} from "@valibot/valibot";
export type { InferOutput, strictObject };

/**
 * Cocktail API validation
 * @internal
 */
export const Cocktail = strictObject({
  name: pipe(string(), trim(), nonEmpty()),
  word: pipe(string(), trim(), nonEmpty()),
  color: pipe(string(), hexColor(), trim()),
});

/**
 * Cocktail type
 */
export type Cocktail = InferOutput<typeof Cocktail>;

/**
 * Cocktail name API validation
 * @internal
 */
export const CocktailName = pick(Cocktail, ["name"]);

/**
 * Cocktail name type
 */
export type CocktailName = InferOutput<typeof CocktailName>;

/**
 * Message API validation
 * @internal
 */
export const Message = strictObject({
  date: optional(date()),
  cocktails: pipe(
    array(CocktailName),
    nonEmpty(),
    maxLength(4),
    checkItems(
      (item: CocktailName, index: number, array: CocktailName[]) =>
        array.map((c: CocktailName) => c.name).indexOf(item.name) === index,
      "Invalid items: No duplicate names allowed",
    ),
  ),
});

/**
 * Message type
 */
export type Message = InferOutput<typeof Message>;
