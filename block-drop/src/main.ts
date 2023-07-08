import Game from './game';

document.addEventListener('DOMContentLoaded', function () {
	let canvas = document.getElementById('canvas') as HTMLCanvasElement;
	if (!canvas) {
		throw new Error('Could not get canvas element');
	}

	const theGame = new Game({
		canvas: canvas,
	});

	theGame.start();

	window.addEventListener('keydown', function (e) {
		if (e.key == 'ArrowLeft' || e.key == 'a') { // left
			theGame.currentPiece.moveLeft();
		} else if (e.key == 'ArrowRight' || e.key == 'd') { // right
			theGame.currentPiece.moveRight();
		} else if (e.key == 'ArrowDown' || e.key == 's') { // down
			theGame.currentPiece.softDrop();
		} else if (e.key == 'z') { // z
			theGame.currentPiece.rotateCCW();
		} else if (e.key == 'x') { // x
			theGame.currentPiece.rotateCW();
		} else if (e.key == 'ArrowUp' || e.key == 'w') {  // up
			theGame.currentPiece.hardDrop();
		} else if (e.key == 'Escape') {
			theGame.togglePause();
		}
	});
});


// global.game = theGame;

// update();

// $(window).on('keydown', function(e) {
// 	if (e.keyCode === 37) { // left
// 		theGame.currentPiece.moveLeft();
// 	} else if (e.keyCode === 39) { // right
// 		theGame.currentPiece.moveRight();
// 	} else if (e.keyCode === 40) { // down
// 		theGame.currentPiece.softDrop();
// 	} else if (e.keyCode === 90) { // z
// 		theGame.currentPiece.rotateCCW();
// 	} else if (e.keyCode === 88) { // x
// 		theGame.currentPiece.rotateCW();
// 	} else if (e.keyCode === 38) {  // up
// 		theGame.currentPiece.hardDrop();
// 	}
// });

// $('#leftButton').click(e => {
// 	theGame.currentPiece.moveLeft();
// });

// $('#rightButton').click(e => {
// 	theGame.currentPiece.moveRight();
// });

// $('#upButton').click(e => {
// 	theGame.currentPiece.hardDrop();
// });

// $('#downButton').click(e => {
// 	theGame.currentPiece.softDrop();
// });

// $('#rotateCW').click(e => {
// 	theGame.currentPiece.rotateCW();
// });

// $('#rotateCCW').click(e => {
// 	theGame.currentPiece.rotateCCW();
// });

// $('#canvas').on('touchstart', function(e) {
// 	let halfScreen = window.innerWidth / 2;
// 	if (e.changedTouches[0].clientX < halfScreen) {
// 		theGame.currentPiece.moveLeft();
// 	} else {
// 		theGame.currentPiece.moveRight();
// 	}
// });