class Timer {
    constructor() {
        // blank timer
        this.inspectCounter = 15;
        this.inspecting = false;

        // assigned later
        this.inspectionInterval = undefined;

        this.time = 0;
        this.timing = false;

        // assigned later
        this.timeInterval = undefined;

        this.finished = false;
    }

    drawTimer() {
        // draws the timer data onto interface
        if (timerMode) {
            timerLabel.style('opacity', '1')
            if (autoAnimating) {
                timerLabel.html('Scrambling...');
            } else if (this.inspecting) {
                timerLabel.html(this.inspectCounter);
            } else if (this.timing) {
                timerLabel.html(displayTime(this.time));
            } else if (this.finished) {
                timerLabel.html(displayTime(this.time) + ' - Press shift to time again.');
            } else {
                timerLabel.html('Press shift to time.');
            }
        } else {
            timerLabel.style('opacity', '0');
        }
    }

    // increments correct counter
    updateTimer() {
        if (timerMode) {
            if (this.inspecting) {
                if (this.inspectCounter <= 0) {
                    this.endInspection();
                } else {
                    this.inspectCounter--;
                }
            } else {
                if (solved(cube)) {
                    // displays final state
                    this.timing = false;
                    clearInterval(this.timeInterval);
                    this.finished = true;
                    this.drawTimer();
                } else {
                    this.time += 0.1;
                }
            }
        }
    }

    timeSolve() {
        // performs timing in correct order
        this.drawTimer();
        waitFor(() => autoAnimating == false, this.countdownInspection.bind(this));
        waitFor(() => this.timing, this.stopwatch.bind(this));
    }

    endInspection() {
        // goes from inspection to timing
        this.inspecting = false;
        clearInterval(this.inspectionInterval);
        this.timing = true;
    }

    countdownInspection() {
        // creates the interval that counts down
        this.inspecting = true;
        this.drawTimer();
        this.inspectionInterval = setInterval(this.refreshTime.bind(this), 1000);
    }

    stopwatch() {
        // creates the interval to time to solve
        this.drawTimer();
        this.timeInterval = setInterval(this.refreshTime.bind(this), 100);
    }

    refreshTime() {
        this.updateTimer();
        this.drawTimer();
    }
}