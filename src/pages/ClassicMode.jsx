import { useState } from "react";
import BoardClassic from "../components/BoardClassic";
import BoardCell from "../components/BoardCell";
import TicTacToeX from "../components/TicTacToeX";
import TicTacToeO from "../components/TicTacToeO";

export default function ClassicMode() {
    // false x
    // true o
    const [turn, setTurn] = useState(false);
    const [values, setValues] = useState(Array(9).fill(null));
    const [winningValues, setWinningValues] = useState([]);
    const cells = values.map((a, i) => {
        const value = values[i];
        const winning = winningValues.includes(i);
        const content =
            value === 1 ? (
                <TicTacToeX winning={winning} />
            ) : value === 2 ? (
                <TicTacToeO winning={winning} />
            ) : null;
        return (
            <BoardCell
                key={i}
                value={content}
                handleCellClick={() => handleCellClick(i)}
            />
        );
    });

    function getGameStatus() {
        const player = {[false]:"X",[true]:"O"}
        if (winningValues[0] === -1) return "Draw"
        if (winningValues.length && winningValues.length===3) return `${player[!turn]} Wins`
        return player[turn]+"'s Turn"
    }

    function handleCellClick(id) {
        if (checkWinner(values) || values[id]) return;
        const newVals = values.slice();
        newVals[id] = turn ? 2 : 1;
        setValues(newVals);
        checkWinner(newVals)
        // setValues(a=>{
        //     a[id] = turn
        //     return a
        // })

        setTurn(!turn);
    }

    function checkWinner(squares) {
        if (winningValues[0] === -1) return;
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
            if (
                squares[a] &&
                squares[a] === squares[b] &&
                squares[a] === squares[c]
            ) {
                setWinningValues([a, b, c]);
                return squares[a];
            }
        }
        if (squares.every((a) => a)) {
            setWinningValues([-1]);
            return null;
        }
        return null;
    }
    return (
        <div className="game game-classic">
            {/* <BoardClassic isSuperBoard/> */}
            <div className="gameStatus">{getGameStatus()}</div>
            <div className="board-container">
                <BoardClassic {...{ cells }} />
            </div>
        </div>
    );
}
