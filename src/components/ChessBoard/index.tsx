import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from 'store';

import { FigureName } from 'resources/models/figures/Figure';
import ChessCell from 'components/ChessCell';
import Colors from 'resources/models/Colors';
import Board from 'resources/models/Board';
import Cell from 'resources/models/Cell';

interface BoardProps {
	board: Board;
	setBoard: (board: Board) => void;
	swapPlayer: () => void;
}

const ChessBoard: React.FC<BoardProps> = observer(({ board, setBoard, swapPlayer }) => {
	const store = useStore();
	const currentPlayer = store.currentPlayer;
	const isGameEnded = store.gameEndStatus;
	const isTimeEnded = store.timeEndStatus;
	const isGameStarted = store.gameStartStatus;

	console.log('store :>> ', store);

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
		if (isGameEnded || isTimeEnded) {
			setSelectedCell(null);
			blockCells();
			showWinner();
		}
	}, [isGameEnded, isTimeEnded]);

	// TODO modal
	const showWinner = () => {
		const colorOfWinner = currentPlayer?.color === Colors.WHITE ? 'чёрным' : 'белым';
		setTimeout(() => window.alert(`Победа за ${colorOfWinner} игроком!`));
	};

	const handleClick = (cell: Cell) => {
		// game start by first click (when game was restarted, but not started yet)
		if (!isGameStarted && !isGameEnded && !isGameEnded && cell.figure?.color === Colors.WHITE) {
			store.startGame();
		}

		// MOVING TO CELL
		if (selectedCell && selectedCell !== cell && cell.available) {
			// check state rewriting for kings to false
			if (!!board.whiteKing && board.whiteKing.figure) {
				board.whiteKing.figure.checked = false;
			}
			if (!!board.blackKing && board.blackKing.figure) {
				board.blackKing.figure.checked = false;
			}
			if (selectedCell.figure?.name === FigureName.KING) {
				selectedCell.figure.color === Colors.WHITE ? (board.whiteKing = cell) : (board.blackKing = cell);
			}
			selectedCell.moveFigure(cell);
			setSelectedCell(null);

			checkmateCheck();

			swapPlayer(); // swap player
		} else {
			// PICKING CELL
			if (cell.blocked) return;

			if (cell.figure?.color === currentPlayer?.color) {
				setSelectedCell(cell); // if cell contains figure => change state and select this cell
			}
		}
	};

	const highlightCells = (currentPlayerKing: Cell) => {
		board.highlightCells(selectedCell, currentPlayerKing);
		updateBoard();
	};

	const checkmateCheck = () => {
		const isCheckmated = board.checkmateCheck();
		if (isCheckmated) {
			store.setGameEnded();
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
			<h3>Сейчас ходит {currentPlayer?.color === Colors.WHITE ? 'белый' : 'чёрный'} игрок</h3>
			<div className='board'>
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
