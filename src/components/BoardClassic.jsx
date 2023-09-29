import { useState } from "react";
import TicTacToeO from "./TicTacToeO";
import TicTacToeX from "./TicTacToeX";
import BoardCell from "./BoardCell";
import "./BoardClassic.css";

export default function BoardClassic({
    cells,
}) {
    // const [turn, setTurn] = useState(false);
    // const [values, setValues] = useState(Array(9).fill(null));
    // const [winningValues, setWinningValues] = useState([])
    //     const cells = values.map((a,i)=><BoardCell
    //     key={i}
    //     value={values[i]}
    //     handleCellClick={() => handleCellClick(i)}
    //     winning={winningValues.includes(i)}
    // />)

    // console.log(checkWinner(values))

    return (
        <div className="board-classic">
            <div className="board-classic--row">
                {cells[0]}
                <div className="board-classic--cell-spacer"></div>
                {cells[1]}
                <div className="board-classic--cell-spacer"></div>
                {cells[2]}
            </div>
            <div className="board-classic--row-spacer"></div>
            <div className="board-classic--row">
                {cells[3]}
                <div className="board-classic--cell-spacer"></div>
                {cells[4]}
                <div className="board-classic--cell-spacer"></div>
                {cells[5]}
            </div>
            <div className="board-classic--row-spacer"></div>
            <div className="board-classic--row">
                {cells[6]}
                <div className="board-classic--cell-spacer"></div>
                {cells[7]}
                <div className="board-classic--cell-spacer"></div>
                {cells[8]}
            </div>
        </div>
    );
}
