import { css } from "@hono/hono/css";
import { WithHTMX } from "../layout/WithHTMX.tsx";

const selectedStyle = css`
  height: 30vh;
  list-style: none;
`;

const wordListContainerStyle = css`
  background-color: var(--color-base);
  border-radius: 2rem;
  form {
    text-align: center;
    padding: 1rem 2rem;
    input {
      background-color: var(--color-main);
      color: var(--color-white);
      font-size: 1.5rem;
      width: 25rem;
      border-radius: 0.5rem;
      padding: 1rem;
    }
  }
`;

const wordListStyle = css`
  list-style: none;
  color: var(--color-black);
  height: 54vh;
  overflow-y: scroll;

  li {
    display: grid;
    grid-template-columns: 3fr 1fr;
    font-size: 1.5rem;
    align-items: center;
    padding: 1.5rem;
    border-top: solid 1px var(--color-stroke);
    small {
      justify-self: end;
      font-size: 1rem;
    }
  }
`;

const checkLinkStyle = css`
  display: flex;
  position: absolute;
  left: 40vw;
  bottom: -1.5rem;
  a {
    background-color: var(--color-accent);
    width: 7rem;
    height: 7rem;
    border-radius: 100%;
    color: var(--color-white);
    text-decoration: none;
    font-size: 1.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export function CreateMessageSelect() {
  return (
    <WithHTMX>
      <div>
        <div>
          <ul class={selectedStyle}>
            <li></li>
            <li></li>
          </ul>
        </div>
        <div class={wordListContainerStyle}>
          <div>
            <form action="" hx-post="" hx-trigger="submit">
              <input type="text" />
            </form>
          </div>
          <ul class={wordListStyle}>
            <li hx-post="" hx-trigger="click">
              あなたを守りたい<small>ブルドッグ</small>
            </li>
            <li>
              いつも2人で<small>サイドカー</small>
            </li>
            <li>
              正しき心<small>ジンバッグ</small>
            </li>
            <li>
              あなたを守りたい<small>ブルドッグ</small>
            </li>
            <li>
              いつも2人で<small>サイドカー</small>
            </li>
            <li>
              正しき心<small>ジンバッグ</small>
            </li>
            <li>
              あなたを守りたい<small>ブルドッグ</small>
            </li>
            <li>
              いつも2人で<small>サイドカー</small>
            </li>
            <li>
              正しき心<small>ジンバッグ</small>
            </li>
          </ul>
          <div class={checkLinkStyle}>
            <a href="/create/check">確認</a>
          </div>
        </div>
      </div>
    </WithHTMX>
  );
}
