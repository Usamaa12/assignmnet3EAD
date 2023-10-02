let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function makeMove(index) {
  if (board[index] === '' && gameActive) {
    board[index] = currentPlayer;
    const cell = document.getElementById('board').children[index];
    cell.innerText = currentPlayer;

    // Apply 'x' class to the cell to change its color to red only for 'X'
    if (currentPlayer === 'X') {
      cell.classList.add('x');
    }

    if (checkWin()) {
      document.getElementById('status').innerText = `${currentPlayer} wins!`;
      gameActive = false;
      highlightWinningCells();
    } else if (board.every(cell => cell !== '')) {
      document.getElementById('status').innerText = "It's a draw!";
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      document.getElementById('status').innerText = `Current player: ${currentPlayer}`;
    }
  }
}

function checkWin() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function highlightWinningCells() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      document.getElementById('board').children[a].classList.add('x');
      document.getElementById('board').children[b].classList.add('x');
      document.getElementById('board').children[c].classList.add('x');
      break;
    }
  }
}

function resetGame() {
  currentPlayer = 'X';
  board = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  document.getElementById('status').innerText = 'Current player: X';
  const cells = document.getElementsByClassName('cell');
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerText = '';
    cells[i].classList.remove('x');  // Remove 'x' class
  }
}
