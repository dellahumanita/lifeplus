import { ProgressBar } from "./progressBar.js";
import { Buttons } from "./buttons.js";

// this script will load a progress bar with its corresponding button

let pb = new ProgressBar(document.querySelector('.progressBar'), 0);
let incBtn = new Buttons("+", document.querySelector(".habits"));
let decBtn = new Buttons("-", document.querySelector(".habits"));

incBtn.add();
decBtn.add();

