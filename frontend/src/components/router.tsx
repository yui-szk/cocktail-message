import { Hono } from "@hono/hono";
import { serveStatic } from "@hono/hono/deno";
import { CreateMessageTop } from "./CreateMessageTop.tsx";
import { CreateMessageSelect } from "./CreateMessageSelect.tsx";
import { CreateMessageCheck } from "./CreateMessageCheck.tsx";

export const createMessage = new Hono();

createMessage
  .get("/create", (ctx) => {
    return ctx.html(<CreateMessageTop />);
  })
  .get("/create/select", (ctx) => {
    return ctx.html(<CreateMessageSelect />);
  })
  .get("/create/check", (ctx) => {
    return ctx.html(<CreateMessageCheck />);
  })
  .use("images/*", serveStatic({ root: "/frontend/src" }));
