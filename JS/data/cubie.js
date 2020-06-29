class Cubie {
  constructor(x, y, z, colors, idx, highlight) {
    // this is the location relative to the orgin (0, 0, 0)
    this.x = x;
    this.y = y;
    this.z = z;
    // color order is: up, down, front, back, left, right
    this.colors = colors;

    // debugging tools
    this.idx = idx;
    this.highlight = highlight;
  }

  draw() {
    // don't draw on the invisable layer on even ordered
    if (!this.inInvisibleLayer()) {
      // the offsets from the center of the mini-cube
      const nDist = (-1 * len / 2) - 1
      const pDist = len / 2 + 1

      push();
      // even cubes need to be offset to account of invisable layer
      translate(translateOffset(this.x), translateOffset(this.y), translateOffset(this.z));

      if (spdMode) {
        noFill();
      } else {
        fill(0);
      }
      noStroke();

      // the cube for each qb
      box(len);

      // draws each sticker induvidually

      // TOP
      if (this.y == rangeStart) {
        push();
        translate(0, nDist, 0);
        fill(this.colors[0]);
        rotateX(PI / 2);
        plane(len - stickerOffset, len - stickerOffset, 2);
        pop();
      }

      // BOTTOM
      if (this.y == rangeEnd) {
        push();
        translate(0, pDist, 0);
        fill(this.colors[1])
        rotateX(PI / 2);
        plane(len - stickerOffset, len - stickerOffset, 2);
        pop();
      }

      // FRONT
      if (this.z == rangeEnd) {
        push();
        translate(0, 0, pDist);
        fill(this.colors[2]);
        plane(len - stickerOffset, len - stickerOffset, 2);
        pop();
      }

      // BACK
      if (this.z == rangeStart) {
        push();
        translate(0, 0, nDist);
        fill(this.colors[3]);
        plane(len - stickerOffset, len - stickerOffset, 2);
        pop();
      }

      // LEFT
      if (this.x == rangeStart) {
        push();
        translate(nDist, 0, 0);
        fill(this.colors[4]);
        rotateY(PI / 2);
        plane(len - stickerOffset, len - stickerOffset, 2);
        pop();
      }

      // RIGHT
      if (this.x == rangeEnd) {
        push();
        translate(pDist, 0, 0);
        fill(this.colors[5]);
        rotateY(PI / 2);
        plane(len - stickerOffset, len - stickerOffset, 2);
        pop();
      }

      pop();
    }
  }

  // deMorgans law
  inInvisibleLayer() {
    return (order % 2 == 0) && [this.x, this.y, this.z].includes(0);
  }

  // takes the move and rotates the cubie's colors
  updateColors(axis, dir) {

    // just for readabiliy
    const up = this.colors[0];
    const down = this.colors[1];
    const front = this.colors[2];
    const back = this.colors[3];
    const left = this.colors[4];
    const right = this.colors[5];

    // remaps the colors depending on desired move
    switch (axis) {
      case "x":
        if (dir == 1) {
          this.colors = [front, back, down, up, left, right];
        } else {
          this.colors = [back, front, up, down, left, right];
        }
        break;
      case "y":
        if (dir == 1) {
          this.colors = [up, down, right, left, front, back];
        } else {
          this.colors = [up, down, left, right, back, front];
        }
        break;
      case "z":
        if (dir == 1) {
          this.colors = [left, right, front, back, down, up];
        } else {
          this.colors = [right, left, front, back, up, down];
        }
        break;
    }
  }

  // given a move, check wheather this qb is animating
  inAnimation(move) {
    switch (move.axis) {
      case 'x':
        return move.layers.includes(this.x);
        break;
      case 'y':
        return move.layers.includes(this.y);
        break;
      case 'z':
        return move.layers.includes(this.z);
        break;
    }
  }
}

// squeezes things into the invisable layer
function translateOffset(coord) {
  if (order % 2 == 0) {
    if (coord > 0) {
      return (coord - 0.5) * len
    } else {
      return (coord + 0.5) * len
    }
  } else {
    return coord * len;
  }
}