// changes spd mode on check
function toggleMode() {
    spdMode = this.checked();
}

// toggles the timer
function toggleTimer() {
    timerMode = this.checked();

    if (timerMode) {
        currentTimer = new Timer;
    }

    currentTimer.drawTimer();
}