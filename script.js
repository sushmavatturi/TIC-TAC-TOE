const board = Array(9).fill(null);
let currentPlayer = 'X';
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
];

const cells = document.querySelectorAll('.cell');
const messageElement = document.getElementById('message');
const resetButton = document.getElementById('reset');

// Initialize the game
cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);

function handleClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    // Check if the cell is already filled
    if (board[index] !== null || checkWinner()) return;

    // Place the current player's symbol
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    // Check for a win or draw
    if (checkWinner()) {
        messageElement.textContent = `${currentPlayer} wins!`;
    } else if (board.every(cell => cell !== null)) {
        messageElement.textContent = "It's a draw!";
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWinner() {
    return winningCombinations.some(combination => {
        return combination.every(index => board[index] === currentPlayer);
    });
}

function resetGame() {
    board.fill(null);
    cells.forEach(cell => cell.textContent = '');
    messageElement.textContent = '';
    currentPlayer = 'X';
}