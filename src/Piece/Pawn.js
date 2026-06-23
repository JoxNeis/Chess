import Piece from "./Piece.js";
import Board from "../Board.js";
import Square from "../Square.js";

class Pawn extends Piece {
    //#region CONSTRUCTOR
    constructor(color) {
        super(color, "P");
    }
    //#endregion

    //#region UTILS
    getPossibleMoves(board, row, col) {
        moves = [];
        moves.push(this._forwardMoves(board, row, col));
        moves.push(this._diagonalMoves(board, row, col));
        moves.push(this._enPassantMoves(board, row, col));
        return moves;
    }

    _forwardMoves(board, row, col) {
        moves = [];
        if (row == 2) {
            moves.push(board.getSquare(4, col));
        }
        moves.push(board.getSquare(row + 1, col));
        return moves;
    }

    _diagonalMoves(board, row, col) {
        moves = [];
        digRight = board.getSquare(row+1,col+1);
        if(digRight != null && digRight.isEnemy()){
            moves.push(digRight);
        }
        digLeft = board.getSquare(row+1,col-1);
        if(digLeft != null && digLeft.isEnemy()){
            moves.push(digLeft);
        }
        return moves;
    }

    _enPassantMoves(board, row, col) {

    }

    _upgradePiece(board, row, col) {

    }
    //#endregion

} export default Piece;