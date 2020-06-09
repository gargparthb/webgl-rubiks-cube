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

// generates random scramble
function generateScramble() {
  if (!autoAnimating) {
    for (let i = 0; i <= 25; i++) {
      let lastMove = autoSequence[autoSequence.length - 1];
      let secondtoLastMove = autoSequence[autoSequence.length - 2];
      let a = randomAxis();
      let l = generateLayer();
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

function generateLayer() {
  if (random() < 0.5) {
    return [-1];
  } else {
    return [1];
  }
}

// starts the auto sequence
function startScramble() {
  generateScramble();
  autoAnimating = true;
}

function last(a) {
  return a[a.length - 1];
}

// // reverses history and cancels moves
function generateSolution() {
  if (!autoAnimating && !solved(cube)) {
    let unCancelled = history.map(m => new Move(true, m.axis, m.layers, m.dir * -1, 0)).reverse();

    //let target = unCancelled.splice(0, 2);
    //console.log(target);

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
  if (!solved()) {
    generateSolution();
    autoAnimating = true;
  }
}