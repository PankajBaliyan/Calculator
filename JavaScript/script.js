//declare variables
let startonTooltip = document.getElementById("startonTooltip"); // on btn tooltip txt
let startButton = document.getElementById("starton"); //on btn txt
let outputResult = document.getElementById("outputResult"); //result data show here
let result = document.getElementById("result"); //last result data show here
let resultStatus = 0;
let calculatorStatus = 0;

//function to on / off calculator
function startCalc() {
  if (startButton.innerHTML == "ON") {
    startButton.innerHTML = "OFF"; //change btn txt
    startonTooltip.innerHTML = "Off"; //change btn tooltip
    outputResult.value = 0; //set value in result
    notificationHere("Now Calculator is ON", "success");
    calculatorStatus = 1;
  } else {
    startButton.innerHTML = "ON"; //change btn txt
    startonTooltip.innerHTML = "On"; //change btn tooltip
    outputResult.value = ""; //remove value in result
    notificationHere("Now Calculator is OFF", "danger");
    calculatorStatus = 0;
  }
}

// for disable click behavior on input field before the calculator is on
outputResult.addEventListener("click", function() {
  if (calculatorStatus == 1) {
    outputResult.focus();
  } else {
    outputResult.blur();
    notificationHere("Turn On your Calc", "red", "question");
  }
});

// set custom input for input field
var onlyNumberKey = function(ev) {
  var key;
  var isShift;
  if (window.event) {
    key = window.event.keyCode;
    isShift = !!window.event.shiftKey; // typecast to boolean
  } else {
    key = ev.which;
    isShift = !!ev.shiftKey;
  }
  if (isShift) {
    switch (key) {
      case 43:
        return true;
        break;
      case 42:
        return true;
        break;
      case 37:
        return true;
        break;
      default:
        return false;
        break;
    }
  } else if (key == 45 || key == 46 || key == 47 || key >= 48 && key <= 57) {
    return true;
  } else {
    return false;
  }
};
// end here

function notification(
  msgHere,
  notificationStatus,
  notificationIcon,
  inputNumber
) {
  if (startButton.innerHTML == "ON") {
    notificationHere("Turn On your Calc", "red", "question");
  } else {
    notificationHere(msgHere, notificationStatus, notificationIcon);
    if (resultStatus == 1) {
      outputResult.value = 0;
    }
    enterNumber(inputNumber);
  }
}

// toast Notification here
function notificationHere(msgHere, notificationStatus, notificationIcon) {
  let message = SnackBar({
    message: msgHere,
    speed: "0.2s",
    status: notificationStatus,
    icon: notificationIcon,
  });
}

// entering digits in inputBox here
function enterNumber(inputNumber) {
  let previousData = outputResult.value;
  let currentData = previousData.toString();
  let addData = inputNumber.toString();
  let finalData = currentData.concat(addData);

  if (previousData == 0) {
    if (inputNumber == "backSpace") {
      outputResult.value = 0;
    } else if (inputNumber == "clear") {
      outputResult.value = 0;
    } else {
      outputResult.value = inputNumber;
    }
    resultStatus = 0;
  } else if (inputNumber == "clear") {
    // used to clear the screen
    outputResult.value = 0;
    resultStatus = 0;
  } else if (inputNumber == "backSpace") {
    let str = finalData.slice(0, -10);
    outputResult.value = str;
    if (
      outputResult.value == "" ||
      outputResult.value == " " ||
      outputResult.value == "backSpace"
    ) {
      outputResult.value = 0;
    }
  } else if (inputNumber == "=") {
    calculation(finalData);
  } else {
    resultStatus = 0;
    outputResult.value = finalData;
  }
}

//make calculation function
function calculation(inputData) {
  let str = inputData.slice(0, -1); //remove last digit(=) from outputResult.value
  let setData = eval(str); //perform javascript operations on string values
  outputResult.value = setData;
  result.value = setData;
  resultStatus = 1;
}
