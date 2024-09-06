async function _share() {
  const id = globalThis.location.search;
  const title = "cocktail message";
  const baseUrl = "https://cocktail-message.deno.dev/view";
  const url = baseUrl + id;
  if (navigator.share) {
    try {
      await navigator.share({ title: title, url: url, text: "作成したカクテルメッセージ" });
    } catch (e) {
      console.log(e);
    }
  } else {
    alert(`共有用のURL: ${url}`);
  }
}
