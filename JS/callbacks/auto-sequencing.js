// auto sequencing constants
let autoSequence = [new Move(true, 'x', [rangeStart], 1, 0), new Move(true, 'y', [rangeStart], 1, 0)];
let history = [];
let autoAnimating = false;


function randomAxis() {
  switch (floor(random(0, 3))) {
    case 0:
      return 'x';
      break;
    case 1:
      return 'y';
      break;
    case 2:
      return 'z';
      break;
  }
}

function randomDirection() {
  return random([-1, 1]);
}

// generates random scramble
function generateScramble() {
  if (!autoAnimating) {
    scramble = [];
    // move count is scaled to the cube order
    for (let i = 0; i <= (17 * order - 20); i++) {
      let a = randomAxis();
      let l = generateLayer();
      let d = randomDirection();
      scramble.push(new Move(true, a, l, d, 0));
    }

    autoSequence = cancel(scramble);
  }
}

function generateLayer() {
  return [random(removeZero(allNumsBetween(rangeStart, rangeEnd)))];
}

// starts the auto sequence
function startScramble() {
  if (!timer.mode) {
    generateScramble();
    autoAnimating = true;
  }
}

// reverses history and cancels moves
function generateSolution() {
  if (!autoAnimating && !solved(cube) && !timer.mode) {
    let unCancelled = history.map(m => new Move(true, m.axis, m.layers, m.dir * -1, 0)).reverse();

    autoSequence = cancel(unCancelled);
  }
}

function cancel(moves) {
  target = moves.splice(0, 1);

  for (move of moves) {
    if (inverseMoves(last(target), move)) {
      target.pop();
    } else {
      target.push(move);
    }
  }

  for (let i = target.length - 1; i >= 0; i--) {
    if (equalMoves(target[i - 2], target[i - 1]) && equalMoves(target[i - 1], target[i])) {
      target[i].dir *= -1;
      target.splice(i - 2, 2);
    }
  }

  return target;
}

function equalMoves(m1, m2) {
  if (m1 != undefined && m2 != undefined) {
    return (m1.axis == m2.axis && arraysMatch(m1.layers.sort(), m2.layers.sort()) && m1.dir == m2.dir);
  } else {
    return false;
  }
}

// are these two moves invereses
function inverseMoves(m1, m2) {
  if (m1 != undefined && m2 != undefined) {
    return (m1.axis == m2.axis && arraysMatch(m1.layers.sort(), m2.layers.sort()) && -1 * m1.dir == m2.dir);
  }
}

// starts auto sequence
function startSolution() {
  if (!solved() && !timer.mode) {
    generateSolution();
    autoAnimating = true;
  }
}