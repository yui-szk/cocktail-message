let created_sentence = [];

addEventListener("load", () => {
  // ウィンドウが読み込まれた時の処理
  fetch("/api/cocktail/all")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Received data:", data); // 取得したデータをコンソールに出力
      // ここからデータのリストを作成
      const liElements = document.getElementById("kennsaku_result");
      for (i = 0; i < data.length; i++) {
        const li = document.createElement("li");
        li.setAttribute("onclick", "buttonclick(this)");
        li.textContent = data[i].word;

        const small = document.createElement("small");
        small.textContent = data[i].name;

        li.appendChild(small);
        liElements.appendChild(li);
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error); // エラーハンドリング
    });
});

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
    let text2 = "";
    li.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        text2 += node.textContent.trim();
      }
    });

    li.style.display = text2.includes(search_kekka) ? "" : "none";
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
