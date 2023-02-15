import React from "react";
import { useParams } from "react-router-dom"

export default function Host (props) {
    let { gameId, playerId } = useParams()

    return (
        <div>
            <Quiz gameId = { gameId } /> 
            <Lobby gameId = { gameId } />
        </div>
    );
}