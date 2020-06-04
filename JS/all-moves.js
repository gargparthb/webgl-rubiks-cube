// all moves dictionary

const rMove = new Move(true, 'x', [1], 1, 0);
const riMove = new Move(true, 'x', [1], -1, 0);
const lMove = new Move(true, 'x', [-1], -1, 0);
const liMove = new Move(true, 'x', [-1], 1, 0);
const uMove = new Move(true, 'y', [-1], 1, 0);
const uiMove = new Move(true, 'y', [-1], -1, 0);
const dMove = new Move(true, 'y', [1], -1, 0);
const diMove = new Move(true, 'y', [1], 1, 0);
const fMove = new Move(true, 'z', [1], 1, 0);
const fiMove = new Move(true, 'z', [1], -1, 0);
const bMove = new Move(true, 'z', [-1], -1, 0);
const biMove = new Move(true, 'z', [-1], 1, 0);
const xMove = new Move(true, 'x', [-1, 0, 1], 1, 0);
const xiMove = new Move(true, 'x', [-1, 0, 1], -1, 0);
const yMove = new Move(true, 'y', [-1, 0, 1], 1, 0);
const yiMove = new Move(true, 'y', [-1, 0, 1], -1, 0);
const zMove = new Move(true, 'z', [-1, 0, 1], 1, 0);
const ziMove = new Move(true, 'z', [-1, 0, 1], -1, 0);