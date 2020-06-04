// initializes the array
let cube = [];
let colorDict;

// setting dimensions
let dims = 3;
let rangeStart, rangeEnd;

// initializing move object
let currentMove;

// getting HTML elements
let R, Ri, L, Li, U, Ui, D, Di, F, Fi, B, Bi, X, Xi, Y, Yi, Z, Zi;
let scrambler, solver;

let canvas;

function setup() {
  canvas = createCanvas(600, 600, WEBGL);
  canvas.parent('window-wrapper')

  // initial color order
  colorDict = [
    color(255, 255, 255), color(255, 255, 50), color(0, 255, 0), color(0, 0, 255), color(255, 160, 0), color(255, 0, 0)
  ];

  rangeStart = 1 - ceil(dims / 2);
  rangeEnd = dims - ceil(dims / 2);

  // creates the cube array
  // in the n x n x n cube, n is flexible this way
  let idx = 0;
  for (var x = rangeStart; x <= rangeEnd; x++) {
    for (var y = rangeStart; y <= rangeEnd; y++) {
      for (var z = rangeStart; z <= rangeEnd; z++) {
        cube.push(new Cubie(x, y, z, colorDict, idx, false));
        idx++;
      }
    }
  }

  R = select('#r').mousePressed(() => playMove(rMove));
  Ri = select('#ri').mousePressed(() => playMove(riMove));
  L = select('#l').mousePressed(() => playMove(lMove));
  Li = select('#li').mousePressed(() => playMove(liMove));
  X = select('#x').mousePressed(() => playMove(xMove));
  Xi = select('#xi').mousePressed(() => playMove(xiMove));
  U = select('#u').mousePressed(() => playMove(uMove));
  Ui = select('#ui').mousePressed(() => playMove(uiMove));
  D = select('#d').mousePressed(() => playMove(dMove));
  Di = select('#di').mousePressed(() => playMove(diMove));
  Y = select('#y').mousePressed(() => playMove(yMove));
  Yi = select('#yi').mousePressed(() => playMove(yiMove));
  F = select('#f').mousePressed(() => playMove(fMove));
  Fi = select('#fi').mousePressed(() => playMove(fiMove));
  B = select('#b').mousePressed(() => playMove(bMove));
  Bi = select('#bi').mousePressed(() => playMove(biMove));
  Z = select('#z').mousePressed(() => playMove(zMove));
  Zi = select('#zi').mousePressed(() => playMove(ziMove));
  scrambler = select('#scrambler').mousePressed(startScramble);

  currentMove = new Move();

}

function keyTyped() {
  switch (key) {
    case 'i':
      playMove(rMove);
      break;
    case 'k':
      playMove(riMove);
      break;
    case 'd':
      playMove(lMove);
      break;
    case 'e':
      playMove(liMove);
      break;
    case 'j':
      playMove(uMove);
      break;
    case 'f':
      playMove(uiMove);
      break;
    case 's':
      playMove(dMove);
      break;
    case 'l':
      playMove(diMove);
      break;
    case 'h':
      playMove(fMove);
      break;
    case 'g':
      playMove(fiMove);
      break;
    case 'w':
      playMove(bMove);
      break;
    case 'o':
      playMove(biMove);
      break;
    case 't':
      playMove(xMove);
      break;
    case 'y':
      playMove(xMove);
      break;
    case 'b':
      playMove(xiMove);
      break;
    case 'n':
      playMove(xiMove);
      break;
    case ';':
      playMove(yMove);
      break;
    case 'a':
      playMove(yiMove)
      break;
    case 'p':
      playMove(zMove);
      break;
    case 'q':
      playMove(ziMove);
      break;
  }
}

function draw() {
  background(150);

  // allows user pan
  orbitControl(3, 3, 3);

  rotateX(-PI / 6);
  rotateY(-PI / 4);

  if (autoSequence.length == 0) {
    autoAnimating = false;
    autoSequence.push(new Move(true, 'x', [1], 1, 0));
  }

  if (autoAnimating) {
    let autoMove = autoSequence[0];
    autoMove.angle += 0.15;

    if (autoMove.angle >= PI / 2) {
      autoSequence.shift();
      autoMove.resetAngle().execute();

    }

    for (qb of cube) {
      if (qb.inAnimation(autoMove)) {
        push();
        autoMove.rotater();
        qb.draw();
        pop();
      } else {
        qb.draw();
      }
    }
  } else {
    if (currentMove.animating) {
      currentMove.angle += 0.1;
    }

    if (currentMove.angle >= PI / 2) {
      currentMove.toggleAnimation().resetAngle().execute();
      
      if (solved(cube)) {
        history = [];
      } else {
        history.push(currentMove);
      }

    }

    for (qb of cube) {
      if (currentMove.animating && qb.inAnimation(currentMove)) {
        push();
        currentMove.rotater();
        qb.draw();
        pop();
      } else {
        qb.draw();
      }
    }
  }
}

function playMove(move) {
  if (!autoAnimating && !currentMove.animating) {
    Object.assign(currentMove, move);
  }
}

function solved() {
  let OuterCubies = cube.slice(0).splice(13, 1);
  let allColors = OuterCubies.map(c => c.colors);
  let reference = allColors.shift();
  
  return allColors.every(c => arraysMatch(c, reference));
}