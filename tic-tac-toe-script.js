let board;
let currentPlayer;
let gameActive;

function initializeGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = Math.random() < 0.5 ? 'X' : 'O';
    gameActive = true;
    document.getElementById('result').value = 'Results';
    renderBoard();
    if (currentPlayer === 'O') {
        aiMove();
    }
}

function renderBoard() {
    const boardElement = document.getElementById('tic-tac-toe-board');
    boardElement.innerHTML = '';
    board.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.textContent = cell;
        cellElement.addEventListener('click', () => handleCellClick(index));
        boardElement.appendChild(cellElement);
    });
}

function handleCellClick(index) {
    if (board[index] !== '' || !gameActive || currentPlayer === 'O') {
        return;
    }
    board[index] = currentPlayer;
    renderBoard();
    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    if (gameActive && currentPlayer === 'O') {
        aiMove();
    }
}

function aiMove() {
    let availableCells = board.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
    let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    board[randomIndex] = 'O';
    renderBoard();
    checkWinner();
    currentPlayer = 'X';
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    let roundWon = false;
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        document.getElementById('result').value = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (!board.includes('')) {
        document.getElementById('result').value = 'Draw!';
        gameActive = false;
    }
}

function restartGame() {
    initializeGame();
}

window.onload = initializeGame;
