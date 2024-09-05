async function share(){
    const title = 'Cocktail message';
    const url = 'https://example.com';
    if(!!navigator.share){
        try{
            await navigator.share({title: title, url: url, text:"カクテル"});
        }catch(e){
            console.log(e);
        }
    }else{
        alert(url);
    }
}