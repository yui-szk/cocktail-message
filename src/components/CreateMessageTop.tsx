import { css } from "@hono/hono/css";
import { WithHTML } from "../layout/WithHTML.tsx";

const imageStyle = css`
  height: 85vh;
  display: flex;
  justify-content: center;
  margin-top: 3rem;

  img {
    height: calc(100% - 11rem);
  }
`;

const buttonStyle = css`
  position: absolute;
  bottom: 4rem;
  background-color: var(--color-base);
  border-radius: 0.5rem;

  a {
    display: block;
    color: var(--color-black);
    text-decoration: none;
    padding: 2rem 1.5rem;
    font-size: 1rem;
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
