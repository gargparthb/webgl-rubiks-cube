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
        } else if (timer.timing) {
            timerLabel.html(displayTime(timer.time));
        } else if (timer.solveFinished) {
            timerLabel.html(displayTime(timer.time) + ' - Press shift to try again.')
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
            timer.solveFinished = true
            timer.timing = false;
        }
    }
}

function startTimedSolve() {
    startSolve();
    waitFor(() => timer.timing, stopwatch);
    waitFor(() => timer.solveFinished, () => drawTimer());
}

function startSolve() {
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

function clearTimer() {
    timer = {
        mode: timerChkBox.checked(),
        inspecting: false,
        inspectCounter: 15,
        timing: false,
        time: 0,
        solveFinished: false
    };
}