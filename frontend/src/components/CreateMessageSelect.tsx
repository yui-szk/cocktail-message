import { css } from "@hono/hono/css";
import { WithHTMX } from "../layout/WithHTMX.tsx";

const selectedStyle = css`
  height: 24vh;
  list-style: none;
  margin-top: 1.5rem;

  li {
    display: grid;
    grid-template-columns: 3fr 1fr;
    background-color: var(--color-base);
    font-size: 1rem;
    color: var(--color-main);
    padding: 0.25rem 0.75rem;
    margin: 0.5rem 0;
    border-radius: 0.5rem;

    button {
      justify-self: end;
      border: none;
      background-color: var(--color-base);
    }
  }
`;

const wordListContainerStyle = css`
  background-color: var(--color-base);
  border-radius: 1.25rem;

  form {
    display: flex;
    padding: 1rem;

    input {
      background-color: var(--color-main);
      color: var(--color-white);
      font-size: 1rem;
      width: 100%;
      border-radius: 0.5rem 0 0 0.5rem;
      padding: 0.75rem;
      border: none;
      outline: none;
    }

    button {
      border: none;
      background-color: var(--color-main);
      color: var(--color-white);
      border-radius: 0 0.5rem 0.5rem 0;
      padding-right: 0.5rem;
    }
  }
`;

const wordListStyle = css`
  list-style: none;
  color: var(--color-main);
  height: calc(100vh - 24vh - 9.25rem);
  overflow-y: scroll;

  li {
    display: grid;
    grid-template-columns: 5fr 2fr;
    font-size: 1rem;
    align-items: center;
    padding: 1rem;
    padding-left: 1.5rem;
    border-top: solid 1px var(--color-stroke);

    small {
      color: #7c7c7c;
      font-size: 0.75rem;
    }
  }
`;

const checkLinkStyle = css`
  position: absolute;
  bottom: -1.25rem;
  left: 50%;
  transform: translateX(-50%);

  a {
    background-color: var(--color-accent);
    width: 5rem;
    height: 5rem;
    border-radius: 100%;
    color: var(--color-white);
    text-decoration: none;
    font-size: 1.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export function CreateMessageSelect() {
  return (
    <WithHTMX>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />
      <div>
        <div>
          <ul class={selectedStyle}>
            <li>
              あなたを守りたい<button>✖️</button>
            </li>
            <li>
              いつも2人で<button>✖️</button>
            </li>
          </ul>
        </div>
        <div class={wordListContainerStyle}>
          <div>
            <form action="" hx-post="" hx-trigger="submit">
              <input type="text" />
              <button type="submit">
                <span class="material-symbols-outlined">search</span>{" "}
              </button>
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
              素晴らしい<small>アプリコット・クーラー</small>
            </li>
            <li>
              冒険<small>アラウンド・ザ・ワールド</small>
            </li>
            <li>
              偽りなき心<small>アラスカ</small>
            </li>
            <li>
              幸せいっぱい<small>ウエディング・ベル</small>
            </li>
            <li>
              晴れやかな心で<small>エバー・グリーン</small>
            </li>
            <li>
              あなたに会いたい<small>ケーブルグラム</small>
            </li>
            <li>
              華麗<small>コスモポリタン</small>
            </li>
            <li>
              あるがままに<small>ジン・フィズ</small>
            </li>
            <li>
              秘密<small>シンガポール・スリング</small>
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
