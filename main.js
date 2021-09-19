const game = new Game
const grid = 40
const rows = Math.floor(window.height / grid)
const cols = Math.floor(window.width / grid)
const ctx = board.getContext('2d')
const w = board.width = cols * grid
const h = board.height = rows * grid

addEventListener('load', clearBoard)
addEventListener('click', handleClick)

function handleClick(e) {
	if (game.ended) {
		game.reset()
		clearBoard()
		return
	}
	const x = Math.floor(e.layerX / grid)
	const y = Math.floor(e.layerY / grid)

	if (game.move(x, y)) {
		switch (game.player) {
			case 'o': drawCircle(x, y); break
			case 'x': drawCross(x, y); break
		}
		if (game.ended) drawLine(game.ended);
	}
}

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
