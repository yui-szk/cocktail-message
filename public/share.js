async function share(id) {
  const title = "Cocktail message";
  // 閲覧用のページまだないので、一旦productionのルートを置いておく
  // TODO: 閲覧ページ用のURLに変更する
  const baseUrl = "https://cocktail-message.deno.dev/";
  const url = baseUrl + "?id=" + id;
  if (!!navigator.share) {
    try {
      await navigator.share({ title: title, url: url, text: "カクテル" });
    } catch (e) {
      console.log(e);
    }
  } else {
    alert(`共有用のURL: ${url}`);
  }
}
