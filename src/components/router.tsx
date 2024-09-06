import { Hono } from "@hono/hono";

import { Home } from "../pages/Home.tsx";
import { CreateMessageTop } from "./CreateMessageTop.tsx";
import { CreateMessageSelect } from "./CreateMessageSelect.tsx";
import { CreateMessageCheck } from "./CreateMessageCheck.tsx";
import { ViewMessage } from "./ViewMessage.tsx";

/**
 * メッセージ作成画面のルーティング
 */

export const createMessage = new Hono();

createMessage
  .get("/", (ctx) => ctx.html(<Home />))
  .get("/create", (ctx) => ctx.html(<CreateMessageTop />))
  .get("/select", (ctx) => ctx.html(<CreateMessageSelect />))
  .get("/check", (ctx) => {
    const id: string = ctx.req.query("id") || "";
    return ctx.html(<CreateMessageCheck id={id} />);
  })
  .get("/view", (ctx) => {
    const id: string = ctx.req.query("id") || "";
    return ctx.html(<ViewMessage id={id} />);
  });
