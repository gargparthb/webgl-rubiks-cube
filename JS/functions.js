// updates moving variable with user's, as long as no other move is occuring
function playMove(move) {
    if (!autoAnimating && !currentMove.animating) {
        Object.assign(currentMove, move)
    }
}

// checks to see if cube is solved
function solved() {
    let reference = cube[0].colors;

    let topColorsSame = cube.filter(c => c.y == rangeStart).map(c => c.colors[0]).every(i => equalColors(i, reference[0]));
    let bottomColorsSame = cube.filter(c => c.y == rangeEnd).map(c => c.colors[1]).every(i => equalColors(i, reference[1]));
    let frontColorsSame = cube.filter(c => c.z == rangeEnd).map(c => c.colors[2]).every(i => equalColors(i, reference[2]));
    let backColorsSame = cube.filter(c => c.z == rangeStart).map(c => c.colors[3]).every(i => equalColors(i, reference[3]));
    let leftColorsSame = cube.filter(c => c.x == rangeStart).map(c => c.colors[4]).every(i => equalColors(i, reference[4]));
    let rightColorsSame = cube.filter(c => c.x == rangeEnd).map(c => c.colors[5]).every(i => equalColors(i, reference[5]));

    return topColorsSame && bottomColorsSame && frontColorsSame && backColorsSame && leftColorsSame && rightColorsSame;
}

// compares two colors
function equalColors(c1, c2) {
    return arraysMatch(c1.levels, c2.levels);
}

// adds the move to the history array
function updateHistory(move) {
    if (solved(cube)) {
        history = [];
    } else {
        history.push(Object.assign({}, move));
    }
}

// allows for scaling
function calculateStickerOffset() {
    stickerOffset = 0.2 * len;
}

// also for scaling
function calculateLen() {
    len = canvas.width / (4 * order)
}

// updates the cube with a new layer
function createCube(n) {
    cube = [];
    order = n;

    // creates invisible layer
    if (n % 2 == 0) {
        layers = n + 1;
    } else {
        layers = n;
    }

    rangeStart = 1 - ceil(layers / 2);
    rangeEnd = layers - ceil(layers / 2);

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
    // rescales the move ranges
    initializeMoveDict();
}

// slider callback
function newCube() {
    createCube(this.value());
    orderLabel.html(this.value() + 'x' + this.value());
}

// iterates through each qb while drawing
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