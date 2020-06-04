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

function setup() {
  createCanvas(600, 600, WEBGL);

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

  R = select('#r').mousePressed(() => Object.assign(currentMove, r));
  Ri = select('#ri').mousePressed(() => Object.assign(currentMove, ri));
  L = select('#l').mousePressed(() => Object.assign(currentMove, l));
  Li = select('#li').mousePressed(() => Object.assign(currentMove, li));
  X = select('#x').mousePressed(() => Object.assign(currentMove, x));
  Xi = select('#xi').mousePressed(() => Object.assign(currentMove, xi));
  U = select('#u').mousePressed(() => Object.assign(currentMove, u));
  Ui = select('#ui').mousePressed(() => Object.assign(currentMove, ui));
  D = select('#d').mousePressed(() => Object.assign(currentMove, d));
  Di = select('#di').mousePressed(() => Object.assign(currentMove, di));
  Y = select('#y').mousePressed(() => Object.assign(currentMove, y));
  Yi = select('#yi').mousePressed(() => Object.assign(currentMove, yi));
  F = select('#f').mousePressed(() => Object.assign(currentMove, f));
  Fi = select('#fi').mousePressed(() => Object.assign(currentMove, fi));
  B = select('#b').mousePressed(() => Object.assign(currentMove, b));
  Bi = select('#bi').mousePressed(() => Object.assign(currentMove, bi));
  Z = select('#z').mousePressed(() => Object.assign(currentMove, z));
  Zi = select('#zi').mousePressed(() => Object.assign(currentMove, zi));
  scrambler = select('#scrambler').mousePressed(startScramble);

  currentMove = new Move();

}

function keyTyped() {
  if (!currentMove.animating) {
    switch (key) {
      case 'i':
        Object.assign(currentMove, r);
        break;
      case 'k':
        Object.assign(currentMove, ri);
        break;
      case 'd':
        Object.assign(currentMove, l);
        break;
      case 'e':
        Object.assign(currentMove, li);
        break;
      case 'j':
        Object.assign(currentMove, u);
        break;
      case 'f':
        Object.assign(currentMove, ui);
        break;
      case 's':
        Object.assign(currentMove, d);
        break;
      case 'l':
        Object.assign(currentMove, di);
        break;
      case 'h':
        Object.assign(currentMove, f);
        break;
      case 'g':
        Object.assign(currentMove, fi);
        break;
      case 'w':
        Object.assign(currentMove, b);
        break;
      case 'o':
        Object.assign(currentMove, bi);
        break;
      case 't':
        Object.assign(currentMove, x);
        break;
      case 'y':
        Object.assign(currentMove, x);
        break;
      case 'b':
        Object.assign(currentMove, xi);
        break;
      case 'n':
        Object.assign(currentMove, xi);
        break;
      case ';':
        Object.assign(currentMove, y);
        break;
      case 'a':
        Object.assign(currentMove, yi)
        break;
      case 'p':
        Object.assign(currentMove, z);
        break;
      case 'q':
        Object.assign(currentMove, zi);
        break;
    }
  }
}

function draw() {
  background(150);

  // allows user pan
  orbitControl(3, 3, 3);

  rotateX(-PI / 6);
  rotateY(-PI / 4);

  if (scramble.length == 0) {
    scrambling = false;
    scramble.push(new Move(true, 'x', [1], 1, 0));
  }

  if (scrambling) {
    let scrambleMove = scramble[0];
    scrambleMove.angle += 0.15;

    if (scrambleMove.angle >= PI / 2) {
      scramble.shift();
      scrambleMove.resetAngle().execute();

    }

    for (qb of cube) {
      if (qb.inAnimation(scrambleMove)) {
        push();
        scrambleMove.rotater();
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

// add reverse solving function