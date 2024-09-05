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
  } else if (created_sentence.filter((e) => {
    return e.message === selectedCocktailMessage}).length === 0) {
    //created_sentence.push(selectedCocktailMessage);
    //console.log(obj.childNodes[1].innerText);
    created_sentence.push({name: obj.childNodes[1].innerText, message: selectedCocktailMessage});

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

      created_sentence = created_sentence.filter((e) => {
        return e.message !== textContent;
      });
    }
  });
});


async function messageSave(){
  const cocktails = []
  // const cocktails: { name: string }[] = array.map((item: string) => {
  //   return { name: item };
  // });
  created_sentence.forEach((e) => {
    cocktails.push({name: String(e.name)});
  });
  const res = await fetch("/api/message",{method: "POST",
    headers:{ "Content-Type": "application/json"},
    body:JSON.stringify({"cocktails": cocktails})
  });

  const body = await res.text();
  document.getElementById("message_save").href = "/check?id=" + body;
  //console.log(body);
  //const data = await res.json();
  //console.log(data);
  //return data.id;
}
