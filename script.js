  document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('reset');
    const messageElement = document.getElementById('message');
    let isXTurn = true;
    let gameActive = true;
    let board = ['', '', '', '', '', '', '', '', ''];

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

    const handleCellClick = (e) => {
        const cell = e.target;
        const index = cell.getAttribute('data-index');

        if (board[index] !== '' || !gameActive) {
            return;
        }

        board[index] = isXTurn ? 'X' : 'O';
        cell.textContent = board[index];

        if (checkWinner()) {
            gameActive = false;
            messageElement.textContent = `${board[index]} wins!`;
            return;
        }

        if (board.every(cell => cell !== '')) {
            gameActive = false;
            messageElement.textContent = "It's a draw!";
            return;
        }

        isXTurn = !isXTurn;
        messageElement.textContent = isXTurn ? "X's turn" : "O's turn";
    };

    const checkWinner = () => {
        return winningCombinations.some(combination => {
            const [a, b, c] = combination;
            return board[a] && board[a] === board[b] && board[a] === board[c];
        });
    };

    const resetGame = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        cells.forEach(cell => cell.textContent = '');
        gameActive = true;
        isXTurn = true;
        messageElement.textContent = "X's turn";
    };

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetGame);

    messageElement.textContent = "X's turn";
});

