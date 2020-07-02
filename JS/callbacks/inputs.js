// changes spd mode on check
function toggleMode() {
    spdMode = this.checked();
}

// toggles the timer
function toggleTimer() {
    timerMode = this.checked();
    currentTimer = new Timer;
    currentTimer.drawTimer();
}