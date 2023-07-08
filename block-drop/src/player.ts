
class Player {
	score: number;
	level: number;
	lines: number;

	constructor() {
		this.score = 0;
		this.level = 0;
		this.lines = 0;
	}

	gravity() {
		let lines = this.lines % 10;
		if (this.level == 0) {
			return 786 - (lines * 5);
		} else if (this.level == 1) {
			return 688 - (lines * 5);
		} else if (this.level == 2) {
			return 608 - (lines * 5);
		} else if (this.level == 3) {
			return 528 - (lines * 5);
		} else if (this.level == 4) {
			return 448 - (lines * 4);
		} else if (this.level == 5) {
			return 368 - (lines * 4);
		} else if (this.level == 6) {
			return 288 - (lines * 4);
		} else if (this.level == 7) {
			return 208 - (lines * 4);
		} else if (this.level == 8) {
			return 180 - (lines * 3);
		} else {
			return 100;
		}
	}

	scoreLines(lines: number) {
		this.lines += lines;
		this.level = Math.floor(this.lines / 10);
		switch (lines) {
			case 1:
				this.score += 100 * this.level;
				break;
			case 2:
				this.score += 300 * this.level;
				break;
			case 3:
				this.score += 500 * this.level;
				break;
			case 4:
				this.score += 800 * this.level;
				break;
		}
	}
}

export default Player;