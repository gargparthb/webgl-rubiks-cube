// defines all the program/environment variables

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
let slider, orderLabel, spdModeChkBox, timerChkBox;

// moves
let rMove, riMove, lMove, liMove;
let uMove, uiMove, dMove, diMove;
let fMove, fiMove, bMove, biMove;
let xMove, xiMove, yMove, yiMove, zMove, ziMove;

// drawing variables
let len, stickerOffset;
let spdMode = false;

function setup() {
  frameRate(60);

  canvas = createCanvas(windowWidth / 2, windowHeight * 18 / 20, WEBGL);
  // allows styling
  canvas.parent('canvas-wrapper')

  // initilizing drawing variables
  calculateLen();
  calculateStickerOffset();

  // initial color order
  initializeColorDict();

  // adding slider
  slider = createSlider(1, 5, 3, 1).parent('slider-wrapper').addClass('slider').input(newCube);

  // the label of order
  orderLabel = createP(slider.value() + 'x' + slider.value()).parent('order-label-wrapper');

  // spd mode box
  spdModeChkBox = select('#spd-chkbox').changed(toggleMode);

  // timer checkbox
  timerChkBox = select('#timer-chkbox');

  // makes cube
  createCube(order);

  // giving html buttons functionality
  R = select('#r').mouseClicked(() => playMove(rMove));
  Ri = select('#ri').mouseClicked(() => playMove(riMove));
  Rw = select('#rw').mouseClicked(() => playMove(rMove.makeWide()));
  Rwi = select('#rwi').mouseClicked(() => playMove(riMove.makeWide()));
  L = select('#l').mouseClicked(() => playMove(lMove));
  Li = select('#li').mouseClicked(() => playMove(liMove));
  Lw = select('#lw').mouseClicked(() => playMove(lMove.makeWide()));
  Lwi = select('#lwi').mouseClicked(() => playMove(liMove.makeWide()));
  X = select('#x').mouseClicked(() => playMove(xMove));
  Xi = select('#xi').mouseClicked(() => playMove(xiMove));
  U = select('#u').mouseClicked(() => playMove(uMove));
  Ui = select('#ui').mouseClicked(() => playMove(uiMove));
  Uw = select('#uw').mouseClicked(() => playMove(uMove.makeWide()));
  Uwi = select('#uwi').mouseClicked(() => playMove(uiMove.makeWide()));
  D = select('#d').mouseClicked(() => playMove(dMove));
  Di = select('#di').mouseClicked(() => playMove(diMove));
  Dw = select('#dw').mouseClicked(() => playMove(dMove.makeWide()));
  Dwi = select('#dwi').mouseClicked(() => playMove(diMove.makeWide()));
  Y = select('#y').mouseClicked(() => playMove(yMove));
  Yi = select('#yi').mouseClicked(() => playMove(yiMove));
  F = select('#f').mouseClicked(() => playMove(fMove));
  Fi = select('#fi').mouseClicked(() => playMove(fiMove));
  Fw = select('#fw').mouseClicked(() => playMove(fMove.makeWide()));
  Fwi = select('#fwi').mouseClicked(() => playMove(fiMove.makeWide()));
  B = select('#b').mouseClicked(() => playMove(bMove));
  Bi = select('#bi').mouseClicked(() => playMove(biMove));
  Bw = select('#bw').mouseClicked(() => playMove(bMove.makeWide()));
  Bwi = select('#bwi').mouseClicked(() => playMove(biMove.makeWide()));
  Z = select('#z').mouseClicked(() => playMove(zMove));
  Zi = select('#zi').mouseClicked(() => playMove(ziMove));
  scrambler = select('#scrambler').mouseClicked(startScramble);
  solver = select('#solver').mouseClicked(startSolution);

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
  // rescales cube
  calculateLen();
  calculateStickerOffset();
}

// main draw loop
function draw() {
  background(250, 128, 114);

  // allows user pan
  orbitControl();

  // gives better view
  setView();

  // checks if an auto sequence is finished
  if (autoSequence.length == 0) {
    finishAutoSequence();
  }

  if (autoAnimating) {
    // pulling out move
    let autoMove = autoSequence[0];
    incremenMoveAngle(true, autoMove);

    if (autoMove.doneAnimating()) {

      // switching through the auto sequence and saving move for history
      autoMove.resetAngle().execute();
      autoSequence.shift();

      updateHistory(autoMove);
    }

    // draws each qb of array with the auto rotation
    drawCube(autoMove);

  } else {
    // does the above for the user moves
    if (currentMove.animating) {
      incremenMoveAngle(spdMode, currentMove);
    }

    // checks if the move is done animating
    if (currentMove.doneAnimating()) {
      endMove(currentMove);
    }

    drawCube(currentMove);
  }
}