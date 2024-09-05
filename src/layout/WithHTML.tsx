import { css, Style } from "@hono/hono/css";
import { HTML } from "./HTML.tsx";

const layoutStyle = css`
  :-hono-global {
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;

      --font-jp: "Noto Serif JP", serif;
      --font-en: "Cormorant Garamond", serif;

      --color-black: #000000;
      --color-white: #ffffff;
      --color-main: #443d3a;
      --color-base: #e9e3dd;
      --color-accent: #952b12;
      --color-stroke: #afafaf;
    }
    :root {
      font-family: "Noto Serif JP", serif;
      color: #ffffff;
      background-color: #443d3a;
    }
    html {
      overflow-y: hidden;
    }
    body {
      margin: 0 1.75rem;
    }
    .content {
      max-width: 430px;
      margin: 0 auto;
    }
  }
`;

/**
 * HTMLを返す
 */

export const WithHTML = ({ children }: { children: unknown }) => {
  return (
    <HTML>
      <head>
        <title>cocktail message</title>
        <Style />
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body class={layoutStyle}>
        <div class="content">{children}</div>
        {"<!-- "}Twemoji Graphics licensed under CC-BY 4.0
        https://github.com/twitter/twemoji/blob/d94f4cf/LICENSE-GRAPHICS{" -->"}
        <script src="./public/script.js"></script>
      </body>
    </HTML>
  );
};
