const buttons = Array.from(document.querySelectorAll(".number"));
const clearButton = document.querySelector(".clear");
const clearLastButton = document.querySelector(".clearLast");
const equalButton = document.querySelector("#equal");
const pointButton = document.querySelector(".decimal");
const operatorNameElement = Array.from(document.querySelectorAll(".operator"));

let displayText = document.querySelector(".display-text");
var num1 = 0;
var num2 = 0;
var funcName;
var answer;
var displayArray = [];
var operatorClicked = false;
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
  if (displayText.textContent === "0") {
    displayText.textContent = "";
  }
  displayText.textContent += e.target.textContent;
  displayArray.push(e.target.textContent);
};

const handleClear = () => {
  displayText.textContent = "0";
  displayArray = [];
  disableOperatorButtons(false)
};

const handleclearLastButton = () => {
  let str = displayText.textContent;
  str = str.slice(0, -1);
  displayText.textContent = str;
  displayArray.pop();

  if (!(displayArray.includes(getOperatorSign()))){
    disableOperatorButtons(false)
  }
  console.log(displayArray);
};

const getOperatorName = (e) => {
  displayText.textContent += e.target.textContent 
  operatorClicked = true;
  disableOperatorButtons(true)
  funcName = e.target.value;
};

const handleEqual = () => {
  let content = getOperatorSign();
  num1 = Number(content[0]);
  num2 = Number(content[1]);

  let func = new Function("return " + funcName)();
  answer = operate(func, num1, num2);
  if (!(answer % 1 === 0)) {
    answer = answer.toFixed(2);
  }

  displayText.textContent = answer;
  let answerArray = answer.toString().split("");
  displayArray = answerArray;
  disableOperatorButtons(false)
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

const handlePointButton = () => {
  if (!displayArray.includes(".")) {
    console.log(displayArray);
    displayText.textContent += ".";
    displayArray.push(".");
  } else if (displayArray.includes(".") && operatorClicked) {
    displayText.textContent += ".";
    operatorClicked = false;
  }
};

//--------------------------------NORMAL FUNCTIONS--------------------------------

const disableOperatorButtons = (toggleDisable) => {
  operatorNameElement.forEach((element) => {
    element.disabled = toggleDisable;
  });
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

pointButton.addEventListener("click", handlePointButton);
