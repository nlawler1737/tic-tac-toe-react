import { useEffect, useState } from "react";
import BoardClassic from "../components/BoardClassic";
import BoardCell from "../components/BoardCell";
import TicTacToeX from "../components/TicTacToeX";
import TicTacToeO from "../components/TicTacToeO";
import { joinQueue, leaveQueue, putGameState } from "../utils/auth";

export default function ClassicMode() {
    const [gameData, setGameData] = useState({
        gameState: Array(9).fill(null),
        gameStatus: null,
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
    const [leaveQueueShown, setLeaveQueueShown] = useState(false);
    const [joinQueueShown, setJoinQueueShown] = useState(true);

    useEffect(()=>{
        if (gameData.player !== null) return
        requestBoard(true)
    })

    useEffect(() => {
        function onGameUpdate() {
            requestBoard(true);
            setLeaveQueueShown(false)
            setJoinQueueShown(false)
            console.log("ping received")
        }

        globalThis.socket.on("game-start", onGameUpdate);

        globalThis.socket.on("game-update", onGameUpdate);

        return () => {
            globalThis.socket.off("game-update", onGameUpdate);
            globalThis.socket.off("game-start", onGameUpdate);
        };
    });

    useEffect(() => {
        function beforePageLeave(e) {
            e.preventDefault()
            leaveQueue()
        }

        document.addEventListener("keydown", handleKeyPress, true);

        window.addEventListener("beforeunload", beforePageLeave)
        window.addEventListener("unload", beforePageLeave)
    });

    function requestBoard(update = false, values = gameData.gameState) {
        console.log("request sent", values);
        putGameState(values, update).then(({ data }) => {
            if (!data.gameState) return
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
            setJoinQueueShown(false)
            setLeaveQueueShown(false)
        });
    }

    if (!localStorage.getItem("userjwt")) {
        window.location.href = "/login";
        return;
    }

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
        if (gameData.currentTurn !== gameData.player) return;
        if (winningValues.length || gameData.gameState[id] != null) return;
        document.removeEventListener("keydown", handleKeyPress, true);
        const newVals = gameData.gameState.slice();
        newVals[id] = gameData.player;
        requestBoard(false, newVals);

    }

    function handleJoinQueueClick() {
        joinQueue().then(({ data, error }) => {
            if (error) return;
            const { code, msg } = data;
            console.log(data)
            if (code == 1) {
                requestBoard(true);
            }
            setGameData((prev) => {
                return { ...prev, gameStatus: msg };
            });
            setLeaveQueueShown(true);
            setJoinQueueShown(false);
        });
    }

    function handleLeaveQueueClick() {
        leaveQueue().then((data) => {
            if (data.error) return;
            setLeaveQueueShown(false);
            setJoinQueueShown(true);
            setGameData((prev) => {
                return { ...prev, gameStatus: null };
            });
        });
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
            {leaveQueueShown && (
                <div
                    className="leave-queue button"
                    onClick={handleLeaveQueueClick}
                >
                    Leave Queue
                </div>
            )}
            {joinQueueShown && (
                <div
                    className="join-queue button"
                    onClick={handleJoinQueueClick}
                >
                    Join Queue
                </div>
            )}
            {gameData.gameStatus && (
                <div className="gameStatus">{gameData.gameStatus}</div>
            )}
            <div className="board-container">
                <BoardClassic {...{ cells }} />
            </div>
        </div>
    );
}
