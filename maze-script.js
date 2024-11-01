let mazeSize = 40;
let maze = [];
let playerPosition = { x: 0, y: 0 };
let goalPosition = { x: mazeSize - 1, y: mazeSize - 1 };

function changeMazeSize(change) {
    mazeSize = Math.min(40, Math.max(10, mazeSize + change));
    document.getElementById('maze-size-display').textContent = mazeSize;
    goalPosition = { x: mazeSize - 1, y: mazeSize - 1 };
    startGame();
}

function generateMaze() {
    maze = Array.from({ length: mazeSize }, () => Array(mazeSize).fill(0));
    for (let i = 0; i < mazeSize; i++) {
        for (let j = 0; j < mazeSize; j++) {
            if (Math.random() < 0.4 && !(i === 0 && j === 0) && !(i === mazeSize - 1 && j === mazeSize - 1)) {
                maze[i][j] = 1; // wall
            }
        }
    }
    ensurePath();
}

function ensurePath() {
    let x = 0, y = 0;
    while (x < mazeSize - 1 || y < mazeSize - 1) {
        maze[x][y] = 0;
        if (x < mazeSize - 1 && (Math.random() < 0.5 || y === mazeSize - 1)) {
            x++;
        } else {
            y++;
        }
    }
    maze[mazeSize - 1][mazeSize - 1] = 0;
}

function drawMaze() {
    const mazeElement = document.getElementById('maze');
    mazeElement.innerHTML = '';
    const cellSize = 400 / mazeSize; // Calculate cell size based on maze size
    mazeElement.style.gridTemplateColumns = `repeat(${mazeSize}, ${cellSize}px)`;
    mazeElement.style.gridTemplateRows = `repeat(${mazeSize}, ${cellSize}px)`;
    for (let i = 0; i < mazeSize; i++) {
        for (let j = 0; j < mazeSize; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.style.width = `${cellSize}px`;
            cell.style.height = `${cellSize}px`;
            if (maze[i][j] === 1) {
                cell.classList.add('wall');
            }
            if (i === playerPosition.x && j === playerPosition.y) {
                cell.classList.add('player');
            }
            if (i === goalPosition.x && j === goalPosition.y) {
                cell.classList.add('goal');
            }
            mazeElement.appendChild(cell);
        }
    }
}

function movePlayer(direction) {
    let newX = playerPosition.x;
    let newY = playerPosition.y;
    if (direction === 'up') newX--;
    if (direction === 'down') newX++;
    if (direction === 'left') newY--;
    if (direction === 'right') newY++;
    if (newX >= 0 && newX < mazeSize && newY >= 0 && newY < mazeSize && maze[newX][newY] !== 1) {
        playerPosition = { x: newX, y: newY };
        drawMaze();
        checkWin();
    }
}

function checkWin() {
    if (playerPosition.x === goalPosition.x && playerPosition.y === goalPosition.y) {
        document.getElementById('restart-button').textContent = 'You win! Restart';
    }
}

function startGame() {
    playerPosition = { x: 0, y: 0 };
    generateMaze();
    drawMaze();
    document.getElementById('restart-button').textContent = 'Restart';
}

window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') movePlayer('up');
    if (e.key === 'ArrowDown') movePlayer('down');
    if (e.key === 'ArrowLeft') movePlayer('left');
    if (e.key === 'ArrowRight') movePlayer('right');
});

startGame();
