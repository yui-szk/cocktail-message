let created_sentence = [];

function _buttonclick(obj) {
  let text = "";
  obj.childNodes.forEach((node) => {
    if (node.nodeType === node.TEXT_NODE) {
      text += node.textContent.trim();
    }
  });
  const selectedCocktailMessage = text; //クリックしたボタンの文字

  if (document.getElementById("selected_message_list").childElementCount >= 4) {
    alert("これ以上言葉を追加できません");
  } else if (!created_sentence.includes(selectedCocktailMessage)) {
    created_sentence.push(selectedCocktailMessage);

    const newLi = document.createElement("li");
    newLi.textContent = selectedCocktailMessage;

    const button = document.createElement("button");
    const span = document.createElement("span");
    span.className = "material-symbols-outlined";
    span.textContent = "close";
    button.appendChild(span);
    newLi.appendChild(button);

    const ul = document.querySelector("#clicked_button ul");
    ul.appendChild(newLi);
  }
}

function _kennsaku_show() {
  const search_kekka = document.getElementById("kennsaku").value; //検索文字列

  const liElements = document.querySelectorAll("#kennsaku_result li");
  liElements.forEach((li) => {
    let text = "";
    li.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        text += node.textContent.trim();
      }
    });

    li.style.display = text.includes(search_kekka) ? "" : "none";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // clicked_button 内のすべての <li> 要素を取得
  const clickedButtonContainer = document.getElementById("clicked_button");

  // イベントデリゲーションを使用してクリックイベントを処理
  clickedButtonContainer.addEventListener("click", function (event) {
    // クリックされた要素が <li> 要素かどうかを確認
    const liElement = event.target.closest("li");
    if (liElement) {
      // <li> 要素内のテキストを取得
      const textContent = Array.from(liElement.childNodes)
        .filter((node) => node.nodeType === Node.TEXT_NODE)
        .map((node) => node.textContent.trim())
        .join(" ");
      liElement.remove();

      // constで宣言しても配列操作はできるのでconstにしておく
      const tmp = [];
      for (i = 0; i < created_sentence.length; i++) {
        if (created_sentence[i] !== textContent) {
          tmp.push(created_sentence[i]);
        }
      }
      created_sentence = tmp;
    }
  });
});
