export default (function () {
  let canvas, ctx, gravity, ball
  function init () {
    canvas = document.getElementById('gameCanvas')
    ctx = canvas.getContext('2d')

    canvas.width = 500
    canvas.height = 500

    gravity = 0.20
    ball = {
      bounce: 1.0,
      radius: 30,
      x: canvas.width / 2,
      y: canvas.height / 2,
      velX: (Math.random() * 15 + 5) * (Math.floor(Math.random() * 2) || -1),
      velY: (Math.random() * 15 + 5) * (Math.floor(Math.random() * 2) || -1)
    }

    window.requestAnimationFrame(update)
  }

  function draw () {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.beginPath()
    ctx.fillStyle = 'red'
    ctx.arc(
      ball.x, ball.y,
      ball.radius,
      0, Math.PI * 2
    )
    ctx.fill()
  }

  function update () {
    window.requestAnimationFrame(update)

    if (ball.y + ball.radius >= canvas.height) {
      ball.velY *= -ball.bounce
      ball.y = canvas.height - ball.radius
    }
    if (ball.y - ball.radius <= 0) {
      ball.velY *= -ball.bounce
      ball.y = ball.radius
    }

    if (ball.x - ball.radius <= 0) {
      ball.velX *= -ball.bounce
      ball.x = ball.radius
    }
    if (ball.x + ball.radius >= canvas.width) {
      ball.velX *= -ball.bounce
      ball.x = canvas.width - ball.radius
    }
    if (ball.velX < 0.01 && ball.velX > -0.01) {
      ball.velX = 0
    }
    if (ball.velY < 0.01 && ball.velY > -0.01) {
      ball.velY = 0
    }

    ball.velY += gravity

    ball.x += ball.velX
    ball.y += ball.velY

    draw()
  }

  document.addEventListener('DOMContentLoaded', init)
})
