import { css, cx } from "@hono/hono/css";
import { WithHTML } from "../layout/WithHTML.tsx";
import { CocktailGlass } from "./CocktailGlass.tsx";
import { getCocktail, getMessage } from "./utils.ts";
import { CocktailName } from "../api/utils/types.ts";
import { PropsWithChildren } from "@hono/hono/jsx";

const imageStyle = css`
  height: 75vh;
  display: flex;
  justify-content: center;

  svg {
    height: calc(100% - 9rem);
    margin-top: 4rem;
  }
`;

const messageContainerStyle = css`
  display: grid;
  grid-template-columns: 7rem 1fr 7rem;
  grid-template-rows: 20% 20% 20% 20% 20%;
  position: absolute;
  top: 0;
  height: 75vh;
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
  margin-top: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    color: var(--color-black);
    margin: 0 1rem;
  }
`;

const buttonContainerStyle = css`
  display: flex;
  justify-content: space-between;
`;

const buttonStyle = css`
  margin-bottom: 4rem;
  background-color: var(--color-base);
  border-radius: 0.5rem;
  width: 7.5rem;
  height: 7.25rem;
  display: flex;
  text-align: center;
  justify-content: center;

  a {
    display: block;
    color: var(--color-black);
    text-decoration: none;
    font-size: 1rem;
    padding: 2.9rem 1rem;
  }
`;

const sendButtonStyle = css`
  background-color: var(--color-accent);

  a {
    color: var(--color-white);
    background-color: var(--color-accent);
    padding: 2.1rem 1.5rem;
  }
`;

/**
 * 作成したメッセージを確認する画面を返す
 */

export const CreateMessageCheck = async (
  props: PropsWithChildren<{ id: string }>,
) => {
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
        <div class={messageContainerStyle}>
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
        <div class={buttonContainerStyle}>
          <div class={buttonStyle}>
            <a href="./">つくり直す</a>
          </div>
          <div class={cx(buttonStyle, sendButtonStyle)}>
            {/*share()の引数にはメッセージのidを入れる, 一旦1で固定*/}
            <a onclick="_share(1)" href="">
              気持ちを
              <br />
              送る
            </a>
          </div>
        </div>
      </div>
      <script src="./public/share.js"></script>
    </WithHTML>
  );
};
