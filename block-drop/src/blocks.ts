const blueBlock = new Image();
blueBlock.src = './img/blocks/blue-block.gif';
const greenBlock = new Image();
greenBlock.src = './img/blocks/green-block.gif';
const cyanBlock = new Image();
cyanBlock.src = './img/blocks/cyan-block.gif';
const purpleBlock = new Image();
purpleBlock.src = './img/blocks/purple-block.gif';
const orangeBlock = new Image();
orangeBlock.src = './img/blocks/orange-block.gif';
const yellowBlock = new Image();
yellowBlock.src = './img/blocks/yellow-block.gif';
const redBlock = new Image();
redBlock.src = './img/blocks/red-block.gif';

export interface Block {
	piece: number[][];
	colour: {
		r: number,
		g: number,
		b: number,
		a: number
	},
	sprite: HTMLImageElement
}

// define the pieces
const i: Block = {
	piece: [[0, 0, 0, 0],
	[1, 1, 1, 1],
	[0, 0, 0, 0],
	[0, 0, 0, 0]],
	colour: {
		r: 84,
		g: 201,
		b: 234,
		a: 1
	},
	sprite: cyanBlock
};

const t: Block = {
	piece: [[0, 1, 0],
	[1, 1, 1],
	[0, 0, 0]],
	colour: {
		r: 165,
		g: 121,
		b: 182,
		a: 1
	},
	sprite: purpleBlock
};

const j: Block = {
	piece: [[1, 0, 0],
	[1, 1, 1],
	[0, 0, 0]],
	colour: {
		r: 66,
		g: 157,
		b: 214,
		a: 1
	},
	sprite: blueBlock
};

const l: Block = {
	piece: [[0, 0, 1],
	[1, 1, 1],
	[0, 0, 0]],
	colour: {
		r: 246,
		g: 138,
		b: 33,
		a: 1
	},
	sprite: orangeBlock
};

const o: Block = {
	piece: [[1, 1],
	[1, 1]],
	colour: {
		r: 252,
		g: 227,
		b: 85,
		a: 1
	},
	sprite: yellowBlock
};

const s: Block = {
	piece: [[0, 1, 1],
	[1, 1, 0],
	[0, 0, 0]],
	colour: {
		r: 104,
		g: 109,
		b: 69,
		a: 1
	},
	sprite: greenBlock
};

const z: Block = {
	piece: [[1, 1, 0],
	[0, 1, 1],
	[0, 0, 0]],
	colour: {
		r: 237,
		g: 43,
		b: 62,
		a: 1
	},
	sprite: redBlock
};

export {
	t,
	i,
	j,
	l,
	s,
	z,
	o
}