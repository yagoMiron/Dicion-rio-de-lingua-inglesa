import { search } from "../controllers/palavraEncontradaController.js";

const $ = document.getElementById.bind(document);

export function printCard(palavraEncontrada) {
  const { id, word, meanings, audios } = palavraEncontrada;
  const qtdMeanings = meanings.length;
  const audioFiltrado = audios.filter((audio) => audio !== "");

  const qtdAudios = audioFiltrado.length;
  const significadosString = meanings.join(".;");
  const pronunciasString = audioFiltrado.join(".;");
  const url = `/details.html?word=${word}&meanings=${significadosString}&audios=${pronunciasString}`;

  const wordCard = `
        <div class="word-card">
            <a href="${url}">
                <h1>${id} - ${word}</h1>
                <p>${qtdMeanings} significado(s) e ${qtdAudios} áudio(s) de pronuncia</p>
            </a>
        </div> 
    `;
  const wordsArea = $("words-area");
  wordsArea.insertAdjacentHTML("beforeend", wordCard);
}

export async function searchWords() {
  const query = $("query").value.trim();
  if (query) {
    const notFoundMessage = $("not-found-message");
    notFoundMessage.style.display = "none";
    const wordsArea = $("words-area");
    const loadingAnimation = `<img id="loading" src="/img/loading.gif" alt="Procurando">`;
    wordsArea.innerHTML = loadingAnimation;
    const words = await search(query);
    wordsArea.innerHTML = "";

    if (!(words.length > 0)) {
      notFoundMessage.style.display = "block";
      return;
    }
    const wordsJSON = JSON.stringify(words);
    localStorage.setItem("words", wordsJSON); //salva no local storage
    words.forEach((s) => printCard(s));
  }
}

export function wordDetails(word) {
  $("metadata-title").innerHTML = `Significados de ${word.word}`;
  console.log(word);

  const meanings = word.meanings.split(".;");
  const audios = word.audios.split(".;");

  meanings.forEach((meaning) => {
    $("meaning-list").insertAdjacentHTML("beforeend", `<li>${meaning}</li>`);
  });
  audios.forEach((audio) => {
    $("audio-panel").insertAdjacentHTML(
      "beforeend",
      `<audio controls>
        <source src="${audio}" type="audio/mpeg">
        Your browser does not support the audio element.
      </audio>`
    );
  });
}

export function loadWords() {
  const wordsJSON = localStorage.getItem("words");
  if (wordsJSON) {
    const words = JSON.parse(wordsJSON);
    words.forEach((w) => printCard(w)); //caso exista palavras salvas no local storage printe cada um deles na tela
  }
}
