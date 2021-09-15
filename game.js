const P = (x, y) => ({ x, y })
class Game {
	player1 = []
	player2 = []
	steps = 0

	// get the array of current player
	get player() {
		return this.steps % 2 ? this.player1 : this.player2
	}
	get playerID() {
		return this.steps % 2 ? 'A' : 'B'
	}
	reset() {
		this.player1.length = 0
		this.player2.length = 0
		this.steps = 0
	}
	getLineArray(x, y, dx, dy, size) {
		const line = []
		for (let i = 0; i < size; i++)
			line[i] = P(x + dx * i, y + dy * i)
		return line
	}
	checkLineArray(a, b) {
		return a.every(({ x: ax, y: ay }) => {
			return b.some(({ x: bx, y: by }) => (ax == bx && ay == by))
		})
	}
	// Check there is five move in a row
	checkMove() {
		const player = this.player
		for (let move of player) {
			const result = [
				this.getLineArray(move.x, move.y, 1, 0, 5), // horizontal
				this.getLineArray(move.x, move.y, 0, 1, 5), // vertical
				this.getLineArray(move.x, move.y, 1, 1, 5), // diagonal
				this.getLineArray(move.x, move.y, -1, 1, 5) // diagonal
			].find(line => this.checkLineArray(line, player))
			if (result) {
				this.reset()
				return result
			}
		}
	}
	canMove(x, y) {
		return this.player1.some(move => (move.x === x && move.y === y)) ||
			this.player2.some(move => (move.x === x && move.y === y)) ? false : true
	}
	move(x, y) {
		if (this.canMove(x, y)) {
			this.steps++
			this.player.push(P(x, y))
			// console.info('PLAYER', this.playerID, 'move', x, y)
			return true
		}
		// console.error('PLAYER', this.playerID, 'move', x, y)
		return false
	}
}
