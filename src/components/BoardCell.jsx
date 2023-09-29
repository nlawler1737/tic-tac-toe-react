import { useState } from "react";
import TicTacToeO from "./TicTacToeO";
import TicTacToeX from "./TicTacToeX";

export default function BoardCell({value,handleCellClick}) {

    // console.log(handleCellClick)
    // const [content, setContent] = useState(props);

    // console.log(props);
    // console.log(props.turnData[0])
    // function handleCellClick() {
    //     // props.setTurn(a=>!a)
    //     props.turnData[1](a=>!a)
    //     if (content) return;
    //     // props.setTurn(!props.turn);
    //     // Math.random() > 0.5 ? setContent(<TicTacToeO />) : setContent(<TicTacToeX />)
    //     // console.log(<TicTacToeO />)
    //     // setContent(<TicTacToeO />)
    //     // console.log(props.turn, !props.turn)
    //     // props.setTurn(a=>!a)
    //     // console.log(props.turn,content)
    // }

    return (
        <div className="board-classic--cell" onClick={handleCellClick}>
            {value}
        </div>
    );
}
