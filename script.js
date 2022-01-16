const buttons = Array.from(document.querySelectorAll(".number , .operator"));
const clearButton = document.querySelector(".clear");
const clearLastButton = document.querySelector(".clearLast");
const equalButton = document.querySelector("#equal");
let displayText = document.querySelector(".display-text");
let operatorNameElement = document.querySelectorAll(".operator");
var num1 = 0;
var num2 = 0;
var funcName;
// ---------------------------CALCULATOR---------------------------------

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

// -------------------EVENT LISTENER FUNCTION----------------------------

const handleButtonClick = (e) => {
  displayText.textContent += e.target.textContent;
};

const handleClear = () => {
  displayText.textContent = "";
};

const handleclearLastButton = () => {
  let str = displayText.textContent;
  str = str.slice(0, -1);
  displayText.textContent = str;
};

const getOperatorName = (e) => {
  console.log(e.target.value);
  funcName = e.target.value;
};

const handleEqual = () => { 
  let content = getOperatorSign();
  num1 = Number(content[0]);
  num2 = Number(content[1]);
  let func = new Function("return " + funcName)();
  let answer = operate(func, num1, num2);
  if (!(answer % 1 === 0)) {
    // to make decimal point to 2 points only
    answer = answer.toFixed(2);
  }
  displayText.textContent = answer;
};

const getOperatorSign = () => {
  switch (funcName) {
    case "add":
      return displayText.textContent.split("+");

    case "subtract":
      return displayText.textContent.split("-");

    case "multiply":
      return displayText.textContent.split("X");

    case "division":
      return displayText.textContent.split("/");

    default:
      break;
  }
};

// --------------------------ADD EVENT LISTENERS--------------------------------

buttons.forEach((button) => {
  button.addEventListener("click", handleButtonClick);
});

clearButton.addEventListener("click", handleClear);
clearLastButton.addEventListener("click", handleclearLastButton);
equalButton.addEventListener("click", handleEqual);

const operator = operatorNameElement.forEach((operator) => {
  operator.addEventListener("click", getOperatorName);
});
