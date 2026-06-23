class Square {
    //#region CONSTRUCTOR
    constructor(column, row, piece = null) {
        this._column = column; // 1-8
        this._row = row;       // 1-8
        this._piece = piece;
    }
    //#endregion

    //#region GETTER
    get column() {
        return this._column;
    }

    get row() {
        return this._row;
    }

    get color() {
        return (this._column + this._row) % 2 === 0
            ? "white"
            : "black";
    }

    get piece() {
        return this._piece;
    }

    get name() {
        const chars = String.fromCharCode(96 + this._column);
        return `${chars}${this._row}`;
    }
    //#endregion

    //#region SETTER
    set piece(value) {
        this._piece = value;
    }
    //#endregion

    //#region UTILS
    isEmpty() {
        return this._piece === null;
    }

    isEnemy(color){
        return this.piece.color != this.color;
    }
    //#endregion
}
export default Square;