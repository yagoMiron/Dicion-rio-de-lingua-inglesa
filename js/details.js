import PalavraEncontrada from "./models/palavraEncontradaModel.js";
import { wordDetails } from "./view/palavraEncontrada.View.js";

const search = window.location.search;
const params = new URLSearchParams(search);

const word = new PalavraEncontrada();
word.word = params.get("word");
word.meanings = params.get("meanings");
word.audios = params.get("audios");


wordDetails(word);
