import Square from "./Square.js";

class Board {
    //#region CONSTRUCTOR
    constructor() {
        this._squares = [];
        this._lastDoubleStepPawn = null;
        this.initBoard();
    }
    //#endregion

    //#region GETTER
    get squares() {
        return this._squares;
    }

    get lastDoubleStepPawn() {
        return this._lastDoubleStepPawn;
    }
    //#endregion

    //#region SETTER
    set lastDoubleStepPawn(value) {
        this._lastDoubleStepPawn = value;
    }
    //#endregion

    //#region INIT
    initBoard() {
        this._squares = [];
        for (let row = 1; row <= 8; row++) {
            const boardRow = [];
            for (let col = 1; col <= 8; col++) {
                boardRow.push(new Square(col, row));
            }
            this._squares.push(boardRow);
        }
    }

    initPieces(pieces) {
        for (const { piece, row, col } of pieces) {
            const sq = this.getSquare(row, col);
            if (sq) sq.piece = piece;
        }
    }
    //#endregion

    //#region GETTERS
    getSquare(row, col) {
        if (col < 1 || col > 8 || row < 1 || row > 8) return null;
        return this._squares[row - 1][col - 1];
    }

    getAllPieces(color) {
        const result = [];
        for (let row = 1; row <= 8; row++) {
            for (let col = 1; col <= 8; col++) {
                const sq = this.getSquare(row, col);
                if (sq.piece && sq.piece.color === color) {
                    result.push({ piece: sq.piece, square: sq, row, col });
                }
            }
        }
        return result;
    }

    findKing(color) {
        for (let row = 1; row <= 8; row++) {
            for (let col = 1; col <= 8; col++) {
                const sq = this.getSquare(row, col);
                if (sq.piece && sq.piece.code === "K" && sq.piece.color === color) {
                    return sq;
                }
            }
        }
        return null;
    }
    //#endregion

    //#region MOVE
    applyMove(from, to) {
        if (!from || !to || !from.piece) return false;


        if (
            piece.code === "P" &&
            fromCol !== toCol &&
            !to.piece
        ) {
            const capturedPawnSquare = this.getSquare(fromRow, toCol);
            if (capturedPawnSquare) capturedPawnSquare.piece = null;
        }

        if (piece.code === "K" && Math.abs(toCol - fromCol) === 2) {
            const isKingSide = toCol > fromCol;
            const rookFromCol = isKingSide ? 8 : 1;
            const rookToCol = isKingSide ? toCol - 1 : toCol + 1;
            const rookFrom = this.getSquare(fromRow, rookFromCol);
            const rookTo = this.getSquare(fromRow, rookToCol);
            if (rookFrom && rookTo) {
                rookTo.piece = rookFrom.piece;
                rookFrom.piece = null;
            }
        }

        to.piece = piece;
        from.piece = null;

        return true;
    }

    _processPawnDoubleStep(from, to) {
        if (this._isPawnDoubleStep(from, to)) {
            this._recordPawnDoubleStep(to);
        } else {
            this._lastDoubleStepPawn = null;
        }
    }
    _isPawnDoubleStep(from, to) {
        return from.piece.code === "P" && Math.abs(to.row - from.row) === 2;
    }
    _recordPawnDoubleStep(to) {
        this._lastDoubleStepPawn = to;
    }
    //#endregion

    //#region CHECK DETECTION
    isInCheck(color) {
        const kingSq = this.findKing(color);
        if (!kingSq) return false;

        const enemyColor = color === "white" ? "black" : "white";
        const enemies = this.getAllPieces(enemyColor);

        return enemies.some(({ piece, row, col }) => {
            const rawMoves = piece.getPossibleMoves(this, row, col);
            return rawMoves.some(sq => sq.row === kingSq.row && sq.column === kingSq.column);
        });
    }

    getLegalMoves(piece, row, col) {
        const candidates = piece.getPossibleMoves(this, row, col);

        return candidates.filter(targetSq => {
            const clone = this.clone();
            clone.applyMove(row, col, targetSq.row, targetSq.column);
            return !clone.isInCheck(piece.color);
        });
    }
    //#endregion

    //#region GAME STATE
    isCheckmate(color) {
        if (!this.isInCheck(color)) return false;
        return this._hasNoLegalMoves(color);
    }

    isStalemate(color) {
        if (this.isInCheck(color)) return false;
        return this._hasNoLegalMoves(color);
    }

    _hasNoLegalMoves(color) {
        const pieces = this.getAllPieces(color);
        return pieces.every(({ piece, row, col }) => {
            return this.getLegalMoves(piece, row, col).length === 0;
        });
    }
    //#endregion

    //#region CLONE
    clone() {
        const copy = new Board();
        copy._lastDoubleStepPawn = this._lastDoubleStepPawn
            ? { ...this._lastDoubleStepPawn }
            : null;

        for (let row = 1; row <= 8; row++) {
            for (let col = 1; col <= 8; col++) {
                const original = this.getSquare(row, col);
                const cloned = copy.getSquare(row, col);
                cloned.piece = original.piece;
            }
        }
        return copy;
    }
    //#endregion
}

export default Board;