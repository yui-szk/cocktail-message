import { css } from "@hono/hono/css";

import { WithHTML } from "../layout/WithHTML.tsx";
import { getAllCocktails } from "./utils.ts";
import { Cocktail } from "../api/utils/types.ts";

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
    border-radius: 2rem;
    align-items: center;
    flex-wrap: wrap;

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

  #search-box {
    display: flex;
    padding: 1rem;

    input {
      background-color: var(--color-main);
      color: var(--color-white);
      font-size: 1rem;
      width: 100%;
      border-radius: 0.5rem 0 0 0.5rem;
      padding: 0.75rem 0 0.75rem 0.75rem;
      border: none;
      outline: none;
    }

    #search-icon {
      border: none;
      background-color: var(--color-main);
      color: var(--color-white);
      border-radius: 0 0.5rem 0.5rem 0;
      padding: 0 0.5rem;
      display: flex;
      align-items: center;
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

/**
 * メッセージを選択する画面を返す関数
 */

export const CreateMessageSelect = async () => {
  return (
    <WithHTML>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />
      <div>
        <div id="clicked_button">
          <ul class={selectedStyle} id="selected_message_list"></ul>
        </div>
        <div class={wordListContainerStyle}>
          <div id="search-box">
            <input
              type="text"
              value=""
              id="kennsaku"
              placeholder="検索ワードの入力"
              oninput="_kennsaku_show()"
            />
            <div id="search-icon">
              <span class="material-symbols-outlined">search</span>
            </div>
          </div>
          <ul class={wordListStyle} id="kennsaku_result">
            {(await getAllCocktails()).map((cocktail: Cocktail) => (
              <li onclick="_buttonclick(this)">
                {cocktail.word} <small>{cocktail.name}</small>
              </li>
            ))}
          </ul>
          <div class={checkLinkStyle}>
            <a id="message_save" onclick="_messageSave()">決定</a>
          </div>
        </div>
      </div>
      <script src="./public/script.js"></script>
    </WithHTML>
  );
};
