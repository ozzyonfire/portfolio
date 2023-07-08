'use client';

import { useEffect, useRef } from "react";

export default function BlockDrop() {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		import("@/block-drop/src/game").then(Game => {
			if (canvasRef.current) {

				const theGame = new Game.default({
					canvas: canvasRef.current,
				});
				theGame.start();

				// setup the controls
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


				canvasRef.current.addEventListener('touchstart', function (e) {
					const thirdScreenY = this.height / 3;
					let halfScreen = this.width / 2;
					if (e.changedTouches[0].clientY < thirdScreenY) {
						theGame.currentPiece.rotateCW();
						return;
					}

					if (e.changedTouches[0].clientX < halfScreen) {
						theGame.currentPiece.moveLeft();
					} else {
						theGame.currentPiece.moveRight();
					}
				});
			}
		});
	}, [canvasRef]);

	return (
		<div className="block-drop-container">
			<canvas ref={canvasRef} />
		</div>
	)
}