const sessionVal = document.querySelector("#sessionVal");
const breakVal = document.querySelector("#breakVal");
const currentValText = document.querySelector("#currentValText");
const currentVal = document.querySelector("#currentVal");
const playMaterialIcon = document.querySelector("#playMI");
let currentSessionTimeLeft = 0;
let countDownStatus;
let isTimerStarted = false;

function GetTwoDigitInt(num) {
    if (num < 10)
        return "0" + num;

    return num;
}

function SecToHrMinSec(sec) {
    // Time calculations for hours, minutes and seconds    
    let hours = Math.floor(sec / (60 * 60));
    let minutes = Math.floor((sec % (60 * 60)) / 60);
    let seconds = Math.floor(sec % 60);

    let timeStr = "";

    if (hours > 0)
        timeStr = GetTwoDigitInt(hours) + " : ";

    timeStr += GetTwoDigitInt(minutes) + " : " + GetTwoDigitInt(seconds);

    return timeStr;
}

function countdown() {
    if (currentSessionTimeLeft <= 0) {
        if (currentValText.textContent === "Work") {
            currentValText.textContent = "Break";
            currentSessionTimeLeft = parseInt(breakVal.textContent) * 60;
        }
        else {
            currentValText.textContent = "Work";
            currentSessionTimeLeft = parseInt(sessionVal.textContent) * 60;
        }
    }

    currentVal.textContent = SecToHrMinSec(currentSessionTimeLeft--);
}

function Reset() {
    sessionVal.textContent = "25";
    breakVal.textContent = "5";  
    UpdatePanel();  
}

function UpdatePanel() {
    if (isTimerStarted) {
        isTimerStarted = false;
        clearInterval(countDownStatus);
    }

    currentValText.textContent = "Work";
    playMaterialIcon.innerText = "play_arrow";
    currentSessionTimeLeft = parseInt(sessionVal.textContent) * 60;
    currentVal.textContent = SecToHrMinSec(currentSessionTimeLeft);    
}

function ButtonClick(event) {
    let currentElement = event.currentTarget;
    switch (currentElement.id) {
        case "sessionDec":
            {
                let val = parseInt(sessionVal.textContent);
                if (val > 1) {
                    sessionVal.textContent = --val;
                    if (!isTimerStarted) {
                        currentSessionTimeLeft = val * 60;
                        currentVal.textContent = SecToHrMinSec(currentSessionTimeLeft);
                    }
                }
            }
            break;
        case "sessionInc":
            {
                let val = parseInt(sessionVal.textContent);
                if (val < Number.MAX_SAFE_INTEGER) {
                    sessionVal.textContent = ++val;
                    if (!isTimerStarted) {
                        currentSessionTimeLeft = val * 60;
                        currentVal.textContent = SecToHrMinSec(currentSessionTimeLeft);
                    }
                }
            }
            break;
        case "breakDec":
            {
                let val = parseInt(breakVal.textContent);
                if (val > 1)
                    breakVal.textContent = --val;
            }
            break;
        case "breakInc":
            {
                let val = parseInt(breakVal.textContent);
                if (val < Number.MAX_SAFE_INTEGER)
                    breakVal.textContent = ++val;
            }
            break;
        case "play":
            {
                isTimerStarted = true;
                if (playMaterialIcon.innerText === "play_arrow") {
                    playMaterialIcon.innerText = "pause";
                    countDownStatus = setInterval(countdown, 1000);
                }
                else {
                    playMaterialIcon.innerText = "play_arrow";
                    clearInterval(countDownStatus);
                }
            }
            break;
        case "stop":
            {
                UpdatePanel();
            }
            break;
        case "reset":
            {
                Reset();
            }
            break;
    }
}

function OnPageLoad() {
    Reset();
    let buttons = Array.from(document.getElementsByTagName("button"));
    buttons.forEach(button => {
        button.addEventListener("click", ButtonClick);
    });
}