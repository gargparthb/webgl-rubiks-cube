// initializes the array and colors
let cube = [];
let colorDict;

// setting dimensions
let order = 3;
let rangeStart, rangeEnd;

// initializing move object
let currentMove;

// getting HTML elements
let R, Ri, L, Li, U, Ui, D, Di, F, Fi, B, Bi, X, Xi, Y, Yi, Z, Zi;
let Rw, Rwi, Lw, Lwi, Uw, Uwi, Dw, Dwi, Fw, Fwi, Bw, Bwi;
let scrambler, solver;
let canvas;
let slider, orderLabel;

// moves
let rMove, riMove, lMove, liMove;
let uMove, uiMove, dMove, diMove;
let fMove, fiMove, bMove, biMove;
let xMove, xiMove, yMove, yiMove, zMove, ziMove;

// drawing variables
let len, stickerOffset;



function setup() {
  canvas = createCanvas(windowWidth / 2, windowHeight * 19 / 20, WEBGL);
  // allows styling
  canvas.parent('window-wrapper')

  // initilizing drawing variables
  calculateLen();
  calculateStickerOffset();

  // initial color order
  colorDict = [
    color(255, 255, 255), color(255, 255, 50), color(0, 255, 0), color(0, 0, 255), color(255, 160, 0), color(255, 0, 0)
  ];

  // adding slider
  slider = createSlider(2, 5, 3, 1);
  slider.parent('slider-wrapper');
  slider.input(newCube);

  // the label of order
  orderLabel = createP(slider.value() + 'x' + slider.value());
  orderLabel.parent('order-label-wrapper');

  // makes cube
  createCube(order);

  // giving html buttons functionality
  R = select('#r').mouseClicked(() => playMove(rMove));
  Ri = select('#ri').mousePressed(() => playMove(riMove));
  Rw = select('#rw').mouseClicked(() => playMove(rMove.makeWide()));
  Rwi = select('#rwi').mousePressed(() => playMove(riMove.makeWide()));
  L = select('#l').mousePressed(() => playMove(lMove));
  Li = select('#li').mousePressed(() => playMove(liMove));
  Lw = select('#lw').mouseClicked(() => playMove(lMove.makeWide()));
  Lwi = select('#lwi').mousePressed(() => playMove(liMove.makeWide()));
  X = select('#x').mousePressed(() => playMove(xMove));
  Xi = select('#xi').mousePressed(() => playMove(xiMove));
  U = select('#u').mousePressed(() => playMove(uMove));
  Ui = select('#ui').mousePressed(() => playMove(uiMove));
  Uw = select('#uw').mouseClicked(() => playMove(uMove.makeWide()));
  Uwi = select('#uwi').mousePressed(() => playMove(uiMove.makeWide()));
  D = select('#d').mousePressed(() => playMove(dMove));
  Di = select('#di').mousePressed(() => playMove(diMove));
  Dw = select('#dw').mouseClicked(() => playMove(dMove.makeWide()));
  Dwi = select('#dwi').mousePressed(() => playMove(diMove.makeWide()));
  Y = select('#y').mousePressed(() => playMove(yMove));
  Yi = select('#yi').mousePressed(() => playMove(yiMove));
  F = select('#f').mousePressed(() => playMove(fMove));
  Fi = select('#fi').mousePressed(() => playMove(fiMove));
  Fw = select('#fw').mouseClicked(() => playMove(fMove.makeWide()));
  Fwi = select('#fwi').mousePressed(() => playMove(fiMove.makeWide()));
  B = select('#b').mousePressed(() => playMove(bMove));
  Bi = select('#bi').mousePressed(() => playMove(biMove));
  Bw = select('#bw').mouseClicked(() => playMove(bMove.makeWide()));
  Bwi = select('#bwi').mousePressed(() => playMove(biMove.makeWide()));
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
    case 'u':
      playMove(rMove.makeWide());
      break;
    case 'm':
      playMove(riMove.makeWide());
      break;
    case 'd':
      playMove(lMove);
      break;
    case 'e':
      playMove(liMove);
      break;
    case 'v':
      playMove(lMove.makeWide());
      break;
    case 'r':
      playMove(liMove.makeWide());
      break;
    case 'j':
      playMove(uMove);
      break;
    case 'f':
      playMove(uiMove);
      break;
    case ',':
      playMove(uMove.makeWide());
      break;
    case 'c':
      playMove(uiMove.makeWide());
    case 's':
      playMove(dMove);
      break;
    case 'l':
      playMove(diMove);
      break;
    case 'z':
      playMove(dMove.makeWide());
      break;
    case '/':
      playMove(diMove.makeWide());
    case 'h':
      playMove(fMove);
      break;
    case 'g':
      playMove(fiMove);
      break;
    case '7':
      playMove(fMove.makeWide());
      break;
    case '4':
      playMove(fiMove.makeWide());
      break;
    case 'w':
      playMove(bMove);
      break;
    case 'o':
      playMove(biMove);
      break;
    case '2':
      playMove(bMove.makeWide());
      break;
    case '9':
      playMove(biMove.makeWide());
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
  calculateLen();
  calculateStickerOffset();
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