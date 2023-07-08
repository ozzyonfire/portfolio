import _, { DebouncedFunc } from 'lodash';
import Player from './player';
import { Block } from './blocks';
import Board from './board';

enum State {
	NORTH,
	EAST,
	SOUTH,
	WEST
}

class Polyomino {
	block: Block;
	piece: number[][];
	colour: {
		r: number,
		g: number,
		b: number,
		a: number
	};
	player?: Player;
	position: {
		row: number;
		col: number;
	}
	landed: boolean;
	locked: boolean;
	board: Board;
	state: State;

	constructor(block: Block, board: Board, player?: Player) {
		this.block = block;
		this.piece = block.piece;
		this.colour = block.colour;
		this.player = player;
		this.position = {
			row: board.buffer - this.piece.length,
			col: Math.floor(board.cols / 2 - this.piece[0].length / 2)
		};
		this.landed = false;
		this.locked = false;
		this.board = board;
		this.state = State.NORTH;
	}

	lockedTimer = _.debounce(() => {
		if (!this.drop() && this.landed) {
			this.locked = true;
		}
	}, 384); // 24 frame delay

	drop() {
		let tempPosition = {
			row: this.position.row + 1,
			col: this.position.col,
		};
		let success = this.move(tempPosition);
		if (this.player) { // not the ghost
			tempPosition = {
				row: this.position.row + 1,
				col: this.position.col
			};
			this.checkCollision(this.piece, tempPosition);
		}
		return success;
	}

	rotateCCW() {
		let tempPiece = rotatePieceCCW(this.piece);
		let rotated = false;
		if (this.checkCollision(tempPiece, this.position)) { // normal rotation
			this.piece = tempPiece;
			rotated = true;
		} else {
			rotated = this.wallKick(1, tempPiece, false); // wall kicks
		}

		if (rotated) {
			switch (this.state) {
				case State.NORTH:
					this.state = State.WEST;
					break;
				case State.EAST:
					this.state = State.NORTH;
					break;
				case State.SOUTH:
					this.state = State.EAST;
					break;
				case State.WEST:
					this.state = State.SOUTH;
					break;
			}
		}
	}

	rotateCW() {
		let tempPiece = rotatePieceCW(this.piece);
		let rotated = false;
		if (this.checkCollision(tempPiece, this.position)) { // normal rotatation
			this.piece = tempPiece;
			rotated = true;
		} else {
			rotated = this.wallKick(1, tempPiece, true); // wall kicks
		}

		if (rotated) {
			switch (this.state) {
				case State.NORTH:
					this.state = State.EAST;
					break;
				case State.EAST:
					this.state = State.SOUTH;
					break;
				case State.SOUTH:
					this.state = State.WEST;
					break;
				case State.WEST:
					this.state = State.NORTH;
					break;
			}
		}
	}

	move(newPosition: {
		row: number;
		col: number;
	}) {
		if (this.checkCollision(this.piece, newPosition)) {
			this.position = newPosition;
			return true; // successfull move
		} else {
			return false;
		}
	}

	moveRight() {
		let tempPosition = {
			row: this.position.row,
			col: this.position.col + 1
		};
		this.move(tempPosition);
	}

	moveLeft() {
		let tempPosition = {
			row: this.position.row,
			col: this.position.col - 1
		};
		this.move(tempPosition);
	}

	softDrop() {
		if (this.drop() && this.player) {
			this.player.score += 1;
		}
	}

	hardDrop() {
		while (this.drop()) {
			if (this.player) // not a ghost
				this.player.score += 2; // 2 points for every line that you hard drop
		}
		this.locked = true;
	}

	wallKick(testNumber: number, tempPiece: number[][], clockwise: boolean): boolean {
		if (testNumber > 4) {
			return false;
		}
		let tempPosition = {
			row: this.position.row,
			col: this.position.col
		};
		switch (this.state) {
			case State.NORTH:
				switch (testNumber) {
					case 1:
						if (clockwise) // 0 >> 1
							tempPosition.col -= 1;
						else // 0 >> 3
							tempPosition.col += 1;
						break;
					case 2:
						if (clockwise) { // 0 >> 1
							tempPosition.col -= 1;
							tempPosition.row += 1;
						} else { // 0 >> 3
							tempPosition.row += 1;
							tempPosition.col += 1;
						}
						break;
					case 3:
						tempPosition.row -= 2; // 0 >> 1 & 0 >> 3
						break;
					case 4:
						if (clockwise) { // 0 >> 1
							tempPosition.col -= 1;
							tempPosition.row -= 2;
						} else { // 0 >> 3
							tempPosition.col += 1;
							tempPosition.row -= 2;
						}
						break;
				}
				break;
			case State.EAST:
				switch (testNumber) {
					case 1: // 1 >> 2 & 1 >> 0
						tempPosition.col += 1;
						break;
					case 2: // 1 >> 2 & 1 >> 0
						tempPosition.col += 1;
						tempPosition.row -= 1;
						break;
					case 3:
						tempPosition.row += 2; // 1 >> 2 & 1 >> 0
						break;
					case 4:
						tempPosition.col += 1;
						tempPosition.row += 2;
						break;
				}
				break;
			case State.SOUTH:
				switch (testNumber) {
					case 1:
						if (clockwise) { // 2 >> 3
							tempPosition.col += 1;
						} else { // 2 >> 1
							tempPosition.col -= 1;
						}
						break;
					case 2:
						if (clockwise) { // 2 >> 3
							tempPosition.col += 1;
							tempPosition.row += 1;
						} else { // 2 >> 1
							tempPosition.col -= 1;
							tempPosition.row += 1;
						}
						break;
					case 3: // 2 >> 3 & 2 >> 1
						tempPosition.row -= 2;
						break;
					case 4:
						if (clockwise) { // 2 >> 3
							tempPosition.col += 1;
							tempPosition.row -= 2;
						} else { // 2 >> 1
							tempPosition.col -= 1;
							tempPosition.row -= 2;
						}
						break;
				}
				break;
			case State.WEST:
				switch (testNumber) {
					case 1:
						tempPosition.col -= 1;
						break;
					case 2:
						tempPosition.col -= 1;
						tempPosition.row -= 1;
						break;
					case 3:
						tempPosition.row -= 2;
						break;
					case 4:
						tempPosition.col -= 1;
						tempPosition.row += 2;
						break;
				}
				break;
		}
		if (this.checkCollision(tempPiece, tempPosition)) {
			this.position = tempPosition;
			this.piece = tempPiece;
			return true;
		} else {
			return this.wallKick(++testNumber, tempPiece, clockwise);
		}
	}

