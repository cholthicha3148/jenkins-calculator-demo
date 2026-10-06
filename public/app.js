import { addNumbers, formatResult } from "./src/calculator.js";

const form = document.querySelector("#calculator-form");
const inputA = document.querySelector("#number-a");
const inputB = document.querySelector("#number-b");
const result = document.querySelector("#result");

function updateResult() {
  const total = addNumbers(inputA.value, inputB.value);
  result.textContent = `ผลลัพธ์: ${formatResult(total)}`;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  updateResult();
});

updateResult();
