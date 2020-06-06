// auto sequencing constants
let autoSequence = [new Move(true, 'x', [1], 1, 0), new Move(true, 'y', [1], 1, 0)];
let history = [];
let autoAnimating = false;

function arraysMatch(arr1, arr2) {

  // Check if the arrays are the same length
  if (arr1.length !== arr2.length) return false;

  // Check if all items exist and are in the same order
  for (var i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i])
      return false;
  }

  // Otherwise, return true
  return true;

};

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
  if (random(0, 2) < 1) {
    return dir = 1;
  } else {
    return dir = -1;
  }
}

// are these two moves invereses
function inverseMoves(m1, m2) {
  return (m1.axis == m2.axis && arraysMatch(m1.layers.sort(), m2.layers.sort()) && -1 * m1.dir == m2.dir);
}

// generates random scramble
function generateScramble() {
  if (!autoAnimating) {
    for (let i = 0; i <= 25; i++) {
      let lastMove = autoSequence[autoSequence.length - 1];
      let secondtoLastMove = autoSequence[autoSequence.length - 2];
      let a = randomAxis();
      let l = [floor(random(-1, 1))];
      let d = randomDirection();
      let newMove = new Move(true, a, l, d, 0);

      if (inverseMoves(lastMove, newMove)) {
        autoSequence.push(new Move(true, a, l, -1 * d, 0));
      } else if (equalMoves(secondtoLastMove, lastMove) && equalMoves(lastMove, newMove)) {
        // skip over new move
      } else {
        autoSequence.push(new Move(true, a, l, d, 0));
      }
    }
  }
}

// starts the auto sequence
function startScramble() {
  generateScramble();
  autoAnimating = true;
}

Array.prototype.last = function () {
  return this[this.length = 1];
}

// // reverses history and cancels moves
function generateSolution() {
  if (!autoAnimating && !solved(cube)) {
    let unCancelled = history.map(m => new Move(true, m.axis, m.layers, m.dir * -1, 0)).reverse();
    let acc = [unCancelled.shift()];
    let rest = unCancelled;

    function cancel(acc, rest) {
      for (move of rest) {
        if (inverseMoves(acc.last, move)) {
          acc.pop();
        } else {
          acc.push(move);
        }
      }
      return acc;
    }
    autoSequence = cancel(acc, rest);
  }
}

function equalMoves(m1, m2) {
  return (m1.axis == m2.axis && arraysMatch(m1.layers.sort(), m2.layers.sort()) && m1.dir == m2.dir);
}

// starts auto sequence
function startSolution() {
  if (!solved()) {
    generateSolution();
    autoAnimating = true;
  }
}