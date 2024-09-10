const canvas = document.getElementById('jogo');
const ctx = canvas.getContext('2d');
const cellSize = 20;
let snakeHead = { x: 10, y: 10 };
let food = { x: 15, y: 15 };
let velocityX = 0;
let velocityY = 0;
let score = parseInt(localStorage.getItem('highScore') || '0');
updateScore();
const snake = [{ x: 10, y: 10 }];
function gameLoop() {
    update();
    draw();
    setTimeout(gameLoop, 100);
}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#FF0000';
    ctx.fillRect(food.x * cellSize, food.y * cellSize, cellSize, cellSize);

    ctx.fillStyle = '#000000';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * cellSize, segment.y * cellSize, cellSize, cellSize);
    });
}
function update() {
    snakeHead.x += velocityX;
    snakeHead.y += velocityY;

    if (snakeHead.x < 0 || snakeHead.x >= canvas.width / cellSize ||
        snakeHead.y < 0 || snakeHead.y >= canvas.height / cellSize) {
        resetGame();
    }
    if (snakeHead.x === food.x && snakeHead.y === food.y) {
        food.x = Math.floor(Math.random() * (canvas.width / cellSize));
        food.y = Math.floor(Math.random() * (canvas.height / cellSize));

        const newSegment = { x: snake[snake.length - 1].x, y: snake[snake.length - 1].y };
        snake.push(newSegment);

        score++;
        updateScore();
    }
    for (let i = snake.length - 1; i > 0; i--) {
        snake[i] = { ...snake[i - 1] };
    }
    snake[0] = { ...snakeHead };
    for (let i = 1; i < snake.length; i++) {
        if (snakeHead.x === snake[i].x && snakeHead.y === snake[i].y) {
            resetGame();
        }
    }
}
function updateScore() {
    document.getElementById('pontuacao').textContent = 'Pontuação: ' + score;
    localStorage.setItem('highScore', score.toString());
}
function resetGame() {
        const finalScore = score; // Salva a pontuação final antes de resetar
    
        snakeHead = { x: 10, y: 10 };
        food = { x: 15, y: 15 };
        velocityX = 0;
        velocityY = 0;
        snake.length = 1;
        score = 0; 
        updateScore();
        // alert com a pontuação final
        alert(`Você perdeu! Sua pontuação foi de: ${finalScore}. Clique em OK para jogar novamente.`);
    }
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowUp' && velocityY !== 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (event.key === 'ArrowDown' && velocityY !== -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (event.key === 'ArrowLeft' && velocityX !== 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (event.key === 'ArrowRight' && velocityX !== -1) {
        velocityX = 1;
        velocityY = 0;
    }
});
gameLoop();