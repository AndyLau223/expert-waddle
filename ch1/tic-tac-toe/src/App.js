import {useState} from 'react'

function Square({value, onSquareClick}) {
    return <button className="square" onClick={onSquareClick}>{value}</button>;
}

function Board({xIsNext, squares, onPlay}) {
    /**
     * value stores the value and `setValue` is a function
     * that can be used to change the value.
     * The `null` passed to `useState` is used as the initial
     * value for this state variable, so `value` here starts
     * off equal to `null`.
     */
    function handleClick(i) {
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        // slice() returns a `shallow copy` of a portion of an array into a new array objects.
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
        // https://developer.mozilla.org/en-US/docs/Glossary/Shallow_copy
        // https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = "X";
        } else {
            nextSquares[i] = "O";
        }
        /**
         * Calling the `setSquares` function lets React know the state
         * of the component has changed. This will trigger a re-render
         * of the components that use the `squares` state(`Board`) as
         * well as its child components (the `Square` components that make up
         * the board).
         */
        onPlay(nextSquares);
    }

    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }
    return (
        // <> </> is to wrapped mul-adjacent JSX elements.
        <>
            <div className="status">{status}</div>
            <div className="board-row">
                <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
                <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
                <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
            </div>
            <div className="board-row">
                <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
                <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
                <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
            </div>
            <div className="board-row">
                <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
                <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
                <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
            </div>
        </>
    );
}

export default function Game() {
    // defines an array with single item, which itself is an array of 9 `null`s.
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    const moves = history.map((squares, move) => {
        let description;
        if (move === currentMove) {
            description = 'you are at move #' + move;
        } else if (move > 0) {
            description = `Go to move #` + move;
        } else {
            description = 'Go to game start';
        }

        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        );
    });

    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares}
                       onPlay={handlePlay}
                />
            </div>
            <div className="game-info">
                <ol>{moves}</ol>
            </div>
        </div>
    );
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a]
            && squares[a] === squares[b]
            && squares[a] === squares[c]
        ) {
            return squares[a];
        }
    }
    return null;
}