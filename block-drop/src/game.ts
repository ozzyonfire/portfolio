import Player from './player';
import Polyomino from './polyomino';
import Board from './board';
import newBag from './randomizer';
import { Block } from './blocks';

interface GameOptions {
	score?: HTMLSpanElement
	lines?: HTMLSpanElement
	level?: HTMLSpanElement
	canvas: HTMLCanvasElement
}

enum GameState {
	PLAYING,
	PAUSED,
	GAMEOVER
}

class Game {
	player: Player;
	board: Board;
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	bag: Block[];
	currentPiece: Polyomino;
	lastUpdate: number;
	gravityTimer: number;
	options: GameOptions;
	gameState: GameState;

	constructor(options: GameOptions) {
		this.player = new Player();
		this.options = options;
		this.board = new Board(25, 10, 5, this.player);
		this.canvas = options.canvas;
		this.canvas.width = this.board.width + 10; // 10 pixel border
		this.canvas.height = this.board.height + 10;
		const context = this.canvas.getContext('2d');
		if (!context) {
			throw new Error('Could not get canvas context');
		}
		this.ctx = context;
		this.bag = [];
		this.lastUpdate = 0;
		this.gravityTimer = 0;
		this.currentPiece = this.getNextPolyomino();
		this.gameState = GameState.PLAYING;
	}

	getNextPolyomino() {
		if (this.bag.length == 0) {
			this.bag = newBag();
		}
		let tetromino = this.bag.pop();
		if (!tetromino) {
			throw new Error('Could not get tetromino from bag');
		}
		return new Polyomino(tetromino, this.board, this.player);
	}

	grabNextPiece() {
		this.currentPiece = this.getNextPolyomino();
	}

	// UPDATES AND RENDERING
	gameLoop(now: number) {
		if (!this.lastUpdate) {
			this.lastUpdate = now;
		}
		let deltaTime = now - this.lastUpdate;
		this.lastUpdate = now;
		if (this.gameState == GameState.PLAYING) {
			this.gameUpdate(deltaTime);
		}
		this.renderUpdate();
	}

	gameUpdate(deltaTime: number) {
		if (deltaTime)
			this.gravityTimer += deltaTime;
		if (this.gravityTimer >= this.player.gravity()) {
			if (!this.currentPiece.landed)
				this.currentPiece.drop();
			this.gravityTimer = 0;
		}
		if (this.currentPiece.locked && !this.board.animating) {
			this.board.addPolyomino(this.currentPiece);
			let game = this;
			this.board.checkLine(function () {
				game.grabNextPiece();
			});
		}
		this.updateScore();
	}

	updateScore() {
		if (this.options.score) {
			this.options.score.textContent = (this.player.score).toString();
		}
		if (this.options.lines) {
			this.options.lines.textContent = (this.player.lines).toString();
		}
		if (this.options.level) {
			this.options.level.textContent = (this.player.level).toString();
		}
	}

	renderUpdate() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.board.draw(this.ctx, this.canvas);
		this.currentPiece.draw(this.ctx);
		this.currentPiece.drawGhost(this.ctx);
	}

	start() {
		const update: FrameRequestCallback = (now) => {
			requestAnimationFrame(update);
			this.gameLoop(now);
		}

		console.log('starting game loop');
		update(0);
		this.gameState = GameState.PLAYING;
	}

	togglePause() {
		if (this.gameState == GameState.PAUSED) {
			this.gameState = GameState.PLAYING;
		} else if (this.gameState == GameState.PLAYING) {
			this.gameState = GameState.PAUSED;
		}
	}
}

export default Game;