// allows for scaling
function calculateLen() {
    len = canvas.width / (4 * order)
}

// also for scaling
function calculateStickerOffset() {
    stickerOffset = 0.2 * len;
}

// initializes solved color dictionary
function initializeColorDict() {
    // order - U, D, F, B, L, R
    colorDict = [
        color(255, 255, 255),
        color(255, 255, 50),
        color(0, 255, 0),
        color(0, 0, 255),
        color(255, 160, 0),
        color(255, 0, 0)
    ];
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

// aligns viewport
function setView() {
    if (spdMode) {
        rotateX(-PI / 5)
    } else {
        rotateX(-PI / 6);
        rotateY(-PI / 4);
    }
}