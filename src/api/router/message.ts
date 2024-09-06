import { Context, Hono } from "@hono/hono";
export type { Hono };
import { validator } from "@hono/hono/validator";
import { crypto } from "@std/crypto";
import { STATUS_CODE } from "@std/http/status";
import { parse } from "@valibot/valibot";
import {cors} from "@hono/hono/cors"

import { Message } from "../utils/types.ts";
export { Message };
import { getMessage, saveMessage } from "../utils/data.ts";
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
.use("/",  cors({
  origin: ['https://rod.expfrom.me', 'http://localhost:8000'],
  allowHeaders: ['X-Custom-Header', 'Upgrade-Insecure-Requests', 'Content-Type'], // ここに追加
  allowMethods: ['POST', 'OPTIONS'],
  exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
  maxAge: 600,
  credentials: true,
}))
  .get("/", async (ctx: Context) => {
    const id: string | undefined = ctx.req.query("id");
    if (!id) {
      return ctx.text('The "id" query is required', STATUS_CODE.BadRequest);
    }

    try {
      const message: Message = await getMessage(id);
      return ctx.json(message);
    } catch (error) {
      return ctx.text(error, STATUS_CODE.NotFound);
    }
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
          if (!res.ok) throw new Error(await res.json());
        }
        return data;
      } catch (error) {
        return ctx.text(error.message, STATUS_CODE.BadRequest);
      }
    }),
    async (ctx: Context) => {
      try {
        const data: Message = await ctx.req.json();
        const id: string = crypto.randomUUID();
        await saveMessage({ ...data, date: new Date() }, id);
        return ctx.text(id);
      } catch (error) {
        return ctx.text(error, STATUS_CODE.InternalServerError);
      }
    },
  ).options("/",  (ctx) => ctx.text("hoge"));
