function twistX(coord, dir, c) {
  for (qb of c) {
    if (qb.x == coord) {
      // saves original position
      let currentY = qb.y;
      let currentZ = qb.z;

      // updates position
      qb.y = currentZ * -1 * dir;
      qb.z = currentY * dir;

      // updates colors
      qb.updateColors('x', dir);
    }
  }

  // mostly for debugging
  c.sort((a, b) => {
    return a.idx < b.idx;
  });
}

function twistY(coord, dir, c) {
  for (qb of c) {
    if (qb.y == coord) {
      /// saves original position
      let currentX = qb.x;
      let currentZ = qb.z;

      // updates position
      qb.x = currentZ * -1 * dir;
      qb.z = currentX * dir;

      // updates colors
      qb.updateColors("y", dir);
    }
  }
  // mostly for debugging
  c.sort((a, b) => {
    return a.idx < b.idx;
  });
}

function twistZ(coord, dir, c) {
  for (qb of c) {
    if (qb.z == coord) {
      /// saves original position
      let currentX = qb.x;
      let currentY = qb.y;

      // updates position
      qb.x = currentY * -1 * dir;
      qb.y = currentX * dir;

      // updates colors
      qb.updateColors("z", dir);
    }
  }
  // mostly for debugging
  c.sort((a, b) => {
    return a.idx < b.idx;
  });
}