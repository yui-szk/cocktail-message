import { assertEquals, assertExists } from "@std/assert";
import { STATUS_CODE } from "@std/http/status";

import { app } from "./message.ts";

Deno.test("Message API", async (t: Deno.TestContext) => {
  const id = "62095b31-b643-4566-9e69-7edc9c901fea";
  const kv = await Deno.openKv();
  kv.set(["messages", id], {
    message: {
      date: "2020-01-01T00:00:00.000Z",
      cocktails: [
        { name: "アイリッシュコーヒー" },
        { name: "アイ・オープナー" },
      ],
    },
  });

  await t.step("GET /", async () => {
    const res: Response = await app.request("/");

    assertEquals(await res.text(), 'The "id" query is required');
    assertEquals(res.status, STATUS_CODE.BadRequest);
  });

  await t.step("GET /?id=none", async () => {
    const res: Response = await app.request("/?id=none");

    assertEquals(await res.text(), "Error: Failed to get messages");
    assertEquals(res.status, STATUS_CODE.NotFound);
  });

  await t.step(`GET /?id=${id}`, async () => {
    const res: Response = await app.request(`/?id=${id}`);

    assertEquals(await res.json(), {
      message: {
        date: "2020-01-01T00:00:00.000Z",
        cocktails: [
          { "name": "アイリッシュコーヒー" },
          { "name": "アイ・オープナー" },
        ],
      },
    });
    assertEquals(res.status, STATUS_CODE.OK);
  });

  await t.step("POST /", async () => {
    const res: Response = await app.request("/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cocktails: [],
      }),
    });

    assertExists(await res.text());
    assertEquals(res.status, STATUS_CODE.BadRequest);
  });

  await t.step("POST / (not found)", async () => {
    const res: Response = await app.request("/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cocktails: [
          { name: "not-found" },
        ],
      }),
    });

    assertExists(await res.text());
    assertEquals(res.status, STATUS_CODE.BadRequest);
  });

  await t.step("POST / (too many items)", async () => {
    const res: Response = await app.request("/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cocktails: [
          { "name": "アイリッシュコーヒー" },
          { "name": "アイ・オープナー" },
          { "name": "アクダクト" },
          { "name": "アドニス" },
          { "name": "アフィニティ" },
        ],
      }),
    });

    assertExists(await res.text());
    assertEquals(res.status, STATUS_CODE.BadRequest);
  });

  await t.step("POST / (duplicate items)", async () => {
    const res: Response = await app.request("/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cocktails: [
          { name: "アイリッシュコーヒー" },
          { name: "アイリッシュコーヒー" },
          { name: "アイ・オープナー" },
        ],
      }),
    });

    assertExists(await res.text());
    assertEquals(res.status, STATUS_CODE.BadRequest);
  });

  await t.step("POST /", async () => {
    const res: Response = await app.request("/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cocktails: [
          { name: "アイリッシュコーヒー" },
          { name: "アイ・オープナー" },
        ],
      }),
    });

    assertExists(await res.text());
    assertEquals(res.status, STATUS_CODE.OK);
  });

  kv.close();
});
