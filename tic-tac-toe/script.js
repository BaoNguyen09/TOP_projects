function Gameboard() {
    let board = [];
    for (let i=0; i<3; i++) {
        row = [];
        board.push(row);
        for (let j=0; j<3; j++) {
            board[i].push(Cell());
        }
    }

    console.log(board[0]);

    const getBoard = () => board;

    const ticTheToe = (column, row, player) => {
        if (board[row][column] != null) {
            board[row][column].addMove(player);
        } else {
            // handle invalid move
            return;
        }
    }

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()));
        // create a new array with cell value, if just return board, we will only see Cell object
        console.log(boardWithCellValues);
    }

    return { getBoard, ticTheToe, printBoard };
}

function Cell() {
    let value = null;

    const addMove = (player) => {
        value = player;
    }

    const getValue = () => value;

    return {
        ticTheToe,
        getValue
    }
}

function GameController(
    playerOneName = "Player One",
    playerTwoName = "Player Two"
) {
    const board = Gameboard();

    const players = [
        {
            name: playerOneName,
            token: 'X',
        }, 
        {
            name: playerTwoName,
            token: 'O',
        }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`)
    }

    const playRound = (row, column) => {
        console.log(
            `Drawing ${getActivePlayer().token}'s token into position (${row}, ${column})`
        );
        board.ticTheToe(column, row, getActivePlayer().token);

        switchPlayerTurn();
        printNewRound();
    };

    printNewRound();

    return {
        playRound,
        getActivePlayer,
        getBoard: board.getBoard
    };
}