//declare variables
let startonTooltip = document.getElementById("startonTooltip"); // on btn tooltip txt
let startButton = document.getElementById("starton"); //on btn txt
let outputResult = document.getElementById("outputResult"); //result data show here
let result = document.getElementById("result"); //last result data show here
let backSpacePNG = document.getElementById("backSpacePNG"); //backspace img
let resultStatus = 0;
let calculatorStatus = 0;
let notificationPosition;


window.onload = () => {
    notificationHere("Welcome to Calculator", "success", "check");
}

// function to change backspace image on mouseenter
function changeImage() {
    backSpacePNG.src = "images/backspaceWhite.png";
}

// function to change backspace image on mouseleave
function revertImage() {
    backSpacePNG.src = "images/backspace.png";
}

//function to on / off calculator
function startCalc() {
    if (startButton.innerHTML == "ON") {
        startButton.innerHTML = "OFF";
        startonTooltip.innerHTML = "Off";
        outputResult.value = 0; //set value in result
        notificationHere("Now Calculator is ON", "success");
        calculatorStatus = 1;
    } else {
        startButton.innerHTML = "ON";
        startonTooltip.innerHTML = "On";
        outputResult.value = ""; //remove value in result
        notificationHere("Now Calculator is OFF", "danger");
        calculatorStatus = 0;
    }
}

// get notification according to keypress
onkeydown = function (e) {
    if (calculatorStatus == 1) {
        // Make Calculator perform operation on keypress
        switch (e.keyCode) {
            case 97:
                notification('One', 'None', '#', 1);
                break;
            case 98:
                notification('Two', 'None', '#', 2);
                break;
            case 99:
                notification('Three', 'None', '#', 3);
                break;
            case 100:
                notification('Four', 'None', '#', 4);
                break;
            case 101:
                notification('Five', 'None', '#', 5);
                break;
            case 102:
                notification('Six', 'None', '#', 6);
                break;
            case 103:
                notification('Seven', 'None', '#', 7);
                break;
            case 104:
                notification('Eight', 'None', '#', 8);
                break;
            case 105:
                notification('Nine', 'None', '#', 9);
                break;
            case 96:
                notification('Zero', 'None', '#', 0);
                break;
            case 107:
                notification('Plus', 'None', '#', '+');
                break;
            case 109:
                notification('Minus', 'None', '#', '-');
                break;
            case 106:
                notification('Multiply', 'None', '#', '*');
                break;
            case 111:
                notification('Divide', 'None', '#', '/');
                break;
            case 110:
                notification('Dot', 'None', '#', '.');
                break;
            case 189:
                notification('Minus', 'None', '#', '-');
                break;
            case 187:
                notification('=', 'warning', '#', '=')
                break;
            case 13:
                notification('=', 'warning', '#', '=')
                break;
            case 8:
                notification('Backspace', 'warning', 'B', 'backSpace')
                break;
            case 46:
                notification('Clear', 'info', 'X', 'clear')
                break;
            default:
                notificationHere("Invalid Key Pressed", "red", "question");
                break;
        }

        let isShift;
        if (window.event) {
            isShift = !!window.event.shiftKey; // typecast to boolean
        } else {
            isShift = !!ev.shiftKey;
        }
        if (isShift) {
            if (e.keyCode == 53) {
                notification('Percentage', 'None', '#', '%');
            } else if (e.keyCode == 56) {
                notification('Multiply', 'None', '#', '*');
            } else if (e.keyCode == 187) {
                notification('Plus', 'None', '#', '+');
            } else {
                notificationHere("Invalid Key Pressed", "red", "question");
            }
        }

    } else {
        notificationHere("Turn On your Calc", "red", "question");
    }
};

