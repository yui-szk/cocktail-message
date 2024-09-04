//tmp_list = ['apple', 'orange', 'grape', 'strawberry', 'apples'];//テスト用
let created_sentence = [];

const container = document.getElementById('container');

window.addEventListener('load', (event) => {
    // ウィンドウが読み込まれた時の処理
    fetch('/api/cocktail/all')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            //return response.json(); // JSON形式のレスポンスをパース
            //console.log(response);
        })
        .then(data => {
            console.log('Received data:', data); // 取得したデータをコンソールに出力
            // ここで、データを使った他の処理を実行することができます
            const ul = document.getElementById('kensaku_result');
            
            for(i = 0; i < data.length; i++){
                // li 要素を作成
                const li = document.createElement('li');
                
                // li 要素に onclick イベントを追加
                li.setAttribute('onclick', 'buttonclick(this)');
                
                // li のテキストコンテンツを追加
                li.textContent = data[i].word;
                
                // small 要素を作成してテキストを追加
                const small = document.createElement('small');
                small.textContent = data[i].name;
                
                // li に small 要素を追加
                li.appendChild(small);
                
                // ul に li 要素を追加
                ul.appendChild(li);
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error); // エラーハンドリング
        });
});


function buttonclick(obj){
    let text = '';
    obj.childNodes.forEach(node => {
        if(node.nodeType === node.TEXT_NODE){
            text += node.textContent.trim();
        }
    });
    const b_text = text;//クリックしたボタンの文字
    //console.log(b_text);


    if(created_sentence.includes(b_text)){
        //nothing
    }else if(document.getElementById("c_button").childElementCount >= 4){//配列の要素で判定
        alert("これ以上言葉を追加できません");
    }else{
        created_sentence.push(b_text);

        //console.log(created_sentence);//fortest

        const newLi = document.createElement("li");
        newLi.textContent = b_text;

        const button = document.createElement('button');
        const span = document.createElement('span');
        span.className = 'material-symbols-outlined';
        span.textContent = 'close';
        button.appendChild(span);
        newLi.appendChild(button);

        const ul = document.querySelector('#clicked_button ul');
        ul.appendChild(newLi);
    }
}


function kennsaku_show() {
    const search_kekka = document.getElementById("kennsaku").value;//検索文字列
    //search_result.innerHTML = '';//検索表示箇所を空白にする

    const liElements = document.querySelectorAll("#kennsaku_result li");
    liElements.forEach(li => {
        let text2 = '';
        li.childNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                text2 += node.textContent.trim();
            }
        });
        //console.log(text2);//for test

        if (text2.includes(search_kekka)) {
            li.style.display = ''; // 検索文字列を含む場合は表示
        } else {
            li.style.display = 'none'; // 含まない場合は非表示
        }
    });
};


document.addEventListener('DOMContentLoaded', function() {
    // clicked_button 内のすべての <li> 要素を取得
    const clickedButtonContainer = document.getElementById('clicked_button');

    // イベントデリゲーションを使用してクリックイベントを処理
    clickedButtonContainer.addEventListener('click', function(event) {
        // クリックされた要素が <li> 要素かどうかを確認
        const liElement = event.target.closest('li');
        if (liElement) {
            // <li> 要素内のテキストを取得
            const textContent = Array.from(liElement.childNodes)
                                     .filter(node => node.nodeType === Node.TEXT_NODE)
                                     .map(node => node.textContent.trim())
                                     .join(' ');
            //console.log(textContent); // クリックされた <li> 要素のテキストを表示
            liElement.remove();

            tmp = [];
            for(i = 0; i < created_sentence.length; i++){
                if(created_sentence[i] !== textContent){
                    tmp.push(created_sentence[i]);
                }
            }
            created_sentence = tmp;
            //console.log("created_sentence:" + created_sentence);成功
        }
    });
});
