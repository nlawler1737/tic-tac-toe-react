import { useEffect, useState } from "react";
import BoardClassic from "../components/BoardClassic";
import BoardCell from "../components/BoardCell";
import TicTacToeX from "../components/TicTacToeX";
import TicTacToeO from "../components/TicTacToeO";
import { joinQueue, putGameState } from "../utils/auth";

export default function ClassicMode() {
    const [gameData, setGameData] = useState({
        gameState: Array(9).fill(null),
        gameStatus: "Loading...",
        player: null,
        currentTurn: null,
        winner: null,
    });
    // console.log(gameData)
    // const [player, setPlayer] = useState(-1)
    // const [gameStatus, setGameStatus] = useState("Loading...");
    // const [turn, setTurn] = useState(0);
    // const [values, setValues] = useState(Array(9).fill(null));
    const [winningValues, setWinningValues] = useState([]);

    useEffect(() => {
        if (gameData.player !== null) return;

        joinQueue().then((data) => {
            const { code } = data;
            if (code == 1) {
                console.log(gameData.gameState);
                requestBoard(true);
            }
            // return
            // setGameData(prev=>{
            //     return {...prev,gameStatus:msg}
            // })
        });
    });

    useEffect(() => {
        function onGameUpdate() {
            requestBoard(true);
        }

        globalThis.socket.on("game-start", onGameUpdate);

        globalThis.socket.on("game-update", onGameUpdate);

        return () => {
            globalThis.socket.off("game-update", onGameUpdate);
            globalThis.socket.off("game-start", onGameUpdate);
        };
    });

    useEffect(() => {
        document.addEventListener("keydown", handleKeyPress, true);
    });
    // useEffect(() => {
    //     requestBoard(gameData.gameState)
    //     // console.log("use Effect")
    //     // putGameState(values).then(data=>{
    //     //     updateBoard(data)
    //     //     // if (JSON.stringify(data.gameState) != JSON.stringify(values)) setValues(data.gameState)
    //     //     // setTurn(data.gameState.filter((a) => a != null).length % 2);
    //     //     // checkWinner(values)
    //     // });
    // }, [values]);

    function requestBoard(update = false, values = gameData.gameState) {
        console.log("request sent", values);
        putGameState(values, update).then((data) => {
            console.log(data);
            setGameData((prev) => {
                return {
                    ...prev,
                    gameStatus: data.gameStatus,
                    gameState: data.gameState,
                    player: data.player,
                    currentTurn:
                        data.gameState.filter((a) => a != null).length % 2,
                    // winner: data.winner,
                };
            });
            checkWinner(data.gameState);
            // updateBoard(data)
        });
    }

    // function updateBoard(data) {
    //     // if (JSON.stringify(data.gameState) != JSON.stringify(values)) setValues(data.gameState)
    //     // if (data.err) return
    //     // setGameStatus(data.gameStatus)
    //     // setPlayer(data.player)
    //     // setTurn(data.gameState.filter((a) => a != null).length % 2);
    // }
    // 1 x
    // 2 o
    if (!localStorage.getItem("userjwt")) {
        window.location.href = "/login";
        return;
    }
    // globalThis.socket.emit("move-played",{msg:"hi"})
    // console.log(values)
    const cells = gameData.gameState.map((a, i) => {
        const value = gameData.gameState[i];
        const winning = winningValues.includes(i);
        const content =
            value === 0 ? (
                <TicTacToeX winning={winning} />
            ) : value === 1 ? (
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

    // function getGameStatus() {
    //     const playerMap = { 0: "X", 1: "O" };
    //     if (winningValues[0] === -1) return "Draw";
    //     if (winningValues.length && winningValues.length === 3)
    //         return `${playerMap[turn === 0 ? 1 : 0]} Wins`;
    //     setGameStatus(playerMap[turn] + "'s Turn");
    // }

    function handleKeyPress(e) {
        const indexMap = {
            6: 0,
            7: 1,
            8: 2,
            3: 3,
            4: 4,
            5: 5,
            0: 6,
            1: 7,
            2: 8,
        };
        const key = Number(e.key);
        const index =
            e.code.slice(0, -1) === "Numpad" ? indexMap[key - 1] : key - 1;
        if (isNaN(key) || key == 0 || gameData.gameState[index]) return;
        handleCellClick(index);
    }

    function handleCellClick(id) {
        if (gameData.player === null) return;
        // console.log(gameData.player, values.filter(a=>a!=null).length % 2, values.filter(a=>a!=null).length)
        // if (gameData.gameState.filter(a=>a!=null).length % 2 !== gameData.player) return
        if (gameData.currentTurn !== gameData.player) return;
        if (winningValues.length || gameData.gameState[id] != null) return;
        document.removeEventListener("keydown", handleKeyPress, true);
        const newVals = gameData.gameState.slice();
        newVals[id] = gameData.player;
        // console.log(newVals)
        requestBoard(false, newVals);

        // checkWinner(newVals);
        // setTurn(turn === 1 ? 0 : 1);
        // setValues(newVals);
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
                squares[a] != null &&
                squares[a] === squares[b] &&
                squares[a] === squares[c]
            ) {
                setWinningValues([a, b, c]);
                return squares[a];
            }
        }
        // check if draw
        if (squares.every((a) => a != null)) {
            setWinningValues([-1]);
            return null;
        }
        return null;
    }
    return (
        <div className="game game-classic">
            {/* <BoardClassic isSuperBoard/> */}
            <div className="gameStatus">{gameData.gameStatus}</div>
            <div className="board-container">
                <BoardClassic {...{ cells }} />
            </div>
        </div>
    );
}
