let created_sentence = [];

function _buttonclick(obj) {
  let text = "";
  obj.childNodes.forEach((node) => {
    if (node.nodeType === node.TEXT_NODE) {
      text += node.textContent.trim();
    }
  });
  const selectedCocktailMessage = text; //クリックしたボタンのword

  if (document.getElementById("selected_message_list").childElementCount >= 4) {
    alert("これ以上言葉を追加できません");
  } else if (
    created_sentence.filter((e) => {
      return e.message === selectedCocktailMessage;
    }).length === 0
  ) {
    created_sentence.push({
      name: obj.childNodes[1].innerText,
      message: selectedCocktailMessage,
    });

    const newLi = document.createElement("li");
    newLi.textContent = selectedCocktailMessage;
    created_sentence.map(() => {
      newLi.setAttribute("id", `selected-word-${created_sentence.length}`);
    });

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
    const liElement = event.target.closest("button");
    if (liElement) {
      // <li> 要素内のテキストを取得
      const textContent = liElement.parentNode.textContent.replace("close", "");
      liElement.parentNode.remove();

      created_sentence = created_sentence.filter((e) => {
        return e.message !== textContent;
      });
    }
  });
});

async function _messageSave() {
  const cocktails = [];
  created_sentence.forEach((e) => {
    cocktails.push({ name: String(e.name) });
  });
  const res = await fetch("/api/message", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ "cocktails": cocktails }),
  });

  const body = await res.text();
  globalThis.location = "/check?id=" + body;
}
