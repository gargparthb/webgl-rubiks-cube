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

function inverseMoves(m1, m2) {
  return (m1.axis == m2.axis && arraysMatch(m1.layers.sort(), m2.layers.sort()) && -1 * m1.dir == m2.dir);
}

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

function startScramble() {
  generateScramble();
  autoAnimating = true;
}


// TODO: fix after solved is working correctly
function generateSolution() {
  if (!autoAnimating) {
    let unCancelled = history.reverse().map(m => m.invert());

    let acc = [unCancelled[unCancelled.length - 1]];
    console.log(acc);
    let rest = unCancelled.splice(unCancelled.length - 1, 1);
    console.log(rest)

    for (i = rest.length - 1; i >= 0; i--) {
      if (inverseMoves(acc[acc.length - 1], rest[0])) {
        acc.splice(acc.length - 1, 1);
        rest.shift();
      } else {
        rest.shift();
        acc.concat(rest);
      }
    }
    return acc;
  }
}