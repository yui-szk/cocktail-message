import { Context } from "@hono/hono";
import { css } from "@hono/hono/css";
import { WithHTML } from "../layout/WithHTML.tsx";

const style = css``;

export function Home() {
  return (
    <WithHTML>
      <section id="Home" class={style}></section>
    </WithHTML>
  );
}

export function RenderHome(ctx: Context) {
  return ctx.html(<Home />);
}
