import { useState } from "react";
import TicTacToeO from "./TicTacToeO";
import TicTacToeX from "./TicTacToeX";

export default function BoardCell({value,handleCellClick}) {
    return (
        <div className="board-classic--cell" onClick={handleCellClick}>
            {value}
        </div>
    );
}
