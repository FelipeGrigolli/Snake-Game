const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const box = 20;
let snake = [{x: 200, y: 200}];
let food = {x: 0, y: 0};
let dx = 0;
let dy = 0;
let score = 0;
let gameLoop;

function drawSnake() {
  ctx.fillStyle = '#008000';
  snake.forEach(segment => {
    ctx.fillRect(segment.x, segment.y, box, box);
  });
}

function drawFood() {
  ctx.fillStyle = '#ff0000';
  ctx.fillRect(food.x, food.y, box, box);
}

function moveSnake() {
  const head = {x: snake[0].x + dx, y: snake[0].y + dy};
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    generateFood();
  } else {
    snake.pop();
  }
}

function generateFood() {
  let foodX;
  let foodY;
  do {
    foodX = Math.floor(Math.random() * (canvas.width / box)) * box;
    foodY = Math.floor(Math.random() * (canvas.height / box)) * box;
  } while (snake.some(segment => segment.x === foodX && segment.y === foodY) || checkCollision(foodX, foodY));

  food.x = foodX;
  food.y = foodY;
}

function draw() {
  const nextX = snake[0].x + dx;
  const nextY = snake[0].y + dy;

  if (nextX < 0 || nextX + box >= canvas.width || nextY < 0 || nextY + box >= canvas.height || checkCollision(nextX, nextY)) {
    clearInterval(gameLoop);
    alert('Game Over! Your score is ' + score);
    window.location.reload();
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSnake();
  drawFood();

  ctx.fillStyle = '#f12121';
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, 10, 25);
  
  moveSnake();
}

function checkCollision(x, y) {

  for (let i = 1; i < snake.length; i++) {
    if (x === snake[i].x && y === snake[i].y) {
      return true;
    }
  }
  
  if (x < 0 || x + box >= canvas.width || y < 0 || y + box >= canvas.height) {
    return true;
  }
  
  return false;
}

function changeDirection(event) {
  const keyPressed = event.keyCode;
  if (keyPressed === 37 && dx === 0) {
    dx = -box;
    dy = 0;
  } else if (keyPressed === 38 && dy === 0) {
    dx = 0;
    dy = -box;
  } else if (keyPressed === 39 && dx === 0) {
    dx = box;
    dy = 0;
  } else if (keyPressed === 40 && dy === 0) {
    dx = 0;
    dy = box;
  }
}

generateFood();
gameLoop = setInterval(draw, 100);
document.addEventListener('keydown', changeDirection);
