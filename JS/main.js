// initializes the array and colors
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

// drawing variables
let len;

function setup() {
  canvas = createCanvas(windowWidth / 2, windowHeight * 19 / 20, WEBGL);
  // allows styling
  canvas.parent('window-wrapper')

  len = canvas.width / 8;

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

  // giving html buttons functionality
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
  solver = select('#solver').mousePressed(startSolution);

  // gives a dummy setup move
  currentMove = new Move();

}

// processes key input
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

// reponsive web design
function windowResized() {
  resizeCanvas(windowWidth / 2, windowHeight * .95);
  len = canvas.width / 9;
}

// main draw loop
function draw() {
  background(150);

  // allows user pan
  orbitControl(3, 3, 3);

  // gives nicer view
  rotateX(-PI / 6);
  rotateY(-PI / 4);

  // checks if an auto sequence is finished
  if (autoSequence.length == 0) {
    // animating flag
    autoAnimating = false;
    // orginal dummy moves
    autoSequence.push(new Move(true, 'x', [1], 1, 0), new Move(true, 'y', [1], 1, 0));
  }

  if (autoAnimating) {
    // setting auto speed
    let autoMove = autoSequence[0];
    autoMove.angle += 0.1;

    if (autoMove.angle >= PI / 2) {

      // switching through the auto sequence and saving move for history
      autoSequence.shift();
      autoMove.resetAngle().execute();

      updateHistory(autoMove);
    }

    // draws each qb of array
    drawCube(autoMove);

  } else {
    // does the above for the user moves
    if (currentMove.animating) {
      currentMove.angle += 0.1;
    }

    if (currentMove.angle >= PI / 2) {
      currentMove.toggleAnimation().resetAngle().execute();
      updateHistory(currentMove);
    }

    drawCube(currentMove);
  }
}

// updates moving variable with user's, as long as no other move is occuring
function playMove(move) {
  if (!autoAnimating && !currentMove.animating) {
    Object.assign(currentMove, move);
  }
}

// checks to see if cube is solved
function solved() {
  let reference = cube[0].colors;

  let topColorsSame = cube.filter(c => c.y == -1).map(c => c.colors[0]).every(i => equalColors(i, reference[0]));
  let bottomColorsSame = cube.filter(c => c.y == 1).map(c => c.colors[1]).every(i => equalColors(i, reference[1]));
  let frontColorsSame = cube.filter(c => c.z == 1).map(c => c.colors[2]).every(i => equalColors(i, reference[2]));
  let backColorsSame = cube.filter(c => c.z == -1).map(c => c.colors[3]).every(i => equalColors(i, reference[3]));
  let leftColorsSame = cube.filter(c => c.x == -1).map(c => c.colors[4]).every(i => equalColors(i, reference[4]));
  let rightColorsSame = cube.filter(c => c.x == 1).map(c => c.colors[5]).every(i => equalColors(i, reference[5]));

  return topColorsSame && bottomColorsSame && frontColorsSame && backColorsSame && leftColorsSame && rightColorsSame;
}

// compares two colors
function equalColors(c1, c2) {
  return arraysMatch(c1.levels, c2.levels);
}

function updateHistory(move) {
  if (solved(cube)) {
    history = [];
  } else {
    history.push(Object.assign({}, move));
  }
}

function drawCube(move) {
  for (qb of cube) {
    if (qb.inAnimation(move) && move.animating) {
      push();
      move.rotater();
      qb.draw();
      pop();
    } else {
      qb.draw();
    }
  }
}