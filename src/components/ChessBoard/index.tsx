import React, { useState, useEffect, LegacyRef } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from 'store';

import { FigureName } from 'resources/models/figures/Figure';
import ChessCell from 'components/ChessCell';
import Colors from 'resources/models/Colors';
import Board from 'resources/models/Board';
import Cell from 'resources/models/Cell';

import css from './index.module.css';
import StatusBar from 'components/StatusBar';

interface BoardProps {
	board: Board;
	setBoard: (board: Board) => void;
	swapPlayer: () => void;
	currentPlayerBadge: React.RefObject<HTMLSpanElement> | null;
}

const ChessBoard: React.FC<BoardProps> = observer(({ board, setBoard, swapPlayer, currentPlayerBadge }) => {
	const store = useStore();
	const currentPlayer = store.currentPlayer,
		isGameEnded = store.gameEndStatus,
		isGameStarted = store.gameStartStatus;

	// selected cell state
	const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

	// HIGHLIGHTING
	useEffect(() => {
		if (board.blackKing && board.whiteKing) {
			const currentPlayerKing = currentPlayer?.color === Colors.WHITE ? board.whiteKing : board.blackKing;
			highlightCells(currentPlayerKing);
		}
	}, [selectedCell]);

	// GAME ENDING
	useEffect(() => {
		if (isGameEnded) {
			setSelectedCell(null);
			blockCells();
		}
	}, [isGameEnded]);

	useEffect(() => {
		if (isGameStarted && stalemateCheck()) {
			store.setGameStalemate();
			store.setGameEnd();
		}
	}, [currentPlayer]);

	const handleClick = (cell: Cell) => {
		// game start by first click (when game was restarted, but not started yet)
		if (!isGameStarted && !isGameEnded && cell.figure?.color === Colors.WHITE) {
			store.startGame();
		}

		// MOVING TO CELL
		if (selectedCell && selectedCell !== cell && cell.available) {
			// check state rewriting for kings to false
			if (!!board.whiteKing && board.whiteKing.figure) board.whiteKing.figure.checked = false;
			if (!!board.blackKing && board.blackKing.figure) board.blackKing.figure.checked = false;

			// MOVES HANDLER
			if (
				selectedCell.figure?.name === FigureName.KING &&
				cell.figure?.name === FigureName.ROOK &&
				selectedCell.figure.color === cell.figure.color
			) {
				// castles
				handleCastle(selectedCell, cell);
			} else {
				if (selectedCell.figure?.name === FigureName.KING) {
					selectedCell.figure.color === Colors.WHITE ? (board.whiteKing = cell) : (board.blackKing = cell);
				}

				// common move
				selectedCell.moveFigure(cell);

				castleActivityCheck(selectedCell, cell);
			}

			setSelectedCell(null);
			checkmateCheck();

			swapPlayer();
		} else {
			// PICKING CELL
			if (cell.blocked) return;

			if (cell.figure?.color === currentPlayer?.color) {
				setSelectedCell(cell); // if cell contains figure => change state and select this cell
			}
		}
	};

	const handleCastle = (king: Cell, rook: Cell) => {
		const color = king.figure?.color as Colors;

		if (rook.x === 0) {
			// left rook
			const newKingPosition = board.getCell(king.x - 2, king.y);
			rook.forceMove(board.getCell(king.x - 1, king.y));
			king.forceMove(newKingPosition);
			newKingPosition.figure?.color === Colors.WHITE
				? (board.whiteKing = newKingPosition)
				: (board.blackKing = newKingPosition);
		} else if (rook.x === 7) {
			// right rook
			const newKingPosition = board.getCell(king.x + 2, king.y);
			rook.forceMove(board.getCell(king.x + 1, king.y));
			king.forceMove(newKingPosition);
			newKingPosition.figure?.color === Colors.WHITE
				? (board.whiteKing = newKingPosition)
				: (board.blackKing = newKingPosition);
		}

		// lock castles for this color
		blockCastlesForColor(color);
	};

	const blockCastlesForColor = (color: Colors) => {
		board.blockCastlesForColor(color);
	};

	const highlightCells = (currentPlayerKing: Cell) => {
		board.highlightCells(selectedCell, currentPlayerKing);
		updateBoard();
	};

	const checkmateCheck = () => {
		const isCheckmated = board.checkmateCheck();
		if (isCheckmated) {
			store.setGameEnd();
		}
	};

	const castleActivityCheck = (from: Cell, to: Cell) => {
		board.castleActivityCheck(from, to);
	};

	const stalemateCheck = () => {
		if (currentPlayer) {
			return board.isGameStalemated(
				currentPlayer.color === Colors.WHITE ? (board.whiteKing as Cell) : (board.blackKing as Cell)
			);
		}
	};

	const updateBoard = () => {
		const newBoard = board.getCopyBoard();
		setBoard(newBoard);
	};

	const blockCells = () => {
		board.blockCells();
	};

	return (
		<>
			<StatusBar currentPlayerBadge={currentPlayerBadge} />

			<div className={css.board}>
				{board.cells.map((row, index) => (
					<React.Fragment key={index}>
						{row.map(cell => (
							<ChessCell
								cell={cell}
								key={cell.id}
								selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y ? true : false}
								click={handleClick}
							/>
						))}
					</React.Fragment>
				))}
			</div>
		</>
	);
});

export default ChessBoard;
