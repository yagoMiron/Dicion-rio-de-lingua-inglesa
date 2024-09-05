import PalavraEncontrada from "../models/palavraEncontradaModel.js";

const API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

export const search = async (term) => {
  const response = await fetch(API_URL + term);
  const results = await response.json();
  const PalavrasEncontradas = [];
  let idAtual = 0;
  results.forEach((r) => {
    idAtual++;
    const { word, phonetics, meanings } = r;
    const { definitions } = meanings;
    const palavraEncontrada = new PalavraEncontrada();
    palavraEncontrada.id = idAtual;
    palavraEncontrada.word = word;
    phonetics.forEach((e) => palavraEncontrada.audios.push(e.audio));
    console.log(meanings);
    meanings.forEach((meaning) => {
      meaning.definitions.forEach((e) =>
        palavraEncontrada.meanings.push(e.definition)
      );
    });
    PalavrasEncontradas.push(palavraEncontrada);
  });

  return PalavrasEncontradas;
};
