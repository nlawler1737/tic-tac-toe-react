import { useEffect, useState } from "react";
import { getUserData, logout } from "../utils/auth";
import "./History.css"

export default function History() {
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        if (userData) return
        presentUserData(localStorage.getItem("userid"))
    });
    
    function presentUserData(userId) {
        if (userId == -1) return
        getUserData(userId).then((res)=>{
            res.data.data.history.unshift({player_1:"X",player_2:"O",winner:"Winner",game_type:"Game Type",start_time:"Start Time",end_time:"End Time"})
            setUserData(res.data.data)
        })
    }

    if (!userData) return <div>Loading User Data...</div>;

    return <div className="history">
        <div className="history--logout" onClick={logout}>Logout</div>
        <div className="history--totals">
            <div>id: {userData.totals.id}</div>
            <div>Username: {userData.totals.username}</div>
            <div>Wins: {userData.totals.wins}</div>
            <div>Losses: {userData.totals.losses}</div>
            <div>Draw: {userData.totals.draws}</div>
            <div>Total Games: {userData.totals.total_games_played}</div>
        </div>
        <div className="history--games">
            {userData.history.map((game, index)=>{
                return (
            <div className="history--game" key={index}>
                <div className="game--player" onClick={()=>presentUserData(game.player_1)}>{game.player_1}</div>
                <div className="game--player" onClick={()=>presentUserData(game.player_2)}>{game.player_2}</div>
                <div className="game--winner" onClick={()=>presentUserData(game.winner)}>{game.winner == -1 ? "Draw" : game.winner}</div>
                <div className="game--game-type">{game.game_type}</div>
                <div className="game--time">{index === 0 ? game.start_time : new Date(game.start_time).toLocaleString()}</div>
                <div className="game--time">{index === 0 ? game.end_time : new Date(game.start_time).toLocaleString()}</div>
            </div>
                )
            })}
        </div>
    </div>
}
