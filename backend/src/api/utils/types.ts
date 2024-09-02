import {
  hexColor,
  InferOutput,
  nonEmpty,
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
