import {
  hexColor,
  InferOutput,
  minLength,
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
  name: pipe(string(), trim(), minLength(1)),
  word: pipe(string(), trim(), minLength(1)),
  color: pipe(string(), trim(), hexColor()),
});

/**
 * Cocktail type
 */
export type Cocktail = InferOutput<typeof Cocktail>;
