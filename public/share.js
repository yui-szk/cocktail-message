async function share(){
    try{
        await navigator.share({title:"cocktail message", url: "https://example.com", text:"カクテル"});
    }catch(e){
        console.log(e);
    }
}