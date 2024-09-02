import { assertEquals } from "@std/assert";
import { STATUS_CODE } from "@std/http/status";

import { app } from "./server.ts";

Deno.test("Serve", async (t: Deno.TestContext) => {
  await t.step("/", async () => {
    const res: Response = await app.request("/");

    assertEquals(await res.text(), "Hello, World!");
    assertEquals(res.status, STATUS_CODE.OK);
  });
});
