class Move {
  constructor(animating, axis, layers, dir, angle) {
    // animating flag
    this.animating = animating;
    // cubie location
    this.axis = axis;
    // layer is an array to allow multiple layer movement (rotation, wide moves)
    this.layers = layers;
    // move data
    this.dir = dir;
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
}