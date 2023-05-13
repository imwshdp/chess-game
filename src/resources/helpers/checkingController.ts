import Board from '../../resources/models/Board';
import Cell from '../../resources/models/Cell';
import { getDeepCopyBoard } from './copying';

export const checkingController = (board: Board, selectedCell: Cell, kingCell: Cell, x: number, y: number): boolean => {
	if (selectedCell.figure && kingCell.figure) {
		// create copies with new board context
		const newPotentialBoard: Board = getDeepCopyBoard(board); // new board
		const cellsOfPotentialBoard: Cell[][] = newPotentialBoard.cells; // board cells
		const currentCell = newPotentialBoard.getCell(selectedCell.x, selectedCell.y); // selected cell

		currentCell.moveFigure(newPotentialBoard.getCell(x, y)); // move selected cell to (x, y) position

		// get king position
		const newPotentialKingCell =
			selectedCell.figure.name === kingCell.figure.name && selectedCell.figure.color === kingCell.figure.color
				? newPotentialBoard.getCell(x, y)
				: newPotentialBoard.getCell(kingCell.x, kingCell.y);

		// check danger for king after move
		if (!newPotentialBoard.isKingInDanger(newPotentialKingCell, cellsOfPotentialBoard)) {
			return false;
		}
	}

	return true;
};
