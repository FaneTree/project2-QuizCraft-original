import React from "react";
import { db, auth } from "../firebase";
import { doc, onSnapshot } from 'firebase/firestore';

export default function FinalResult(props){
    const gameID = props.a;
    const playersScore = {}; // put data like { 0 : {username: dfdf, score: 5}} => 0 is rank

    const unsub = onSnapshot(doc(db, "games", gameID), (doc) => {
        console.log("Current data: ", doc.data());
    });

    return (
        <div>

        </div>
    )
}