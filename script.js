const numbers = Array.from(document.querySelectorAll(".number"));
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
var displayArray = []; //needed for pointBUtton function
var operatorClicked = false; //variable to check if there are operator in the experesion for decimal

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

const handleNumberClick = (e) => {
  if (displayText.textContent === "0") {
    displayText.textContent = "";
  }
  updateDisplayArray(displayArray, e.target.textContent, "push");
};

const handleClear = () => {
  displayText.textContent = "0";
  displayArray = [];
  disableOperators(operatorNameElement, false);
  disableOperators(numbers, false);
};

const handleclearLastButton = () => {
  let str = displayText.textContent;
  str = str.slice(0, -1);
  updateDisplayArray(displayArray, str, "pop");

  if (!displayArray.includes(getOperatorSign())) {
    disableOperators(operatorNameElement, false);
    operatorClicked = false;
  }
};

//CHANGES funcName to the name of operator (if pressed + , funcName = "add")
const getOperatorName = (e) => {
  displayText.textContent += e.target.textContent;
  operatorClicked = true;
  disableOperators(operatorNameElement, true);
  funcName = e.target.value;
};

const handleEqual = () => {
  let content = getOperatorSign(); //content = splitted array according to its operator
  num1 = Number(content[0]);
  num2 = Number(content[1]);

  let func = new Function("return " + funcName)();
  answer = operate(func, num1, num2);
  if (!(answer % 1 === 0)) {
    // if answer is in demical places make the decimal place 2 only
    answer = answer.toFixed(2);
  }

  displayText.textContent = answer;
  let answerArray = answer.toString().split("");
  displayArray = answerArray;

  disableOperators(operatorNameElement, false);
  operatorClicked = false;
};

// TAKES funcName AND SPLITS displayContent ACCORDING TO THE OPERATOR BUTTON CLICKED
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

    case "percentage":
      return displayText.textContent.split("%");
  }
};

const handlePointButton = () => {
  if (
    !displayArray.includes(".") ||
    (displayArray.includes(".") && operatorClicked)
  ) {
    updateDisplayArray(displayArray, ".", "push");
    operatorClicked = false;
  }
};

//--------------------------------NORMAL FUNCTIONS--------------------------------

// updates main array and display of calculator
const updateDisplayArray = (arr, el, method) => {
  if (method == "pop") {
    arr.pop();
    displayText.textContent = el;
  } else if (method == "push") {
    arr.push(el);
    displayText.textContent += arr[arr.length - 1];
  }
  console.log(arr.length);
  if (arr.length > 10) {
    disableOperators(numbers, true);
  }
  if (arr.length < 10) {
    disableOperators(numbers, false);
  }
};

const disableOperators = (el, toggleDisable) => {
  el.forEach((element) => {
    element.disabled = toggleDisable;
  });
};

// --------------------------ADD EVENT LISTENERS--------------------------------

numbers.forEach((button) => {
  button.addEventListener("click", handleNumberClick);
});

clearButton.addEventListener("click", handleClear);
clearLastButton.addEventListener("click", handleclearLastButton);
equalButton.addEventListener("click", handleEqual);

const operator = operatorNameElement.forEach((operator) => {
  operator.addEventListener("click", getOperatorName);
});

pointButton.addEventListener("click", handlePointButton);
