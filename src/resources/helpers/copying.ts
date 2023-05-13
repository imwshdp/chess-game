import Board from '../../resources/models/Board';
import { FigureName } from '../../resources/models/figures/Figure';

import Knight from 'resources/models/figures/Knight';
import Bishop from 'resources/models/figures/Bishop';
import Pawn from 'resources/models/figures/Pawn';
import King from 'resources/models/figures/King';
import Rook from 'resources/models/figures/Rook';
import Queen from 'resources/models/figures/Queen';

export const getDeepCopyBoard = (board: Board): Board => {
	const copyBoard = new Board();
	copyBoard.initCells();

	for (let i = 0; i < copyBoard.cells.length; i++) {
		for (let j = 0; j < copyBoard.cells[i].length; j++) {
			const currentCell = board.getCell(i, j);
			const figureColor = currentCell.figure?.color;

			if (figureColor) {
				switch (currentCell.figure?.name) {
					case FigureName.BISHOP:
						new Bishop(figureColor, copyBoard.getCell(i, j));
						break;

					case FigureName.KING:
						new King(figureColor, copyBoard.getCell(i, j));
						break;

					case FigureName.KNIGHT:
						new Knight(figureColor, copyBoard.getCell(i, j));
						break;

					case FigureName.PAWN:
						new Pawn(figureColor, copyBoard.getCell(i, j));
						break;

					case FigureName.QUEEN:
						new Queen(figureColor, copyBoard.getCell(i, j));
						break;

					case FigureName.ROOK:
						new Rook(figureColor, copyBoard.getCell(i, j));
						break;
				}
			}
		}
	}

	return copyBoard;
};
