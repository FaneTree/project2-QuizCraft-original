import React from "react";
import { useParams } from "react-router-dom"
import Quiz from '../Quiz/Quiz'


export default function Host (props) {
    let { gameId, playerId } = useParams()
    const gameID = gameId

    return (
        <div>
            <Quiz a = { gameID } /> 
            {/* <Lobby gameId = { gameId } /> */}
        </div>
    );
}