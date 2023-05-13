import { Figure, FigureName } from './Figure';
import Cell from 'resources/models/Cell';
import Colors from 'resources/models/Colors';

import blackLogo from 'assets/black-pawn.png';
import whiteLogo from 'assets/white-pawn.png';

export default class Pawn extends Figure {
	isFirstStep: boolean = true;

	constructor(color: Colors, cell: Cell) {
		super(color, cell);
		this.name = FigureName.PAWN;
		this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
	}

	canMove(target: Cell): boolean {
		if (!super.canMove(target)) {
			return false;
		}

		// pawn possible moves and directions depending on the color
		const direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1;
		const firstStepDirection = this.cell.figure?.color === Colors.BLACK ? 2 : -2;

		// moving behaviour

		// if pawn want to move +1 OR ( this is pawn's first step AND pawn wanna move +2 )
		// AND X coords of cell and target are equal
		// AND target cell is empty
		if (
			(target.y === this.cell.y + direction || (this.isFirstStep && target.y === this.cell.y + firstStepDirection)) &&
			target.x === this.cell.x &&
			this.cell.board.getCell(target.x, target.y).isEmpty()
		) {
			return true;
		}

		// attacking behaviour

		// if target Y coord = cell Y +/- 1 AND target X coord = +- X cell coord
		// AND on target cell is staying enemy figure
		if (
			target.y === this.cell.y + direction &&
			(target.x === this.cell.x + 1 || target.x === this.cell.x - 1) &&
			this.cell.isEnemy(target)
		) {
			return true;
		}

		return false;
	}

	moveFigure(target: Cell) {
		super.moveFigure(target);
		this.isFirstStep = false;
	}
}
