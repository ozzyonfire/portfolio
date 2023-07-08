
import * as blockData from './blocks';

function newBag() {
	let bag = [];
	let tetrominos = [
		blockData.i,
		blockData.t,
		blockData.j,
		blockData.l,
		blockData.o,
		blockData.z,
		blockData.s
	];
	while (tetrominos.length > 0) {
		let index = Math.floor(Math.random() * tetrominos.length);
		bag.push(tetrominos.splice(index, 1)[0]);
	}
	return bag;
}

export default newBag;