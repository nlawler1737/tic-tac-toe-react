import { useState } from "react";
import BoardSuper from "../components/BoardSuper";
import BoardCell from "../components/BoardCell";
import TicTacToeX from "../components/TicTacToeX";
import TicTacToeO from "../components/TicTacToeO";
import BoardClassic from "../components/BoardClassic";

export default function SuperMode() {
    // false x
    // true o
    const [turn, setTurn] = useState(false);
    const [values, setValues] = useState(
        Array(9)
            .fill()
            .map(() =>
                Array(9)
                    .fill()
                    .map(() => (Math.random() > 0.5 ? 1 : 2))
            )
    );
    const [winningValues, setWinningValues] = useState({
        main: [],
        sub: [Array(9).fill([])],
    });
    const [selectedCell, setSelectedCell] = useState(null);
    const subCells = values.map((a, i) =>
        a.map((b, ii) => {
            const value = values[i][ii];
            const winning = winningValues.sub[i];
            const content =
                value === 1 ? (
                    <TicTacToeX winning={winning} />
                ) : value === 2 ? (
                    <TicTacToeO winning={winning} />
                ) : null;
            return (
                <BoardCell
                    key={`${i}_${ii}`}
                    value={content}
                    handleCellClick={() => handleCellClick(i, ii)}
                />
            );
        })
    );
    const boards = values.map((cell, boardIndex) => {
        return <BoardClassic key={boardIndex} cells={subCells[boardIndex]} />;
    });
    const cells = values.map((cell, boardIndex) => {
        const content = boards[boardIndex];
        return (
            <BoardCell
                key={boardIndex}
                value={content}
                handleCellClick={() => handleSuperCellClick(boardIndex)}
            />
        );
    });
    // console.log(boards);
    // const cells = values.map((a, i) => {
    //     const value = values[i];
    //     const winning = winningValues.includes(i);
    //     const content =
    //         value === 1 ? (
    //             <TicTacToeX winning={winning} />
    //         ) : value === 2 ? (
    //             <TicTacToeO winning={winning} />
    //         ) : null;
    //     return (
    //         <BoardCell
    //             key={i}
    //             value={content}
    //             handleCellClick={() => handleCellClick(i)}
    //         />
    //     );
    // });
    // console.log(cells);

    function handleSuperCellClick(id) {
        setSelectedCell(id);
    }

    function handleCellClick(id, id2) {
        console.log(id, id2);
        // console.log(values)
        // console.log(checkWinner(values))
        if (checkWinner(values) || values[id][id2]) return;
        const newVals = values.slice();
        newVals[id][id2] = turn ? 2 : 1;
        setValues(newVals);
        // console.log(checkWinner(newVals));
        console.log(newVals);
        // setValues(a=>{
        //     a[id] = turn
        //     return a
        // })

        setTurn(!turn);
    }

    function checkSuperWinner(squares) {}

    function checkWinner(squares) {
        // if (winningValues.[0] === -1) return;
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
                // setWinningValues([a,b,c]);
                return [squares[a], [a, b, c]];
            }
        }
        if (squares.every((a) => a)) {
            // setWinningValues([-1]);

            return [-1];
        }
        return null;
    }

    return (
        <div className="game game-super">
            {/* <BoardClassic isSuperBoard/> */}
            <div className="gameStatus">WinnerX Game Super</div>
            <div className="board-container">
                <BoardSuper {...{ cells }} />
            </div>
            <div style={{height: "400px",transition: "2s"}}>
                {selectedCell !== null && boards[selectedCell]}
            </div>
        </div>
    );
}
