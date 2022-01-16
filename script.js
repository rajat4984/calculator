const buttons = Array.from(document.querySelectorAll(".number , .operator"));
let displayText = document.querySelector(".display-text");
const clearButton = document.querySelector(".clear");
const clearLastButton = document.querySelector(".clearLast");


const handleButtonClick = (e) => {
  displayText.textContent += e.target.textContent;
};

const handleClear = () => {
  displayText.textContent = 0;
};

const handleclearLastButton = () => {
  let str = displayText.textContent;
  str = str.slice(0, -1);
  displayText.textContent = str;
};

buttons.forEach((button) => {
  button.addEventListener("click", handleButtonClick);
});

clearButton.addEventListener("click", handleClear);
clearLastButton.addEventListener("click", handleclearLastButton);

const num1 = 10;
const num2 = 4;

const add = (a, b) => {
  return a + b;
};

const subtract = (a, b) => {
  return a - b;
};

const multiply = (a, b) => {
  return a * b;
};

const division = (a, b) => {
  return a / b;
};

const percentage = (a, b) => {
  return a * (b / 100);
};

const operate = (func, a, b) => {
  return func(a, b);
};

console.log(operate(multiply, num1, num2));
