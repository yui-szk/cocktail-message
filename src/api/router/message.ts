import { type Context, Hono } from "@hono/hono";
export type { Hono };
import { validator } from "@hono/hono/validator";
import { crypto } from "@std/crypto";
import { STATUS_CODE } from "@std/http/status";
import { parse } from "@valibot/valibot";

import { Message } from "../utils/types.ts";
export { Message };
import { messages } from "../utils/data.ts";
import { cocktailApi } from "./mod.ts";

/**
 * The message API
 * @internal
 *
 * @example Return the requested message detail
 * ```ts
 * const res: Response = await api.request("/?id=62095b31-b643-4566-9e69-7edc9c901fea");
 * ```
 * @example Add a new message
 * ```ts
 * const res: Response = await app.request("/", {
 *   method: "POST",
 *   headers: { "Content-Type": "application/json" },
 *   body: JSON.stringify({
 *     "cocktails": [
 *       { "name": "アイリッシュコーヒー" },
 *       { "name": "アイ・オープナー" },
 *     ],
 *   }),
 * });
 * ```
 * @example Return an array of all messages
 * ```ts
 * const res: Response = await api.request("/all");
 * ```
 */
export const app = new Hono()
  .get("/", (ctx: Context) => {
    const id: string | undefined = ctx.req.query("id");
    if (!id) {
      return ctx.json(
        { success: false, message: 'The "id" query is required' },
        STATUS_CODE.BadRequest,
      );
    }

    const message: Message | undefined = messages.find((m: Message) =>
      m.id === id
    );
    return message ? ctx.json({ success: true, data: message }) : ctx.json(
      { success: false, message: `The message, "${id}" not found` },
      STATUS_CODE.NotFound,
    );
  })
  .post(
    "/",
    validator("json", async (value: unknown, ctx: Context) => {
      try {
        const data: Message = parse(Message, value);
        for (const cocktail of data.cocktails) {
          const res: Response = await cocktailApi.request(
            `/?name=${cocktail.name}`,
          );
          const result: { success: boolean; message: string } = await res
            .json();
          if (!result.success) throw new Error(result.message);
        }
        return data;
      } catch (error) {
        return ctx.json(
          { success: false, message: error.message },
          STATUS_CODE.BadRequest,
        );
      }
    }),
    async (ctx: Context) => {
      const data: Message = await ctx.req.json();
      const id: string = crypto.randomUUID();
      messages.push({ ...data, id, date: new Date() });
      return ctx.json({ success: true, data: id });
    },
  )
  .get("/all", (ctx: Context) => ctx.json(messages));
