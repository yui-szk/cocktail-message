import {
  array,
  date,
  hexColor,
  InferOutput,
  nonEmpty,
  optional,
  pick,
  pipe,
  strictObject,
  string,
  trim,
  uuid,
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
 * Message API validation
 * @internal
 */
export const Message = strictObject({
  id: optional(pipe(string(), uuid(), trim(), nonEmpty())),
  date: optional(date()),
  cocktails: pipe(array(pick(Cocktail, ["name"])), nonEmpty()),
});

/**
 * Message type
 */
export type Message = InferOutput<typeof Message>;
