// auto sequencing variables
let autoSequence = [new Move(true, 'x', [rangeStart], 1, 0), new Move(true, 'y', [rangeStart], 1, 0)];
let history = [];
let autoAnimating = false;


function randomAxis() {
  return random(['x', 'y', 'z']);
}

function randomDirection() {
  return random([-1, 1]);
}

function generateLayer() {
  return [random(removeZero(allNumsBetween(rangeStart, rangeEnd)))];
}

// generates random scramble
function generateScramble() {
  if (!autoAnimating) {
    scramble = [];
    // move count is scaled to the cube order
    for (let i = 0; i <= (17 * order - 20); i++) {
      scramble.push(new Move(true,
        randomAxis(),
        generateLayer(),
        randomDirection(),
        0));
    }

    autoSequence = cancel(scramble);
  }
}

// starts the auto sequence
function startScramble() {
  if (!timerMode) {
    generateScramble();
    autoAnimating = true;
  }
}

// reverses history and cancels moves
function generateSolution() {
  if (!autoAnimating && !solved(cube) && !timerMode) {
    let unCancelled = history.map(m => new Move(true, m.axis, m.layers, m.dir * -1, 0)).reverse();

    autoSequence = cancel(unCancelled);
  }
}

function cancel(moves) {
  target = moves.splice(0, 1);

  for (move of moves) {
    if (move.inverse(last(target))) {
      target.pop();
    } else {
      target.push(move);
    }
  }

  for (let i = target.length - 1; i >= 0; i--) {
    if (target[i].equal(target[i - 1]) && target[i - 1].equal(target[i - 2])) {
      target[i].dir *= -1;
      target.splice(i - 2, 2);
    }
  }

  return target;
}

// starts auto sequence
function startSolution() {
  if (!solved() && !timerMode) {
    generateSolution();
    autoAnimating = true;
  }
}