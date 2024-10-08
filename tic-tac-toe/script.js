function Gameboard() {
    let board = [];
    for (let i=0; i<3; i++) {
        row = [];
        board.push(row);
        for (let j=0; j<3; j++) {
            board[i].push(Cell());
        }
    }

    // console.log(board[0]);

    const getBoard = () => board;

    const addMarker = (column, row, player) => {
        if (board[row][column].getValue() == null) {
            board[row][column].addMove(player);
        } else {
            alert("Invalid Move !!!");
            return;
        }
    }

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()));
        // create a new array with cell value, if just return board, we will only see Cell object
        console.log(boardWithCellValues);
    }

    return { getBoard, addMarker, printBoard };
}

function Cell() {
    let value = null;

    const addMove = (player) => {
        value = player;
    }

    const getValue = () => value;

    return {
        addMove,
        getValue
    }
}

function GameController(
    playerOneName = "Player One",
    playerTwoName = "Player Two"
) {
    const board = Gameboard();
    let markerCounter = 0;

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

    const checkWinner = (marker) => {
    
        let markerChecker = [marker, marker, marker];
        // console.log(markerChecker);
        // Check all the rows
        for (let row of board.getBoard()) {
            let r = [row[0].getValue(), row[1].getValue(), row[2].getValue()];
            if (JSON.stringify(r) == JSON.stringify(markerChecker)) {
                console.log('Win by row');
                return true;
            }
        }

        // Check all the columns
        for (let i=0; i<3; i++) {
            let col = [];
            for (let j=0; j<3; j++) {
                col.push(board.getBoard()[j][i].getValue());
            }
            if (col.every((val) => val == marker)) {
                console.log('Win by column');
                return true;
            }
        }

        // Check 2 diagonal lines
        let topLeft = board.getBoard()[0][0].getValue();
        let topRigh = board.getBoard()[0][2].getValue();
        let center = board.getBoard()[1][1].getValue();
        let bottomLeft = board.getBoard()[2][0].getValue();
        let bottomRight = board.getBoard()[2][2].getValue();
        let firstLine = [topLeft, center, bottomRight];
        let secondLine = [topRigh, center, bottomLeft];
        // console.log(firstLine);

        if ( JSON.stringify(firstLine) == JSON.stringify(markerChecker) 
            || JSON.stringify(secondLine) == JSON.stringify(markerChecker)) {
            console.log('Win by diagonal');
            return true;
        }

        return false;
    }

    const resetGame = () => {
        markerCounter = 0;  // Reset marker counter
        activePlayer = players[0];  // Reset active player to Player One (X)
        board.getBoard().forEach(row => row.forEach(cell => cell.addMove(null))); // Clear the board
        printNewRound();  // Print a fresh board
    }

    const playRound = (row, column) => {
        markerCounter += 1;
        console.log(
            `Drawing ${getActivePlayer().token}'s token into position (${row}, ${column})`
        );
        board.addMarker(column, row, getActivePlayer().token);

        // Check for winner and handle the win message
        
        if (checkWinner(getActivePlayer().token)) {
            console.log(`Active player: ${getActivePlayer().token}`)
            setTimeout(() => {
                alert(`Player with token: ${getActivePlayer().token} WIN`);
                resetGame();
                // ScreenController().updateScreen();
            }, 100);
            return;
            
        } 
      
        if (markerCounter == 9) {
            setTimeout(() => {
                alert('Draw!');
                resetGame();
                // ScreenController().updateScreen();
            }, 100);
            return;
        }

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

function ScreenController() {

    const game = GameController();
    const playerTurnDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');

    const updateScreen = () => {
        boardDiv.textContent = "";
        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();

        // Display player's turn
        playerTurnDiv.textContent = `${activePlayer.name}'s turn`;

        // Render board squares
        board.forEach((row, r) => {
            row.forEach((cell, col) => {
                // Anything clickable should be a button!!
                const cellButton = document.createElement('button');
                cellButton.classList.add('cell');
                // Create a data attribute to identify the col and row
                cellButton.dataset.column = col;
                cellButton.dataset.row = r;
                cellButton.textContent = cell.getValue();
                boardDiv.appendChild(cellButton);
            })
        })
    }

    // Add event listener for the board
    function clickHandlerBoard(e) {
        const selectedColumn = e.target.dataset.column;
        const selectedRow = e.target.dataset.row;
        // Make sure I've clicked the cell, not the gaps in between
        if (!selectedColumn || !selectedRow) {
            alert("Please click the cell !");
            return;
        };

        game.playRound(selectedRow, selectedColumn);
        updateScreen();
    }

    boardDiv.addEventListener("click", clickHandlerBoard);

    // Initial render
    updateScreen();
    // Don't need to return anything from this module because everything is encapsulated
    return {
        updateScreen,
    }
}


ScreenController();