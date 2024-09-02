tmp_list = ['apple', 'orange', 'grape', 'strawberry', 'apples'];//テスト用
created_sentence = [];

const search_str = document.getElementById("kennsaku");
const search_result = document.getElementById("kennsaku_result");
const container = document.getElementById('container');
const delete_button = document.getElementById("delete_button");

const decided = document.getElementById("clicked_button");//選択した語句が表示
document.body.insertBefore(decided, container);//kennsakuの前にdecidedの要素を挿入

window.addEventListener('load', (event) => {
    // ウィンドウが読み込まれた時の処理
    fetch('http://localhost:8000/api/cocktail/all')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // JSON形式のレスポンスをパース
        })
        .then(data => {
            console.log('Received data:', data); // 取得したデータをコンソールに出力
            // ここで、データを使った他の処理を実行することができます
        })
        .catch(error => {
            console.error('Error fetching data:', error); // エラーハンドリング
        });
});


function buttonclick(event){
    const b_text = event.target.textContent;

    if(created_sentence.includes(b_text)){
        //nothing
    }else{
        const newButton = document.createElement('button');
        created_sentence.push(b_text);
        newButton.textContent = b_text;
        decided.appendChild(newButton);
    }
}

function sakuzyo_sentence(){
    decided.innerHTML = '';
}

function updatecontainersize(){
    var buttonstyle = window.getComputedStyle(document.getElementById('button'), '');
    const height = buttonstyle.getPropertyValue('height');
    const width = buttonstyle.getPropertyValue('width');
    const gap = buttonstyle.getPropertyValue('gap');
    const num = container.querySelectorAll('button');//ボタンの数

    const height2 = num * (height + gap) - gap;
    container.style.height = height2;
}

search_str.addEventListener('input', function() {
    const search_kekka = search_str.value;//検索文字列
    search_result.innerHTML = '';//検索表示箇所を空白にする

    tmp_list.forEach(text => {
        if(text.includes(search_kekka)){
            const new_com = document.createElement('button');
            new_com.textContent = text;
            new_com.onclick = buttonclick;
            search_result.appendChild(new_com);
        }
    });
    updatecontainersize();
});
