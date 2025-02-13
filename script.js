const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');

const gridSize = 20; // Size of each grid square
const tileCount = canvas.width / gridSize; // Number of tiles in each row/column

let snake = [{ x: 10, y: 10 }]; // Initial snake position
let food = { x: 5, y: 5 }; // Initial food position
let direction = { x: 0, y: 0 }; // Initial direction
let score = 0;

// Draw the game
function drawGame() {
    // Clear the canvas
    ctx.fillStyle = '#222';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the snake
    ctx.fillStyle = 'lime';
    snake.forEach(segment => ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize));

    // Draw the food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);

    // Move the snake
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);

    // Check for food collision
    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreDisplay.textContent = score;
        placeFood();
    } else {
        snake.pop(); // Remove the tail if no food is eaten
    }

    // Check for collisions
    if (
        head.x < 0 || head.x >= tileCount ||
        head.y < 0 || head.y >= tileCount ||
        snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
    ) {
        alert(`Game Over! Your score is ${score}`);
        resetGame();
    }
}

// Place food randomly
function placeFood() {
    food.x = Math.floor(Math.random() * tileCount);
    food.y = Math.floor(Math.random() * tileCount);

    // Ensure food doesn't spawn on the snake
    if (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
        placeFood();
    }
}

// Reset the game
function resetGame() {
    snake = [{ x: 10, y: 10 }];
    direction = { x: 0, y: 0 };
    score = 0;
    scoreDisplay.textContent = score;
    placeFood();
}

// Handle keyboard input
document.addEventListener('keydown', event => {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
    }
});

// Game loop
setInterval(drawGame, 100);
