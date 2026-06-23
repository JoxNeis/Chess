import Piece from "./Piece.js";

class Pawn extends Piece {

    constructor(color) {
        super(color, "P");
    }

    getPossibleMoves(board, row, col) {
        let moves = [];
        moves.push(...this._forwardMoves(board, row, col));
        moves.push(...this._diagonalMoves(board, row, col));
        moves.push(...this._enPassantMoves(board, row, col));
        return moves;
    }

    _forwardMoves(board, row, col) {
        let moves = [];
        const dir = this.color === "white" ? -1 : 1;
        const startRow = this.color === "white" ? 6 : 1;

        const oneStep = board.getSquare(row + dir, col);
        if (oneStep && !oneStep.piece) {
            moves.push(oneStep);
            if (row === startRow) {
                const twoStep = board.getSquare(row + 2 * dir, col);
                if (twoStep && !twoStep.piece) {
                    moves.push(twoStep);
                }
            }
        }
        return moves;
    }

    _diagonalMoves(board, row, col) {
        let moves = [];
        const dir = this.color === "white" ? -1 : 1;

        for (const dcol of [-1, 1]) {
            const sq = board.getSquare(row + dir, col + dcol);
            if (sq && sq.piece && sq.piece.color !== this.color) {
                moves.push(sq);
            }
        }
        return moves;
    }

    _enPassantMoves(board, row, col) {
        let moves = [];
        const dir = this.color === "white" ? -1 : 1;
        const enPassantRow = this.color === "white" ? 3 : 4;

        if (row !== enPassantRow) return moves;

        for (const dcol of [-1, 1]) {
            const adjacent = board.getSquare(row, col + dcol);
            if (
                adjacent &&
                adjacent.piece &&
                adjacent.piece.color !== this.color &&
                adjacent.piece.code === "P" &&
                adjacent.piece === board.lastDoubleStepPawn
            ) {
                moves.push(board.getSquare(row + dir, col + dcol));
            }
        }
        return moves;
    }

    getPromotionPieces() {
        return ["Q", "R", "B", "N"];
    }
}

export default Pawn;