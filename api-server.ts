import { serve } from "@hono/hono/server";
import { app } from "./src/api/mod.ts";

console.log("Starting API server...");
serve(app, (info) => {
  console.log(`Listening on http://localhost:${info.port}/`);
});
