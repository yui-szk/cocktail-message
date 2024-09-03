//tmp_list = ['apple', 'orange', 'grape', 'strawberry', 'apples'];//テスト用
created_sentence = [];

const container = document.getElementById('container');

window.addEventListener('load', (event) => {
    // ウィンドウが読み込まれた時の処理
    fetch('/api/cocktail/all')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            //return response.json(); // JSON形式のレスポンスをパース
            console.log(response);
        })
        .then(data => {
            console.log('Received data:', data); // 取得したデータをコンソールに出力
            // ここで、データを使った他の処理を実行することができます
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


    if(created_sentence.includes(b_text)){
        //nothing
    }else if(document.getElementById("c_button").childElementCount >= 4){//配列の要素で判定
        alert("これ以上言葉を追加できません");
    }else{
        created_sentence.push(b_text);

        console.log(created_sentence);//fortest

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

function updatecontainersize(){
    var buttonstyle = window.getComputedStyle(document.getElementById('button'), '');
    const height = buttonstyle.getPropertyValue('height');
    const width = buttonstyle.getPropertyValue('width');
    const gap = buttonstyle.getPropertyValue('gap');
    const num = container.querySelectorAll('button');//ボタンの数

    const height2 = num * (height + gap) - gap;
    container.style.height = height2;
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

function senntaku_kaizyo(obj) {
    // clicked_button 内のすべてのボタンを取得
    let text = '';
    {/*obj.childNodes.forEach(node => {
        if(node.nodeType === node.TEXT_NODE){
            text += node.textContent.trim();
        }
    });
*/}
    const b_text = obj.textContent;
    console.log(b_text);//b_textが取得できていない
    console.log(obj);

    //var newArray = created_sentence.filter(t => t !== b_text);
    //created_sentence = newArray;
    var tmp = [];
    for(var i = 0; i < created_sentence.length; i++){
        if(created_sentence[i] !== b_text){
            tmp.push(created_sentence[i]);
        }
    }
    created_sentence = tmp;
    //console.log(created_sentence);//for test

    event.target.closest('li').remove();//event.target
};
