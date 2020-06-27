// allows for scaling
function calculateLen() {
    len = canvas.width / (4 * order)
}

// also for scaling
function calculateStickerOffset() {
    stickerOffset = 0.2 * len;
}

// slider callback
function newCube() {
    // prevents cross algorithms
    autoAnimating = false;
    createCube(this.value());
    // updates label
    orderLabel.html(this.value() + 'x' + this.value());
}

// updates the cube with a new layer
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
    let visible = visibleQbs(cube);
    let reference = visible[0].colors;

    let topColorsSame = visible.filter(c => c.y == rangeStart).map(c => c.colors[0]).every(i => equalColors(i, reference[0]));
    let bottomColorsSame = visible.filter(c => c.y == rangeEnd).map(c => c.colors[1]).every(i => equalColors(i, reference[1]));
    let frontColorsSame = visible.filter(c => c.z == rangeEnd).map(c => c.colors[2]).every(i => equalColors(i, reference[2]));
    let backColorsSame = visible.filter(c => c.z == rangeStart).map(c => c.colors[3]).every(i => equalColors(i, reference[3]));
    let leftColorsSame = visible.filter(c => c.x == rangeStart).map(c => c.colors[4]).every(i => equalColors(i, reference[4]));
    let rightColorsSame = visible.filter(c => c.x == rangeEnd).map(c => c.colors[5]).every(i => equalColors(i, reference[5]));

    return topColorsSame && bottomColorsSame && frontColorsSame && backColorsSame && leftColorsSame && rightColorsSame;
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