// function to set data in notification function
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

        let previousData = outputResult.value;
        let currentData = previousData.toString();
        if (inputNumber == "+" || inputNumber == "-" || inputNumber == "*" || inputNumber == "/" || inputNumber == "%") {
            let lastDigit = currentData.charAt(currentData.length - 1);
            if (lastDigit == "+" || lastDigit == "-" || lastDigit == "*" || lastDigit == "/" || lastDigit == "%") {
                currentData = currentData.slice(0, -1); // remove last digit if it is symbol, to resolve the conflict of multiple symbols
            }
        }
        enterNumber(inputNumber, currentData);
    }
}

// function to set notification position according to screen size
function notificationPos() {
    let windowInnerWidth = window.innerWidth;
    if (windowInnerWidth < 954) {
        notificationPosition = "tr";
    } else {
        notificationPosition = "br";
    }
}

// toast Notification here
function notificationHere(msgHere, notificationStatus, notificationIcon) {
    notificationPos()
    SnackBar({
        timeout: 1000, // ms
        position: notificationPosition,
        message: msgHere,
        speed: "0.2s",
        status: notificationStatus,
        icon: notificationIcon,
    });
}

// function that manage data inside inputBox
function enterNumber(inputNumber, currentData) {
    let previousData = outputResult.value;
    if (currentData == undefined || currentData == null || currentData == "") {
        currentData = previousData.toString();
    }
    let addData = inputNumber.toString();
    let finalData = currentData.concat(addData);

    if (previousData == 0) {
        if (inputNumber == "backSpace" || inputNumber == "=") {
            outputResult.value = 0;
        } else if (inputNumber == "clear") {
            outputResult.value = 0;
        } else {
            outputResult.value = inputNumber;
        }
        resultStatus = 0;
    } else if (inputNumber == "clear") {
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
        if (inputNumber != currentData.charAt(currentData.length - 1)) {
            calculation(finalData);
        }
    } else if (inputNumber == "+" || inputNumber == "-" || inputNumber == "*" || inputNumber == "/" || inputNumber == "%" || inputNumber == ".") {
        if (inputNumber != currentData.charAt(currentData.length - 1)) {
            outputResult.value = finalData;
        }
    } else {
        resultStatus = 0;
        outputResult.value = finalData;
    }
}

//make calculation function
function calculation(inputData) {
    let currentData = outputResult.value.toString();
    let str = inputData.slice(0, -1); //remove last digit(=) from outputResult.value

    // checking for last digit is symbol or not, until all symbols are not removed this loop will run
    let checkingSymbolAtLast = str.charAt(str.length - 1);
    while (checkingSymbolAtLast == '+' || checkingSymbolAtLast == '-' || checkingSymbolAtLast == '*' || checkingSymbolAtLast == '/' || checkingSymbolAtLast == '%' || checkingSymbolAtLast == '.') {
        str = str.slice(0, -1)
        checkingSymbolAtLast = str.charAt(str.length - 1);
    }
    // if there is only symbol in input field then this condition will run
    if (currentData == '+' || currentData == '-' || currentData == '*' || currentData == '/' || currentData == '%' || currentData == '.') {
        outputResult.value = 0;
    } else {
        let setData = eval(str); //perform javascript operations on string values

        //remove the digits from . after two digits
        let text = setData.toString();
        if (text.indexOf(".")) {

            let indexOfDot = text.indexOf("."); // indexOf of first . decimal digit
            let totalDigitAfterDot = text.length - indexOfDot - 1; // calculate total digits after decimal
            let checkValueIndex = indexOfDot + 3; // check indexing for remove further digits
            if (totalDigitAfterDot > 3) {
                if (text[checkValueIndex] > 5) {
                    // remove the digits by looping & loops run from 4th index
                    for (let i = 4; i < text.length; i++) {
                        if (text[i] < 5) {
                            setData = text.slice(0, indexOfDot + i - 1)
                            break;
                        }
                    }
                } else {
                    // removing the digits if 3rd digit after decimal is less than 5
                    setData = text.slice(0, -Math.abs(totalDigitAfterDot - 2));
                }
            }
        }

        outputResult.value = setData;
        result.value = setData;
    }
    resultStatus = 1;
}