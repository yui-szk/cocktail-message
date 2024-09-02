import { css, cx } from "@hono/hono/css";
import { WithHTMX } from "../layout/WithHTMX.tsx";

const imageStyle = css`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
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

export function CreateMessageCheck() {
  return (
    <WithHTMX>
      <div>
        <div class={imageStyle}>
          <img src="src/assets/images/empty-glass" alt="empty glass" />
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
    </WithHTMX>
  );
}
