// allows for scaling
function calculateLen() {
    len = canvas.width / (4 * order)
}

// also for scaling
function calculateStickerOffset() {
    stickerOffset = 0.1 * len;
}

// initializes solved color dictionary
function initializeColorDict() {
    colorDict = [
        color(255, 255, 255), color(255, 255, 50), color(0, 255, 0), color(0, 0, 255), color(255, 160, 0), color(255, 0, 0)
    ];
}

// slider callback
function newCube() {
    // prevents cross algorithms
    autoAnimating = false;
    createCube(this.value());
    // updates label
    orderLabel.html(this.value() + 'x' + this.value());
}

// makes a cube array given the order
function createCube(n) {
    // clears cube
    cube = [];

    // initializes new order
    order = n;

    // creates invisible layer
    if (n % 2 == 0) {
        layers = n + 1;
    } else {
        layers = n;
    }

    // shifts the range
    rangeStart = 1 - ceil(layers / 2);
    rangeEnd = layers - ceil(layers / 2);

    // creates the cube array
    let idx = 0;
    for (var x = rangeStart; x <= rangeEnd; x++) {
        for (var y = rangeStart; y <= rangeEnd; y++) {
            for (var z = rangeStart; z <= rangeEnd; z++) {
                cube.push(new Cubie(x, y, z, colorDict, idx, false));
                idx++;
            }
        }
    }

    // rescales the move ranges
    initializeMoveDict();
}

// updates moving variable with user's, as long as no other move is occuring
function playMove(move) {
    if (!autoAnimating && !currentMove.animating) {
        Object.assign(currentMove, move)
    }
}

// ends the auto-sequence and adds back the dummy moves
function finishAutoSequence() {
    // animating flag
    autoAnimating = false;
    // orginal dummy moves
    autoSequence.push(new Move(true, 'x', [1], 1, 0), new Move(true, 'y', [1], 1, 0));
}

// adds the move to the history array
function updateHistory(move) {
    if (solved(cube)) {
        history = [];
    } else {
        history.push(Object.assign({}, move));
    }
}

// checks to see if cube is solved
function solved() {
    let visible = visibleQbs(cube)
    let reference = visible[0].colors;

    let topColorsSame = uniformLayerColor(visible, 'y', rangeStart, 0, reference);
    let bottomColorsSame = uniformLayerColor(visible, 'y', rangeEnd, 1, reference);
    let frontColorsSame = uniformLayerColor(visible, 'z', rangeEnd, 2, reference);
    let backColorsSame = uniformLayerColor(visible, 'z', rangeStart, 3, reference);
    let leftColorsSame = uniformLayerColor(visible, 'x', rangeStart, 4, reference);
    let rightColorsSame = uniformLayerColor(visible, 'x', rangeEnd, 5, reference);

    return topColorsSame && bottomColorsSame && frontColorsSame && backColorsSame && leftColorsSame && rightColorsSame;
}

function uniformLayerColor(qbs, axis, layer, side, reference) {
    let target = qbs.filter(qb => qb[axis] == layer)
        .map(qb => qb.colors[side])
        .every(c => equalColors(c, reference[side]))
    return target;
}

// negates the invisible layer on even order cubes
function visibleQbs(array) {
    let target = [];

    for (qb of array) {
        if (!qb.inInvisibleLayer()) {
            target.push(qb);
        }
    }

    return target;
}

// iterates through each qb while drawing
function drawCube(move) {
    for (qb of cube) {
        // draws the animating layer if any
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

// changes spd mode on check
function toggleMode() {
    spdMode = this.checked();
}

// aligns viewport
function setView() {
    if (spdMode) {
        rotateX(-PI / 5)
    } else {
        rotateX(-PI / 6);
        rotateY(-PI / 4);
    }
}

// ends and logs the move
function endMove(move) {
    move.toggleAnimation().resetAngle().execute();
    updateHistory(move);
}

// increments the moving layer's angle
function incremenMoveAngle(speed, move) {
    if (speed) {
        move.angle += 0.15;
    } else {
        move.angle += 0.1;
    }
}