let seconds = 0;
let minutes = 0;
let hours = 0;
let timerInterval; 

const displaySeconds = document.getElementById("seconds");
const displayMinutes = document.getElementById("minutes");
const displayHours = document.getElementById("hours");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");

function startTimer() {
  // Clear any existing timer interval
  clearInterval(timerInterval);
  
  timerInterval = setInterval(() => {
    seconds++;

    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }

    if (minutes === 60) {
      minutes = 0;
      hours++;
    }

    updateDisplay();
  }, 1000); 
}

function pauseTimer() {
  clearInterval(timerInterval);
}

function resetTimer() {
  clearInterval(timerInterval);
  seconds = 0;
  minutes = 0;
  hours = 0;
  updateDisplay();
}

function updateDisplay() {
  displaySeconds.textContent = formatTime(seconds);
  displayMinutes.textContent = formatTime(minutes);
  displayHours.textContent = formatTime(hours);
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);