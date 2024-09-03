import { assertEquals } from "@std/assert";
import { STATUS_CODE } from "@std/http/status";

import { app } from "./mod.ts";

Deno.test("API", async (t: Deno.TestContext) => {
  await t.step("GET /", async () => {
    const res: Response = await app.request("/");

    assertEquals(await res.text(), "Cocktail Message API");
    assertEquals(res.status, STATUS_CODE.OK);
  });
});
