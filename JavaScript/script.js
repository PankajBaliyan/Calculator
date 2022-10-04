//declare variables
let startonTooltip = document.getElementById("startonTooltip"); // on btn tooltip txt
let startButton = document.getElementById("starton"); //on btn txt
let outputResult = document.getElementById("outputResult"); //result data show here

//function to on / off calculator
function startCalc() {
  if (startButton.innerHTML == "ON") {
    startButton.innerHTML = "OFF"; //change btn txt
    startonTooltip.innerHTML = "Off"; //change btn tooltip
    outputResult.value = 0; //set value in result
    notificationHere('Now Calculator is ON','success');
} else {
    startButton.innerHTML = "ON"; //change btn txt
    startonTooltip.innerHTML = "On"; //change btn tooltip
    outputResult.value = ""; //remove value in result
    notificationHere('Now Calculator is OFF','danger');
  }
}

function notification(msgHere,notificationStatus,notificationIcon,inputNumber) {
    if (startButton.innerHTML == "ON") {
        notificationHere('Turn On your Calc','red','question');
    } else {
        notificationHere(msgHere,notificationStatus,notificationIcon);
        enterNumber(inputNumber)
    }
}

// toast Notification here
function notificationHere(msgHere,notificationStatus,notificationIcon) {
  var message = SnackBar({
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

    if(previousData == 0) {
        outputResult.value = inputNumber;
    } else if(inputNumber == 'clear') { // used to clear the screen
        document.getElementById("outputResult").value = 0;
    } else if(inputNumber == '=') {
        // console.log("equal dbb gya")
        calculation(finalData);
    } else {
        outputResult.value = finalData;
        // console.log("final data",finalData);
    }
}

//make calculation function
function calculation(inputData) {
    // let convertNumber = Number(inputData)
    // console.log(typeof(convertNumber))
    // console.log(convertNumber)
    // console.log(Number(inputData));
    console.log("type of inputData", typeof(inputData));
}


