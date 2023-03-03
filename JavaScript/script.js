//declare variables
const changeImageButton = document.querySelector("#change-image");
const backSpaceImage = document.querySelector("#backSpacePNG");
const startCalcButton = document.querySelector("#start-calc");
const startButton = document.querySelector("#starton");
const startonTooltip = document.querySelector("#startonTooltip");
const outputResult = document.querySelector("#outputResult");

let result = document.getElementById("result"); //last result data show here
let resultStatus = 0;
let calculatorStatus = 0;
let notificationPosition;

// function to show notification on file loads
window.onload = () => {
    showNotification("Welcome to Calculator", "success", "check");
};

//To change backSpace button on calculator START
changeImageButton.addEventListener("mouseenter", onMouseEnter);
changeImageButton.addEventListener("mouseleave", onMouseLeave);
function onMouseEnter() {
    backSpaceImage.src = `images/backspaceWhite.png`;
}

function onMouseLeave() {
    backSpaceImage.src = `images/backspace.png`;
}

// Function to start/stop calculator
startCalcButton.addEventListener("click", startCalc);
document.addEventListener("keydown", (event) => {
    if (event.keyCode === 79) {
        startCalc();
    }
});


function startCalc() {
    const isOn = startButton.innerHTML === "ON";
    startButton.innerHTML = isOn ? "OFF" : "ON";
    startonTooltip.innerHTML = isOn ? "Off" : "On";
    outputResult.value = isOn ? 0 : "";
    showNotification(`Now Calculator is ${isOn ? "ON" : "OFF"}`, isOn ? "success" : "danger");
    calculatorStatus = isOn ? 1 : 0;
}

// function to set data in notification function
function notification(msgHere, notificationStatus, notificationIcon, inputNumber) {
    if (startButton.innerHTML === "ON") {
        showNotification("Turn On your Calc", "red", "question");
        return;
    }

    showNotification(msgHere, notificationStatus, notificationIcon);

    if (resultStatus === 1) {
        outputResult.value = 0;
    }

    const currentData = outputResult.value.toString();

    if (["+", "-", "*", "/", "%"].includes(inputNumber)) {
        const lastDigit = currentData.charAt(currentData.length - 1);

        if (["+", "-", "*", "/", "%"].includes(lastDigit)) {
            outputResult.value = currentData.slice(0, -1);
        }
    }

    enterNumber(inputNumber, outputResult.value);
}

// function to set notification position according to screen size
function setNotificationPosition() {
    const windowInnerWidth = window.innerWidth;
    notificationPosition = windowInnerWidth < 954 ? "tr" : "br";
}

// toast Notification here
function showNotification(msg, status, icon) {
    setNotificationPosition();
    SnackBar({
        timeout: 1000, // ms
        position: notificationPosition,
        message: msg,
        speed: "0.2s",
        status: status,
        icon: icon,
    });
}

// function that manage data inside inputBox of calculator & based on key pressed & input key
function enterNumber(inputNumber, currentData) {
    let previousData = outputResult.value;
    if (!currentData) {
        currentData = previousData.toString();
    }
    let finalData = currentData + inputNumber;
    let lastDigit = currentData.charAt(currentData.length - 1);
    if (previousData == 0) {
        if (inputNumber == "backSpace" || inputNumber == "=" || inputNumber == "clear") {
            outputResult.value = 0;
        } else {
            outputResult.value = inputNumber;
        }
        resultStatus = 0;
    } else if (inputNumber === "clear") {
        outputResult.value = 0;
        resultStatus = 0;
    } else if (inputNumber === "backSpace") {
        outputResult.value = finalData.slice(0, -1);
        if (!outputResult.value || outputResult.value === "backSpace") {
            outputResult.value = 0;
        }
    } else if (inputNumber === "=" && inputNumber !== lastDigit) {
        calculation(finalData);
    } else if ((/[+\-*/%.]/).test(inputNumber) && inputNumber !== lastDigit) {
        outputResult.value = finalData;
    } else {
        resultStatus = 0;
        outputResult.value = finalData;
    }
}

// function to make calculations and display result
function calculation(inputData) {
    let currentData = outputResult.value.toString();
    let str = inputData.slice(0, -1); //remove last digit(=) from outputResult.value

    // remove any trailing operators
    switch (str.charAt(str.length - 1)) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '%':
        case '.':
            str = str.slice(0, -1);
            break;
    }

    // if there is only operator in input field then set output to 0
    if (/^[\+\-\*\/\%\.]$/.test(currentData)) {
        outputResult.value = 0;
    } else {
        // evaluate the expression
        let setData = Function('"use strict";return (' + str + ')')();
        setData = parseFloat(setData.toFixed(2));

        outputResult.value = setData;
        result.value = setData;
    }
    resultStatus = 1;
}

// get notification according to keypress
const keyToNotification = {
    // 96: ["Zero", "None", "#", 0],
    48: ["Zero", "None", "#", 0],
    // 97: ["One", "None", "#", 1],
    49: ["One", "None", "#", 1],
    // 98: ["Two", "None", "#", 2],
    50: ["Two", "None", "#", 2],
    // 99: ["Three", "None", "#", 3],
    51: ["Three", "None", "#", 3],
    // 100: ["Four", "None", "#", 4],
    52: ["Four", "None", "#", 4],
    // 101: ["Five", "None", "#", 5],
    53: ["Five", "None", "#", 5],
    // 102: ["Six", "None", "#", 6],
    54: ["Six", "None", "#", 6],
    // 103: ["Seven", "None", "#", 7],
    55: ["Seven", "None", "#", 7],
    // 104: ["Eight", "None", "#", 8],
    56: ["Eight", "None", "#", 8],
    // 105: ["Nine", "None", "#", 9],
    57: ["Nine", "None", "#", 9],

    // 107: ["Plus", "None", "#", "+"],
    // 109: ["Minus", "None", "#", "-"],
    // 189: ["Minus", "None", "#", "-"],
    // 106: ["Multiply", "None", "#", "*"],
    // 111: ["Divide", "None", "#", "/"],

    // 110: ["Dot", "None", "#", "."],
    190: ["Dot", "None", "#", "."],

    187: ["=", "warning", "#", "="],
    // 13: ["=", "warning", "#", "="],

    8: ["Backspace", "warning", "B", "backSpace"],

    // also used for delete
    // 46: ["Clear", "info", "X", "clear"]
};

document.addEventListener("keydown", function (e) {
    console.log("key", e.key)
    console.log("keyCode", e.keyCode)
    if (calculatorStatus == 1) {
        const notificationArgs = keyToNotification[e.keyCode];
        if (notificationArgs) {
            notification(...notificationArgs);
        } else {
            let isShift;
            if (window.event) {
                isShift = !!window.event.shiftKey; // typecast to boolean
            } else {
                isShift = !!ev.shiftKey;
            }
            if (isShift) {
                switch (e.keyCode) {
                    case 187:
                        notification("Plus", "None", "#", "+");
                        break;
                    case 56:
                        notification("Multiply", "None", "#", "*");
                        break;
                    case 53:
                        notification("Percentage", "None", "#", "%");
                        break;
                    default:
                        showNotification("Invalid Key Pressed", "red", "question");
                        break;
                }
            } else {
                showNotification("Invalid Key Pressed", "red", "question");
            }
        }
    } else {
        showNotification("Turn On your Calc", "red", "question");
    }
});
