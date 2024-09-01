import { css, Style } from "@hono/hono/css";
import { HTML } from "./HTML.tsx";

const layoutStyle = css`
  :-hono-global {
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    :root {
      font-family: Noto-Sans;
      color: rgba(255, 255, 255);
      background-color: #242424;
    }
    html {
      font-size: 62.5%;
    }
    body {
      margin: 0 1.25rem;
    }
    h1 {
      font-size: 3rem;
    }
  }
`;

export function WithHTMX({ children }: { children: unknown }) {
  return (
    <HTML>
      <head>
        <title>Deno + Hono + htmx</title>
        <Style />
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body class={layoutStyle}>
        {children}
        <script src="https://unpkg.com/htmx.org@1.9.10"></script>
      </body>
    </HTML>
  );
}
