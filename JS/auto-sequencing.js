// auto sequencing constants
let autoSequence = [new Move(true, 'x', [1], 1, 0)];
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
      let a = randomAxis();
      let l = [floor(random(-1, 1))];
      let d = randomDirection();

      if (inverseMoves(lastMove, new Move(true, a, l, d, 0))) {
        autoSequence.push(new Move(true, a, l, -1 * d, 0));
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


// reverses history and cancels moves
function generateSolution() {
  if (!autoAnimating) {
    let unCancelled = history.map(m => new Move(true, m.axis, m.layers, m.dir * -1, 0)).reverse();

    let acc = [unCancelled[unCancelled.length - 1]];
    unCancelled.pop();

    for (let i = unCancelled.length - 1; i >= 0; i--) {
      if (inverseMoves(unCancelled[unCancelled.length - 1], acc[0])) {
        acc.shift();
      } else {
        acc.unshift(unCancelled[unCancelled.length - 1]);
      }
      unCancelled.pop();
    }

    autoSequence = acc;
  }
}

// starts auto sequence
function startSolution() {
  if (!solved()) {
    generateSolution();
    autoAnimating = true;
  }
}