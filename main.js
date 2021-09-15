addEventListener('load', () => {
	const game = new Game
	const rows = 20
	const cols = 20
	const grid = 20
	const ctx = board.getContext('2d')
	const w = board.width = cols * grid
	const h = board.height = rows * grid

	function clearBoard() {
		ctx.clearRect(0, 0, w, h)
		ctx.strokeStyle = '#ddd'
		ctx.lineWidth = 1
		for (let c = 1; c < cols; c++) {
			ctx.beginPath()
			ctx.moveTo(c * grid, 0)
			ctx.lineTo(c * grid, h)
			ctx.stroke()
		}
		for (let r = 1; r < rows; r++) {
			ctx.beginPath()
			ctx.moveTo(0, r * grid)
			ctx.lineTo(w, r * grid)
			ctx.stroke()
		}
	}
	function drawCircle(x, y) {
		const cx = x * grid + grid / 2
		const cy = y * grid + grid / 2
		ctx.strokeStyle = 'blue'
		ctx.lineWidth = 3
		ctx.beginPath()
		ctx.arc(cx, cy, grid / 4, 0, Math.PI * 2)
		ctx.stroke()
	}
	function drawCross(x, y) {
		const cx = x * grid + grid / 2
		const cy = y * grid + grid / 2
		const cw = grid / 4
		ctx.strokeStyle = 'red'
		ctx.lineWidth = 3
		ctx.beginPath()
		ctx.moveTo(cx - cw, cy - cw)
		ctx.lineTo(cx + cw, cy + cw)
		ctx.moveTo(cx - cw, cy + cw)
		ctx.lineTo(cx + cw, cy - cw)
		ctx.stroke()
	}
	function drawLine(line) {
		const { x: x1, y: y1 } = line[0]
		const { x: x2, y: y2 } = line[line.length - 1]
		const cx1 = x1 * grid + grid / 2
		const cy1 = y1 * grid + grid / 2
		const cx2 = x2 * grid + grid / 2
		const cy2 = y2 * grid + grid / 2
		ctx.strokeStyle = 'rgba(0,0,0,0.5)'
		ctx.lineWidth = grid / 2
		ctx.lineCap = 'round'
		ctx.beginPath()
		ctx.moveTo(cx1, cy1)
		ctx.lineTo(cx2, cy2)
		ctx.stroke()
	}

	clearBoard()

	let ended = false

	board.addEventListener('click', e => {
		if (ended) {
			ended = false
			clearBoard()
			return
		}
		const x = Math.floor(e.layerX / grid)
		const y = Math.floor(e.layerY / grid)
		console.log(x)
		if (game.move(x, y)) {
			switch (game.playerID) {
				case 'A': drawCircle(x, y); break
				case 'B': drawCross(x, y); break
			}
			const line = game.checkMove()
			if (line) {
				ended = true
				drawLine(line);
				console.log('PLAYER', game.playerID, 'won')
			}
		}
	})
})
