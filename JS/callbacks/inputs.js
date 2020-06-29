// changes spd mode on check
function toggleMode() {
    spdMode = this.checked();
}

// toggles the timer
function toggleTimer() {
    timer.mode = this.checked();
    drawTimer();
}

// draws dom timer
function drawTimer() {
    if (timer.mode) {

        timerLabel.style('opacity', '1')

        if (timer.inspecting) {
            timerLabel.html(timer.inspectCounter);
        } else if (timer.timing || timer.solveFinished) {
            timerLabel.html(displayTime(timer.time));
        } else {
            timerLabel.html('Press shift to time.');
        }

    } else {
        timerLabel.style('opacity', '0')
    }
}

function updateTimer() {
    if (timer.inspecting) {
        if (timer.inspectCounter <= 0) {
            startTiming();
        } else {
            timer.inspectCounter--;
        }
    } else {
        if (!solved(cube)) {
            timer.time += 0.01;
        } else {
            timer.solveFinished = true;
        }
    }
}

function startTimedSolve() {
    inspect();
    waitFor(() => timer.timing, stopwatch);
}

function inspect() {
    timer.inspecting = true;
    generateScramble();
    autoAnimating = true;
    waitFor(() => !autoAnimating, countdownInspection);
}

function countdownInspection() {
    setInterval(function () {
        updateTimer();
        drawTimer();
    }, 1000);
}

function stopwatch() {
    setInterval(function () {
        drawTimer();
        updateTimer();
    }, 10);
}

function startTiming() {
    timer.inspecting = false;
    timer.timing = true;
}