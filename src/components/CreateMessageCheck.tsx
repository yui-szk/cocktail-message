import { css, cx } from "@hono/hono/css";
import { WithHTML } from "../layout/WithHTML.tsx";
import { CocktailGlass } from "./CocktailGlass.tsx";

const imageStyle = css`
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 24rem;
  }
`;

const messageStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  background-color: #eadf4a;
  width: 7rem;
  height: 7rem;
  border-radius: 100%;

  p {
    color: #000000;
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
  text-align: center;

  a {
    display: block;
    color: var(--color-black);
    text-decoration: none;
    padding: 2rem 1.5rem;
    font-size: 1rem;
  }
`;

const sendButtonStyle = css`
  background-color: var(--color-accent);

  a {
    color: var(--color-white);
  }
`;

/**
 * 作成したメッセージを確認する画面を返す関数
 */

export const CreateMessageCheck = () => {
  return (
    <WithHTML>
      <div>
        <div class={imageStyle}>
          <CocktailGlass />
        </div>
        <div class={messageStyle}>
          <p>
            あなたを
            <br />
            守りたい
          </p>
        </div>
        <div class={buttonContainerStyle}>
          <div class={buttonStyle}>
            <a href="./select">
              気持ちを
              <br />
              追加する
            </a>
          </div>
          <div class={cx(buttonStyle, sendButtonStyle)}>
            <a href="./check">
              気持ちを
              <br />
              送る
            </a>
          </div>
        </div>
      </div>
    </WithHTML>
  );
};
