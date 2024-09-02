import { assertEquals, assertExists } from "@std/assert";
import { STATUS_CODE } from "@std/http/status";

import { app } from "./mod.ts";

Deno.test("API", async (t: Deno.TestContext) => {
  await t.step("GET /", async () => {
    const res: Response = await app.request("/");

    assertEquals(await res.text(), "Cocktail API");
    assertEquals(res.status, STATUS_CODE.OK);
  });

  await t.step("GET /get", async () => {
    const res: Response = await app.request("/get");

    assertEquals(await res.json(), {
      success: false,
      message: "The name query is required",
    });
    assertEquals(res.status, STATUS_CODE.BadRequest);
  });

  await t.step("GET /get?name=none", async () => {
    const res: Response = await app.request("/get?name=none");

    assertEquals(await res.json(), {
      success: false,
      message: 'The cocktail, "none" not found',
    });
    assertEquals(res.status, STATUS_CODE.NotFound);
  });

  await t.step("GET /get?name=アイリッシュコーヒー", async () => {
    const res: Response = await app.request("/get?name=アイリッシュコーヒー");

    assertExists(await res.json());
    assertEquals(res.status, STATUS_CODE.OK);
  });

  await t.step("GET /all", async () => {
    const res: Response = await app.request("/all");

    assertExists(await res.json());
    assertEquals(res.status, STATUS_CODE.OK);
  });
});
