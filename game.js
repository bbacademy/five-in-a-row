class Entry {
	constructor(x, y) {
		this.x = x
		this.y = y
	}
	isEqual(x, y) {
		return this.x === x && this.y === y
	}
	project(dx, dy, size = 5) {
		const { x, y } = this
		const line = []
		for (let i = 0; i < size; i++)
			line[i] = new Entry(x + dx * i, y + dy * i)
		return line
	}
}
class Entries extends Array {
	constructor(id) {
		super()
		this.id = id
	}
}
class Game {
	ended = null
	moves = [
		new Entries('x'),
		new Entries('o')
	]
	get player() {
		return this.moves[0].id
	}
	reset() {
		this.ended = null
		this.moves.forEach(d => (d.length = 0))
	}
	check() {
		for (let i of this.moves[0]) {
			const lines = [
				i.project(1, 0), // horizontal
				i.project(0, 1), // vertical
				i.project(1, 1), // diagonal
				i.project(-1, 1) // diagonal
			]
			this.ended = lines.find(line => {
				return line.every(({ x: ax, y: ay }) => {
					return this.moves[0].some(({ x: bx, y: by }) => (ax == bx && ay == by))
				})
			})
			if (this.ended) break
		}
	}
	move(x, y) {
		if (this.moves.every(a => a.every(b => !b.isEqual(x, y)))) {
			this.moves.push(this.moves.shift())
			this.moves[0].push(new Entry(x, y))
			this.check()
			return true
		}
		return false
	}
}
