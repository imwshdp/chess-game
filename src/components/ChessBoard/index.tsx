import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from 'store';

import { clickHandler } from 'resources/helpers/chessBoardController';
import ChessCell from 'components/ChessCell';
import Colors from 'resources/models/Colors';
import Board from 'resources/models/Board';
import Cell from 'resources/models/Cell';

import StatusBar from 'components/StatusBar';
import css from './index.module.css';

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
		isGameStarted = store.gameStartStatus,
		aiStatus = store.aiStatus;

	const [selectedCell, setSelectedCell] = useState<Cell | null>(null); // selected cell state

	// HIGHLIGHTING
	useEffect(() => {
		if (board.blackKing && board.whiteKing) {
			const currentPlayerKing = currentPlayer?.color === Colors.WHITE ? board.whiteKing : board.blackKing;
			highlightCells(currentPlayerKing);
		}
	}, [selectedCell]);

	// GAME END
	useEffect(() => {
		if (isGameEnded) {
			setSelectedCell(null);
			blockCells();
		}
	}, [isGameEnded]);

	// GAME STALEMATE
	useEffect(() => {
		if (isGameStarted && stalemateCheck()) {
			store.setGameStalemate();
			store.setGameEnd();
		}

		// AI MOVE
		if (currentPlayer?.color === Colors.BLACK && aiStatus) {
			aiMove();
		}
	}, [currentPlayer]);

	useEffect(() => {
		if (!isGameStarted) {
			setSelectedCell(null);
		}
	}, [isGameStarted]);

	const aiMove = () => {
		const { selectedCell, cell } = board.aiMove();

		if (selectedCell === null && cell === null) {
			store.setGameEnd();
		} else {
			setTimeout(() => {
				setSelectedCell(selectedCell);
			}, 1000);

			setTimeout(() => {
				clickHandler({
					cell,
					board,
					selectedCell,
					setSelectedCell,
				});

				updateBoard();

				checkmateCheck(); // checkmate check
				swapPlayer(); // swap player
			}, 2000);
		}
	};

	const handleClick = (cell: Cell) => {
		// game start by first click (when game was restarted, but not started yet)
		if (!isGameStarted && !isGameEnded && cell.figure?.color === Colors.WHITE) {
			store.startGame();
		}

		// MOVING TO CELL
		if (selectedCell && selectedCell !== cell && cell.available) {
			clickHandler({
				cell,
				board,
				selectedCell,
				setSelectedCell,
			});

			checkmateCheck(); // checkmate check
			swapPlayer(); // swap player
		} else {
			// PICKING CELL
			if (cell.blocked) return;

			if (cell.figure?.color === currentPlayer?.color) {
				setSelectedCell(cell); // if cell contains figure => change state and select this cell
			}
		}
	};

	// check checkmate
	const checkmateCheck = () => {
		const isCheckmated = board.checkmateCheck();
		if (isCheckmated) {
			store.setGameEnd();
		}
	};

	const highlightCells = (currentPlayerKing: Cell) => {
		board.highlightCells(selectedCell, currentPlayerKing);
		updateBoard();
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

		console.log(newBoard);
	};

	const blockCells = () => board.blockCells();

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
