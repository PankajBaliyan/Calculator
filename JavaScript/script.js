//declare variables
const backSpaceImage = document.querySelector("#backSpacePNG");
const outputResult = document.querySelector("#outputResult");

let result = document.getElementById("result"); //last result data show here
let resultStatus = 0;

//To change backSpace button on calculator START
backSpaceImage.addEventListener("mouseenter", toggleImageSource);
backSpaceImage.addEventListener("mouseleave", toggleImageSource);

function toggleImageSource() {
    let currentSrc = backSpaceImage.src;
    let backspace = currentSrc.includes("backspace.png");
    let backspaceWhite = currentSrc.includes("backspaceWhite.png");

    if (backspace) {
        let newSrc = currentSrc.replace("backspace.png", "backspaceWhite.png");
        backSpaceImage.src = newSrc;
    } else if (backspaceWhite) {
        let newSrc = currentSrc.replace("backspaceWhite.png", "backspace.png");
        backSpaceImage.src = newSrc;
    }
}

// function to set data in getKeys function
function getKeys(inputNumber) {

    if (resultStatus === 1) {
        outputResult.value = 0;
    }

    const currentData = outputResult.value.toString();

    if(inputNumber === "."){
        const lastDigit = currentData.charAt(currentData.length - 1);
        if(lastDigit === "."){
            outputResult.value = currentData.slice(0, -1);
        }
    }

    if (["+", "-", "*", "/", "%"].includes(inputNumber)) {
        const lastDigit = currentData.charAt(currentData.length - 1);

        if (["+", "-", "*", "/", "%"].includes(lastDigit)) {
            outputResult.value = currentData.slice(0, -1);
        }
    }

    enterNumber(inputNumber, outputResult.value);
}

// function that manage data inside inputBox of calculator & based on key pressed & input key
function enterNumber(inputNumber, currentData) {
    let previousData = outputResult.value;

    //current data & previous data is same
    if (!currentData) {
        // will run if input box doesn't contain anything then assign it to value firstly.
        currentData = previousData.toString();
    }

    let backKey = 0;
    if (inputNumber === "backSpace") {
        inputNumber = "";
        backKey = 1;
    }
    let finalData = currentData + inputNumber;
    let lastDigit = currentData.charAt(currentData.length - 1);
    if (previousData == 0) {
        //if there is previously nothing in input box this will run
        if (inputNumber == "backSpace" || inputNumber == "=" || inputNumber == "clear" || inputNumber == "*" || inputNumber == "/") {
            outputResult.value = 0;
        } else {
            outputResult.value = inputNumber;
        }
        resultStatus = 0;
    } else if (inputNumber === "clear") {
        // to clear the input value
        outputResult.value = 0;
        resultStatus = 0;
    } else if (backKey) {
        // if backSpace is pressed
        outputResult.value = finalData.slice(0, -1);
        if (!outputResult.value || outputResult.value === "backSpace") {
            outputResult.value = 0;
        }
    } else if (inputNumber === "=" && inputNumber !== lastDigit) {
        // to make calculations
        calculation(finalData);
    } else if ((/[+\-*/%.]/).test(inputNumber) && inputNumber !== lastDigit) {
        // run on any arithmetic key pressed
        outputResult.value = finalData;
    } else {
        // if input box previously having any value, this will run
        resultStatus = 0;
        outputResult.value = finalData;
    }
}

// function to make calculations and display result
function calculation(inputData) {
    let currentData = outputResult.value.toString();
    let str = inputData.slice(0, -1); //remove last digit(=) from outputResult.value
    let setData; // variable to store calculation result, used below

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
        setData = Function('"use strict";return (' + str + ')')();
        setData = parseFloat(setData.toFixed(2));

        outputResult.value = setData;
        result.value = setData;
    }
    resultStatus = 1;
}

// return number according to keypress
const checkPressedKey = {
    96: [0],
    48: [0],

    97: [1],
    49: [1],

    98: [2],
    50: [2],

    99: [3],
    51: [3],

    100: [4],
    52: [4],

    102: [6],
    54: [6],

    103: [7],
    55: [7],

    105: [9],
    57: [9],

    107: ["+"],

    109: ["-"],
    189: ["-"],

    106: ["*"],

    111: ["/"],
    191: ["/"],

    110: ["."],
    190: ["."],

    13: ["="],

    8: ["backSpace"],

    // also used for delete
    12: ["clear"]
};

document.addEventListener("keydown", function (e) {
    // console.log("key", e.key)
    // console.log("keyCode", e.keyCode)
    if(event.keyCode != 106 && event.keyCode != 107 && event.keyCode != 109){

        if (event.key === "+" || event.key === "=") {
            if (event.shiftKey) {
                getKeys("+");
            } else {
                getKeys("=");
            }
        }
        if (event.key === "*" || event.key === "8") {
            if (event.shiftKey) {
                getKeys("*");
            } else {
                getKeys("8");
            }
        }
        if (event.key === "%" || event.key === "5") {
            if (event.shiftKey) {
                getKeys("%");
            } else {
                getKeys("5");
            }
        }
    }


        const keyArgs = checkPressedKey[e.keyCode]; // it will get key combinations & make a object
        if (keyArgs) {
            getKeys(...keyArgs);
        }
    }
);