// board.js

import Player from "./player";
import Polyomino from "./polyomino";

const whiteBlock = new Image();
whiteBlock.src = './img/blocks/white-block.gif';

class Board {
	rows: number;
	cols: number;
	buffer: number;
	player: Player;
	grid: number[][];
	colours: any[][];
	height: number;
	width: number;
	animating: boolean;
	left: number;
	top: number;
	gridWidth: number;
	gridHeight: number;

	constructor(rows: number, cols: number, buffer: number, player: Player) {
		this.rows = rows;
		this.cols = cols;
		this.buffer = buffer;
		this.player = player;
		this.grid = new Array(rows);
		this.colours = new Array(rows);
		let height = window.innerHeight;
		this.height = height - height * 0.2; // 20% of the height
		this.width = this.height / ((this.rows - buffer) / this.cols);
		this.animating = false;
		this.left = 0;
		this.top = 0;
		this.gridWidth = this.width / this.cols;
		this.gridHeight = this.height / (this.rows - buffer);

		for (let i = 0; i < this.grid.length; i++) {
			this.grid[i] = new Array(cols).fill(0);
			this.colours[i] = new Array(cols).fill({
				r: 255,
				g: 255,
				b: 255,
				a: 1
			});
		}
	}

	print() {
		let line = '';
		for (let i = 0; i < this.grid.length; i++) {
			for (let j = 0; j < this.grid[i].length; j++) {
				line += '' + this.grid[i][j] + ' ';
			}
			line += '\n';
		}
		console.log(line);
	}

	addPolyomino(tetromino: Polyomino) {
		let r = tetromino.position.row;
		let c = tetromino.position.col;

		for (let i = 0; i < tetromino.piece.length; i++) {
			for (let j = 0; j < tetromino.piece[i].length; j++) {
				let fill = tetromino.piece[i][j];
				if (fill) {
					this.grid[i + r][j + c] = fill;
					this.colours[i + r][j + c] = tetromino.block.sprite;
				}
			}
		}
	}

	reset() {
		for (let i = 0; i < this.grid.length; i++) {
			this.grid[i].fill(0);
		}
	}

	getCoordinate(row: number, col: number) {
		let x = this.left + (col * this.gridWidth);
		let y = this.top + ((row - this.buffer) * this.gridHeight);
		return {
			x: x,
			y: y
		};
	}

	drawBlocks(ctx: CanvasRenderingContext2D) {
		for (let i = 0; i < this.grid.length; i++) {
			for (let j = 0; j < this.grid[0].length; j++) {
				let fill = this.grid[i][j];
				if (fill) {
					let coord = this.getCoordinate(i, j);
					if (fill == 2) {
						ctx.drawImage(whiteBlock, coord.x, coord.y, this.gridWidth, this.gridHeight);
					} else {
						ctx.drawImage(this.colours[i][j], coord.x, coord.y, this.gridWidth, this.gridHeight);
					}
				}
			}
		}
	}

	draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
		ctx.beginPath();
		this.left = canvas.scrollWidth / 2 - this.width / 2;
		let left = this.left;
		this.top = canvas.scrollHeight / 2 - this.height / 2;
		let top = this.top;
		let right = canvas.scrollWidth / 2 + this.width / 2;
		var bottom = canvas.scrollHeight / 2 + this.height / 2;

		ctx.moveTo(left, top);
		ctx.lineTo(right, top);
		ctx.lineTo(right, bottom);
		ctx.lineTo(left, bottom);
		ctx.lineTo(left, top);

		// draw the cols
		this.gridWidth = this.width / this.cols;
		this.gridHeight = this.height / (this.rows - this.buffer);
		for (let i = 0; i < this.cols; i++) {
			ctx.moveTo(left + this.gridWidth * i, top);
			ctx.lineTo(left + this.gridWidth * i, bottom);
		}

		// draw the rows
		for (let i = 0; i < this.rows - this.buffer; i++) {
			ctx.moveTo(left, top + this.gridHeight * i);
			ctx.lineTo(right, top + this.gridHeight * i);
		}

		ctx.strokeStyle = '#08B9C4';
		ctx.lineWidth = 2;
		ctx.shadowBlur = 0;
		ctx.stroke();
		this.drawBlocks(ctx);
	}

	checkLine(callback: Function) {
		let lines: number[] = []; // the index of the line to remove
		outer: for (let i = this.rows - 1; i > 0; i--) {
			for (let j = 0; j < this.cols; j++) {
				if (this.grid[i][j] === 0)
					continue outer;
			}
			// full line here
			lines.push(i);
			this.grid[i].fill(2);
		}
		if (lines.length > 0) {
			this.player.scoreLines(lines.length);
			let board = this;
			this.animating = true;
			setTimeout(function () {
				let lineCount = 0;
				lines.forEach(function (index) {
					index += lineCount;
					let row = board.grid.splice(index, 1)[0].fill(0);
					board.grid.unshift(row);
					let colourRow = board.colours.splice(index, 1)[0].fill(0);
					board.colours.unshift(colourRow);
					lineCount++;
				});
				board.animating = false;
				callback();
			}, 200);
		} else {
			callback();
		}
	}
}

export default Board;