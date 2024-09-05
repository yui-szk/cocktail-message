import { css, cx } from "@hono/hono/css";
import { WithHTML } from "../layout/WithHTML.tsx";

const imageStyle = css`
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;

  img {
    min-width: 24rem;
    width: 27rem;
  }
`;

const messageContainerStyle = css`
  display: grid;
  grid-template-columns: 7rem 1fr 7rem;
  grid-template-rows: 20% 20% 20% 20% 20%;
  position: absolute;
  top: 1rem;
  height: 70vh;
  width: calc(100% - 3.5rem);
  max-width: 430px;
  padding: 3rem 0;

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
  background-color: #eadf4a;
  min-width: 7rem;
  min-height: 7rem;
  border-radius: 100%;
  margin-top: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;

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
          <img src="/public/images/empty-glass.png" alt="empty glass" />
        </div>
        <div class={messageContainerStyle}>
          <div class={messageStyle} id="grid-item-1">
            <p>
              あなたを
              <br />
              守りたい
            </p>
          </div>
          <div class={messageStyle} id="grid-item-2">
            <p>
              あなたを
              <br />
              守りたい
            </p>
          </div>
          <div class={messageStyle} id="grid-item-3">
            <p>
              あなたを
              <br />
              守りたい
            </p>
          </div>
          <div class={messageStyle} id="grid-item-4">
            <p>
              あなたを
              <br />
              守りたい
            </p>
          </div>
        </div>
        <div class={buttonContainerStyle}>
          <div class={buttonStyle}>
            <a href="./select">
              気持ちを
              <br />
              追加する
            </a>
          </div>

          <div class={buttonStyle}>
            <a href="https://twitter.com/intent/tweet?text=あいうえお">
              気持ちを共有する
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
