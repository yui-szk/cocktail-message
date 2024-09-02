import { css } from "@hono/hono/css";
import { WithHTMX } from "../layout/WithHTMX.tsx";

const imageStyle = css`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const buttonStyle = css`
  position: absolute;
  bottom: 6rem;
  background-color: #e9e3dd;
  border-radius: 0.25rem;

  a {
    display: block;
    color: #000000;
    text-decoration: none;
    padding: 2.5rem 2rem;
    font-size: 1.5rem;
  }
`;

export function CreateMessageTop() {
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
      </div>
    </WithHTMX>
  );
}
