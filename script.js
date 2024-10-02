  let seconds = 0;
  let minutes = 0;
  let hours = 0;
  let timerInterval;
  let isRunning = false;

  const displaySeconds = document.getElementById("seconds");
  const displayMinutes = document.getElementById("minutes");
  const displayHours = document.getElementById("hours");
  const startButton = document.getElementById("start");
  const pauseButton = document.getElementById("pause");
  const resetButton = document.getElementById("reset");

  function startTimer() {
    
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

    startButton.disabled = true;
    pauseButton.textContent = "Pause";
    isRunning = true;
  }

  function pauseTimer() {
    clearInterval(timerInterval);
    pauseButton.textContent = "Resume";
    startButton.disabled = false;
    isRunning = false;
  }

  function resetTimer() {
    clearInterval(timerInterval);
    seconds = 0;
    minutes = 0;
    hours = 0;
    updateDisplay();
    startButton.disabled = false;
    pauseButton.textContent = "Pause";
    isRunning = false;
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
  pauseButton.addEventListener("click", () => {
    if (isRunning) {
      pauseTimer();
    } else {
      startTimer();
    }
  });
  resetButton.addEventListener("click", resetTimer);
  