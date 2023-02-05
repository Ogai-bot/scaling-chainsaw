const [initialSeconds, initialMinutes, initialHours] = [0, 3, 0];
let [seconds, minutes, hours] = [initialSeconds, initialMinutes, initialHours];
let timerRef = document.getElementsByClassName("timer-display")[0];
let startOrResumeButton = document.getElementById('startTimer');
let interval = null;
setDisplayTimer();

startOrResumeButton.addEventListener('click', () => {
    if (interval !== null)
        clearInterval(interval);
    int = setInterval(displayTimer, 1000);
});

document.getElementById('pauseTimer').addEventListener('click', () => {
    clearInterval(interval);
    startOrResumeButton.innerText = "Continuar"
});

document.getElementById('resetTimer').addEventListener('click', () => {
    clearInterval(interval);
    [seconds, minutes, hours] = [initialSeconds, initialMinutes, initialHours];
    setDisplayTimer();
    startOrResumeButton.innerText = "Iniciar"
});

function displayTimer() {
    if (seconds === 0 && minutes === 0 && hours === 0) {
        clearInterval(interval);
        return;
    }
    if (seconds === 0) {
        seconds = 59;
        if (minutes > 0)
            minutes--;
        if (minutes === 0) {
            minutes = 59;
            if (hours > 0)
                hours--;
        }
    }
    seconds--;
    setDisplayTimer();
}

function setDisplayTimer() {
    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;
    timerRef.innerHTML = ` ${h} : ${m} : ${s}`;
}