	checkCollision(piece: number[][], position: {
		row: number,
		col: number
	}) {
		for (let i = 0; i < piece.length; i++) {
			for (let j = 0; j < piece[i].length; j++) {
				if (piece[i][j]) {
					let boardRow = position.row + i;
					let boardCol = position.col + j;
					if (boardRow >= this.board.rows || this.board.grid[boardRow][boardCol]) { // landed
						this.landed = true;
						if (this.player) // not the ghost piece
							this.lockedTimer();
						return false;
					} else if (boardCol < 0 || boardCol >= this.board.cols) {
						return false; // off the board
					}
				}
			}
		}
		this.landed = false;
		if (this.player) // not the ghost
			this.lockedTimer.cancel();
		return true;
	}

	drawGhost(ctx: CanvasRenderingContext2D) {
		const ghost = new Polyomino(this.block, this.board);
		ghost.piece = this.piece;
		ghost.position = {
			row: this.position.row,
			col: this.position.col
		};
		ghost.colour.r += 20;
		ghost.colour.g += 20;
		ghost.colour.b += 20;
		ghost.colour.a = 1;
		ghost.hardDrop();
		ghost.landed = false;
		ghost.drawOutline(ctx);
	}

	drawOutline(ctx: CanvasRenderingContext2D) {
		for (let i = 0; i < this.piece.length; i++) {
			for (let j = 0; j < this.piece[i].length; j++) {
				let fill = this.piece[i][j];
				if (this.position.row + i < this.board.buffer) {
					fill = 0;
				}
				if (fill) {
					let coord = this.board.getCoordinate(this.position.row + i, this.position.col + j);
					ctx.strokeStyle = getRGBA(this.colour);
					ctx.shadowBlur = 15;
					ctx.shadowColor = getRGBA(this.colour);
					ctx.lineWidth = 4;
					ctx.lineJoin = 'round';
					ctx.strokeRect(coord.x, coord.y, this.board.gridWidth, this.board.gridHeight);
				}
			}
		}
	}

	draw(ctx: CanvasRenderingContext2D) {
		for (let i = 0; i < this.piece.length; i++) {
			for (let j = 0; j < this.piece[i].length; j++) {
				let fill = this.piece[i][j];
				if (this.position.row + i < this.board.buffer) {
					fill = 0;
				}
				if (fill) {
					let coord = this.board.getCoordinate(this.position.row + i, this.position.col + j);
					ctx.drawImage(this.block.sprite, coord.x, coord.y, this.board.gridWidth, this.board.gridHeight);
				}
			}
		}
	}


}

function getRGBA(colour: {
	r: number,
	g: number,
	b: number,
	a: number
}) {
	return 'rgba(' + colour.r + ',' + colour.g + ',' + colour.b + ',' + colour.a + ')';
}

function rotatePieceCW(piece: number[][]) {
	let tempPiece = new Array(piece[0].length);
	for (let i = 0; i < tempPiece.length; i++) {
		tempPiece[i] = new Array(piece.length);
		for (let j = 0; j < tempPiece[i].length; j++) {
			let k = piece.length - 1 - j;
			tempPiece[i][j] = piece[k][i];
		}
	}
	return tempPiece;
}

function rotatePieceCCW(piece: number[][]) {
	let tempPiece = new Array(piece[0].length);
	for (let i = 0; i < tempPiece.length; i++) {
		tempPiece[i] = new Array(piece.length);
		for (let j = 0; j < tempPiece[i].length; j++) {
			let k = piece[j].length - 1 - i;
			tempPiece[i][j] = piece[j][k];
		}
	}
	return tempPiece;
}

export default Polyomino;