import { Context } from "@hono/hono";
import { css } from "@hono/hono/css";
import { WithHTMX } from "../layout/WithHTMX.tsx";

const style = css``;

export function Home() {
  return (
    <WithHTMX>
      <section id="Home" class={style}></section>
    </WithHTMX>
  );
}

export function RenderHome(ctx: Context) {
  return ctx.html(<Home />);
}
