import { css, Style } from "@hono/hono/css";
import { HTML } from "./HTML.tsx";

const layoutStyle = css`
  :-hono-global {
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;

      --color-black: #000000;
      --color-white: #ffffff;
      --color-main: #443d3a;
      --color-base: #e9e3dd;
      --color-accent: #952b12;
      --color-stroke: #afafaf;
    }
    :root {
      font-family: Noto-Sans;
      color: #ffffff;
      background-color: #443d3a;
    }
    html {
      font-size: 62.5%;
    }
    body {
      margin: 0 3rem;
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
        <title>cocktail message</title>
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
