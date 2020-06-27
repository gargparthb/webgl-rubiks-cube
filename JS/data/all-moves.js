// all moves dictionary

// can be called everytime order changes
function initializeMoveDict() {
    rMove = new Move(true, 'x', [rangeEnd], 1, 0);
    riMove = new Move(true, 'x', [rangeEnd], -1, 0);
    lMove = new Move(true, 'x', [rangeStart], -1, 0);
    liMove = new Move(true, 'x', [rangeStart], 1, 0);
    uMove = new Move(true, 'y', [rangeStart], 1, 0);
    uiMove = new Move(true, 'y', [rangeStart], -1, 0);
    dMove = new Move(true, 'y', [rangeEnd], -1, 0);
    diMove = new Move(true, 'y', [rangeEnd], 1, 0);
    fMove = new Move(true, 'z', [rangeEnd], 1, 0);
    fiMove = new Move(true, 'z', [rangeEnd], -1, 0);
    bMove = new Move(true, 'z', [rangeStart], -1, 0);
    biMove = new Move(true, 'z', [rangeStart], 1, 0);
    xMove = new Move(true, 'x', allNumsBetween(rangeStart, rangeEnd), 1, 0);
    xiMove = new Move(true, 'x', allNumsBetween(rangeStart, rangeEnd), -1, 0);
    yMove = new Move(true, 'y', allNumsBetween(rangeStart, rangeEnd), 1, 0);
    yiMove = new Move(true, 'y', allNumsBetween(rangeStart, rangeEnd), -1, 0);
    zMove = new Move(true, 'z', allNumsBetween(rangeStart, rangeEnd), 1, 0);
    ziMove = new Move(true, 'z', allNumsBetween(rangeStart, rangeEnd), -1, 0);
}