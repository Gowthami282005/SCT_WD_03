let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let mode = "player"; // Default mode: Player vs Player

// Set Game Mode
function setMode(selectedMode) {
    mode = selectedMode;
    resetGame();
}

// Handle Cell Clicks
function handleClick(index) {
    if (!gameActive || board[index] !== "") return;

    board[index] = currentPlayer;
    document.querySelectorAll(".cell")[index].innerText = currentPlayer;

    if (checkWinner()) {
        document.getElementById("status").innerText = `Player ${currentPlayer} Wins! 🎉`;
        gameActive = false;
        return;
    }

    if (board.every(cell => cell !== "")) {
        document.getElementById("status").innerText = "It's a Draw! 😐";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    document.getElementById("status").innerText = `Player ${currentPlayer}'s turn`;

    if (mode === "computer" && currentPlayer === "O") {
        setTimeout(computerMove, 500);
    }
}

// Computer Move (Random AI)
function computerMove() {
    let availableMoves = board
        .map((cell, index) => (cell === "" ? index : null))
        .filter(index => index !== null);

    if (availableMoves.length === 0 || !gameActive) return;

    let randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    handleClick(randomMove);
}

// Check for Winner
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return board[a] !== "" && board[a] === board[b] && board[a] === board[c];
    });
}

// Reset Game
function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    document.querySelectorAll(".cell").forEach(cell => (cell.innerText = ""));
    document.getElementById("status").innerText = "Player X's turn";
}
