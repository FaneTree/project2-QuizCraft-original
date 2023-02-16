import React from "react";
import { db, auth } from "../firebase";
import { doc, onSnapshot } from 'firebase/firestore';

export default function WaitingRoom(props){
    const gameID = props.a;
    const playersList = [];

    const unsub = onSnapshot(doc(db, "games", gameID), (doc) => {
        doc.data().players.map(x => playersList.push(x));
        console.log(playersList);
    });

    return (
        <div className="midtag">
            <p>Players in room : { gameID } </p> 
            {playersList.map((player) => {
                    return (
                        <li>{player}</li>
                    );
                })}
        </div>
    )
}