class Timer {
    constructor() {
        this.inspectCounter = 15;
        this.inspecting = false;
        this.inspectionInterval = undefined;
        this.time = 0;
        this.timing = false;
        this.finished = false;
    }

    drawTimer() {
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

    updateTimer() {
        if (timerMode) {
            if (this.inspecting) {
                if (this.inspectCounter <= 0) {
                    this.inspecting = false;
                    clearInterval(this.inspectionInterval);
                    this.timing = true;
                } else {
                    this.inspectCounter--;
                }
            } else {
                if (solved(cube)) {
                    this.timing = false;
                    clearInterval(this.timeInterval)
                    this.finished = true;
                } else {
                    this.time += 0.1;
                }
            }
        }
    }

    timeSolve() {
        this.drawTimer();
        waitFor(() => autoAnimating == false, this.countdownInspection.bind(this));
        waitFor(() => this.timing, this.stopwatch.bind(this));
    }

    countdownInspection() {
        this.inspecting = true;
        this.drawTimer();
        this.inspectionInterval = setInterval(this.refreshTime.bind(this), 1000);
    }

    stopwatch() {
        this.drawTimer();
        this.timeInterval = setInterval(this.refreshTime.bind(this), 100);
    }

    refreshTime() {
        this.updateTimer();
        this.drawTimer();
    }
}