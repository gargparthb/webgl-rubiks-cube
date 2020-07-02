class Move {
  constructor(animating, axis, layers, dir, angle) {
    // animating flag
    this.animating = animating;
    // cubie location
    this.axis = axis;
    // layer is an array to allow multiple layer movement (rotation, wide moves)
    this.layers = layers;
    // move direction (+/-)
    this.dir = dir;
    // the animating parameter
    this.angle = angle;
  }

  // updates cube data
  execute() {
    switch (this.axis) {
      case 'x':
        for (let l of this.layers) {
          twistX(l, this.dir, cube);
        }
        break;
      case 'y':
        for (let l of this.layers) {
          twistY(l, this.dir, cube);
        }
        break;
      case 'z':
        for (let l of this.layers) {
          twistZ(l, this.dir, cube);
        }
    }
    return this;
  }

  // mostly for chaining
  toggleAnimation() {
    this.animating = !this.animating;
    return this;
  }

  // mostly for chaining
  resetAngle() {
    this.angle = 0;
    return this;
  }

  // gives correct rotater function for animating
  rotater() {
    switch (this.axis) {
      case 'x':
        rotateX(this.dir * this.angle);
        break;
      case 'y':
        rotateY(-1 * this.dir * this.angle);
        break;
      case 'z':
        rotateZ(this.dir * this.angle);
        break;
    }
  }

  // turns the move into the outer two layers
  makeWide() {
    if (this.layers[0] > 0) {
      return new Move(true, this.axis, [rangeEnd - 1, rangeEnd], this.dir, 0);
    } else {
      return new Move(true, this.axis, [rangeStart, rangeStart + 1], this.dir, 0);
    }
  }

  doneAnimating() {
    return this.angle >= PI / 2;
  }

  // allows for rotations during timed inspection
  isRotation() {
    return this.layers.length == order;
  }

  // ends and logs the move
  end() {
    this.toggleAnimation().resetAngle().execute().updateHistory();
  }

  // adds the move to the history array
  updateHistory() {
    if (solved(cube)) {
      // clears if cube is now solved
      history = [];
    } else {
      // adds move copy object
      history.push(Object.assign({}, this));
    }

    return this;
  }

  // iterates through each qb while drawing
  drawCube(c) {

    for (let qb of c) {
      // draws the animating layer if any
      if (qb.inAnimation(this) && this.animating) {
        push();
        this.rotater();
        qb.draw();
        pop();
      } else {
        qb.draw();
      }
    }

  }

  // are two moves equal
  equal(comp) {
    if (this != undefined && comp != undefined) {

      return (this.axis == comp.axis &&
        arraysMatch(this.layers.sort(), comp.layers.sort()) &&
        this.dir == comp.dir);

    } else {
      return false;
    }
  }

  // are two moves inverses of each other
  inverse(comp) {
    if (this != undefined && comp != undefined) {

      return (this.axis == comp.axis &&
        arraysMatch(this.layers.sort(), comp.layers.sort()) &&
        this.dir == comp.dir * -1);

    } else {
      return false;
    }
  }
}