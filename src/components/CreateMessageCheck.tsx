import { css, cx } from "@hono/hono/css";
import { WithHTML } from "../layout/WithHTML.tsx";

const imageStyle = css`
  height: 90vh;
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
  left: 2rem;
  top: 18rem;

  p {
    color: #000000;
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

const sendButtonStyle = css`
  right: 1.75rem;
  background-color: var(--color-accent);

  a {
    color: var(--color-white);
  }
`;

/**
 * @function
 */

export const CreateMessageCheck = () => {
  return (
    <WithHTML>
      <div>
        <div class={imageStyle}>
          <img src="../images/empty-glass.png" alt="empty glass" />
        </div>
        <div class={messageStyle}>
          <p>
            あなたを
            <br />
            守りたい
          </p>
        </div>
        <div class={buttonStyle}>
          <a href="/create/select">
            気持ちを
            <br />
            追加する
          </a>
        </div>
        <div class={cx(buttonStyle, sendButtonStyle)}>
          <a href="/create/check">
            気持ちを
            <br />
            送る
          </a>
        </div>
      </div>
    </WithHTML>
  );
};
