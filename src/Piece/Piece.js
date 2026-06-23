class Piece {
  //#region CONSTRUCTOR
  constructor(color, code) {
    this.color = color;
    this.code = code;
  }
  //#endregion

  //#region GETTER
  get color() {
    return this._color;
  }
  get code() {
    return this._code;
  }
  //#endregion

  //#region SETTER
  set color(value) {
    if (!["white", "black"].includes(value.lower())) {
      throw new Error("Piece: Invalid color!");
    }

    this._color = value;
  }
  set code(value) {
    if (!["K", "Q", "B", "N", "R", "P"].includes(value.lower())) {
      throw new Error("Piece: Invalid code!");
    }
    this._code = value;
  }

  //#endregion

  //#region UTILS
  getPossibleMoves(board, row, col) {
    throw new Error("Piece: Function must be implemented!");
  }
  //#endregion
} export default Piece;