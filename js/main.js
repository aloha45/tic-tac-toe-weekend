/*------Constants------*/

const players = {
    'null' : '',
    '1' : 'X',
    '-1' : 'O'
}

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

/*------Variables (state)------*/

// Variables might include (board/turn/winner)

let playerTurn, board, winner;

/*------Cached Element References------*/

const messageEl = document.getElementById('message');
const squares = document.querySelectorAll('div');
const resetBtn = document.getElementById('resetBtn');



// You might choose to put your game status here

/*------Event Listeners------*/

resetBtn.addEventListener('click', init);
document.querySelector('section').addEventListener('click', playerMove);

// This is where you should put the event listener
// for a mouse-click

/*------Functions------*/

init()

function init(){
    board = [null, null, null, null, null, null, null, null, null];
    messageEl.innerText = 'Welcome to Tic Tac Toe';
    playerTurn = 1;
    winner = null;
    render();
}

function playerMove(e){
    const idx = parseInt(e.target.id.replace("sq", ""));
    console.log("index", idx)
    if (board[idx] || winner) return;
    board[idx] = playerTurn;
    winner = checkWin();
    playerTurn *= -1;
    render();
}

function checkWin() {  
    for (let i = 0; i < winningCombos.length; i++) {
        if (Math.abs(board[winningCombos[i][0]] + board[winningCombos[i][1]] + board[winningCombos[i][2]]) === 3) return board[winningCombos[i][0]]
        };
    if (board.includes(null)) return null;
    return 'Tie';
}


function render() {
    board.forEach(function(sq, idx){
        // console.log("for each", idx)
        squares[idx].innerText = players[sq]
    })
    if (winner === 'Tie'){
        messageEl.innerHTML = 'Your game has ended in a tie!';
     } else if (winner){
        messageEl.innerHTML = `Congrats to ${players[winner].toUpperCase()} you are the winner!`
    } else {
        messageEl.innerHTML = `It is ${players[playerTurn].toUpperCase()}'s turn`
    }
}

