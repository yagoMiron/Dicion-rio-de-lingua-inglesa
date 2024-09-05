import { loadWords, searchWords } from "./view/palavraEncontrada.View.js";

const host = window.location.origin;
const previousURL = document.referrer;
console.log(host);

if (previousURL.startsWith(host + "/details.html")) {
  //se a pagina previa era /details carregue os shows salvos no localhost
  loadWords();
}
const form = document.querySelector("#form-area form");
form.onsubmit = (e) => {
  e.preventDefault();
  searchWords();
};
