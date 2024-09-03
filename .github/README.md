# online-2024-e

## Backend

You can import the API entrypoints and the cocktail type with the following code:

```ts
import { hc } from "hono/client";
import type { API } from "/src/api/mod.ts";
import type { Cocktail, Message } from "/src/api/utils/types.ts";

const client = hc<API>("/api");
```

For more information, see [the Hono RPC documentation](https://hono.dev/docs/guides/rpc#client).
