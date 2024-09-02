import { assertEquals } from "@std/assert";
import { STATUS_CODE } from "@std/http/status";

import { app } from "./server.tsx";

Deno.test("Serve", async (t: Deno.TestContext) => {
  await t.step("GET /", async () => {
    const res: Response = await app.request("/");

    assertEquals(await res.text(), "Cocktail Message App");
    assertEquals(res.status, STATUS_CODE.OK);
  });
});
