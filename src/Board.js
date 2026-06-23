import Square from "./Square.js";

class Board {
    //#region CONSTRUCTOR
    constructor() {
        this._squares = [];
        this.initBoard();
        this.initPieces();
    }
    //#endregion

    //#region GETTER
    get squares() {
        return this._squares;
    }
    //#endregion

    //#region UTILS
    initBoard() {
        this._squares = [];

        for (let row = 1; row <= 8; row++) {
            const boardRow = [];

            for (let column = 1; column <= 8; column++) {
                boardRow.push(new Square(column, row));
            }

            this._squares.push(boardRow);
        }
    }

    initPieces() {
        // Leave it for now
    }

    getSquare(row,column) {
        if (
            column < 1 || column > 8 ||
            row < 1 || row > 8
        ) {
            return null;
        }

        return this._squares[row - 1][column - 1];
    }
    //#endregion
}

export default Board;