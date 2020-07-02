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
    // clears cube and history
    cube = [];
    history = [];

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
        Object.assign(currentMove, move);

        // starts timer on move in inspection
        if (timerMode && !move.isRotation()) {
            currentTimer.endInspection();
        }
    }
}

// ends the auto-sequence and adds back the dummy moves
function finishAutoSequence() {
    // animating flag
    autoAnimating = false;
    // orginal dummy moves
    autoSequence.push(new Move(true, 'x', [1], 1, 0), new Move(true, 'y', [1], 1, 0));
}

// checks to see if cube is solved
function solved() {
    let visible = visibleQbs(cube)
    let reference = visible[0].colors;
    let cMap = [];

    cMap.push(uniformLayerColor(visible, 'y', rangeStart, 0, reference),
        uniformLayerColor(visible, 'y', rangeEnd, 1, reference),
        uniformLayerColor(visible, 'z', rangeEnd, 2, reference),
        uniformLayerColor(visible, 'z', rangeStart, 3, reference),
        uniformLayerColor(visible, 'x', rangeStart, 4, reference),
        uniformLayerColor(visible, 'x', rangeEnd, 5, reference));

    return cMap.every(i => i);
}

// isolates and matches a layer's color to reference
function uniformLayerColor(qbs, axis, layer, side, reference) {
    let target = qbs
        // collects layer cubies
        .filter(qb => qb[axis] == layer)
        // gets the side colors
        .map(qb => qb.colors[side])
        // compares all the side colors
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

// increments the moving layer's angle
function incremenMoveAngle(speed, move) {
    if (speed) {
        move.angle += 0.3;
    } else {
        move.angle += 0.1;
    }
}