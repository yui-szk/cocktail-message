import { css } from "@hono/hono/css";
import { PropsWithChildren } from "@hono/hono/jsx";

import { WithHTML } from "../layout/WithHTML.tsx";
import { CocktailGlass } from "./CocktailGlass.tsx";
import { getCocktail, getMessage } from "./utils.ts";
import { CocktailName } from "../api/utils/types.ts";

const imageStyle = css`
  height: 85vh;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    height: calc(100% - 16rem);
  }
`;

const messageContainerStyle = css`
  display: grid;
  grid-template-columns: 7rem 1fr 7rem;
  grid-template-rows: 20% 20% 20% 20% 20%;
  position: absolute;
  top: 0;
  height: 85vh;
  width: calc(100% - 3.5rem);
  max-width: 430px;

  #grid-item-1 {
    grid-area: 1 / 1 / 2 / 1;
  }

  #grid-item-2 {
    grid-area: 2 / 3 / 3 / 3;
    justify-self: right;
  }

  #grid-item-3 {
    grid-area: 3 / 1 / 4 / 1;
  }

  #grid-item-4 {
    grid-area: 4 / 3 / 5 / 3;
    justify-self: right;
  }
`;

const messageStyle = css`
  min-width: 7rem;
  min-height: 7rem;
  border-radius: 100%;
  margin-top: 3.5rem;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    color: var(--color-black);
    margin: 0 1rem;
  }
`;

const hiddenButton = css`
  text-align: right;

  button {
    background-color: var(--color-base);
    padding: 0.5rem 0.75rem;
    border-radius: 3rem;
    border: 0;

    &:active {
      background-color: #a0978e;
    }
  }
`;

/**
 * 作成したメッセージを確認する画面を返す
 */

export const ViewMessage = async (props: PropsWithChildren<{ id: string }>) => {
  const id: string = props.id;

  const cocktails = (await getMessage(id)).cocktails.map(
    async (cocktailName: CocktailName) => {
      return await getCocktail(cocktailName.name);
    },
  );

  let colors: string[] = [];
  for await (const cocktail of cocktails) colors.push(cocktail.color);
  switch (colors.length) {
    case 1:
      colors = [colors[0], colors[0], colors[0], colors[0]];
      break;
    case 2:
      colors = [colors[0], ...colors, colors[1]];
      break;
    case 3:
      colors = [...colors, colors[colors.length - 1]];
      break;
    default:
      colors;
  }

  return (
    <WithHTML>
      <div>
        <div class={imageStyle}>
          <CocktailGlass colors={colors} />
        </div>
        <div id="message-container" class={messageContainerStyle}>
          {(await getMessage(id)).cocktails.map(
            async (cocktail: CocktailName, index: number) => (
              <div
                class={messageStyle}
                id={`grid-item-${index + 1}`}
                style={(await getCocktail(cocktail.name)).word
                  ? `background-color: ${
                    (await getCocktail(cocktail.name)).color
                  };`
                  : "display: none"}
              >
                <p>{(await getCocktail(cocktail.name)).word}</p>
              </div>
            ),
          )}
        </div>
        <div class={hiddenButton}>
          <button id="hidden-button" onclick="_hidden()">
            ワードを非表示
          </button>
        </div>
      </div>
      <script src="./public/script.js"></script>
    </WithHTML>
  );
};
