class Point {
	constructor(x, y) {
		this.x = x
		this.y = y
	}
	diff(x, y) {
		return this.x !== x || this.y !== y
	}
	project(dx, dy, size = 5) {
		const { x, y } = this
		const line = []
		for (let i = 0; i < size; i++)
			line[i] = new Point(x + dx * i, y + dy * i)
		return line
	}
}
class Points extends Array {
	constructor(id) {
		super()
		this.id = id
	}
}
class Game {
	
	player = null // next player
	player1 = new Points('A')
	player2 = new Points('B')

	reset() {
		this.player1.length = 0
		this.player2.length = 0
		this.steps = 0
	}
	check() {
		for (let i of this.player) {
			const lines = [
				i.project(1, 0), // horizontal
				i.project(0, 1), // vertical
				i.project(1, 1), // diagonal
				i.project(-1, 1) // diagonal
			]
			const match = lines.find(line => {
				return line.every(({ x: ax, y: ay }) => {
					return this.player.some(({ x: bx, y: by }) => (ax == bx && ay == by))
				})
			})
			if (match) return match
		}
		return null
	}
	move(x, y) {
		if (this.player1.every(i => i.diff(x, y)) && this.player2.every(i => i.diff(x, y))) {
			this.player = this.player == this.player1 ? this.player2 : this.player1
			this.player.push(new Point(x, y))
			return true
		}
		return false
	}
}
