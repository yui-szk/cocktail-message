import { css } from "@hono/hono/css";
import { WithHTML } from "../layout/WithHTML.tsx";

const imageStyle = css`
  height: 72vh;
  display: flex;
  justify-content: center;

  img {
    height: calc(100% - 6.5rem);
    margin-top: 4rem;
  }
`;

const buttonStyle = css`
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
    padding: 2.1rem 1rem;
  }
`;

/**
 * メッセージ作成のトップ画面を返す関数
 */

export const CreateMessageTop = () => {
  return (
    <WithHTML>
      <div>
        <div class={imageStyle}>
          <img src="/public/images/cocktail-glass.svg" alt="empty glass" />
        </div>
        <div class={buttonStyle}>
          <a href="./select">
            気持ちを
            <br />
            追加する
          </a>
        </div>
      </div>
    </WithHTML>
  );
};
