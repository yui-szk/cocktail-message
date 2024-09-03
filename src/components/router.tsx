import { Hono } from "@hono/hono";
import { CreateMessageTop } from "./CreateMessageTop.tsx";
import { CreateMessageSelect } from "./CreateMessageSelect.tsx";
import { CreateMessageCheck } from "./CreateMessageCheck.tsx";

/**
 * メッセージ作成画面のルーティング
 */

export const createMessage = new Hono();

createMessage
  .get("/", (ctx) => {
    return ctx.html(<CreateMessageTop />);
  })
  .get("/select", (ctx) => {
    return ctx.html(<CreateMessageSelect />);
  })
  .get("/check", (ctx) => {
    return ctx.html(<CreateMessageCheck />);
  });
