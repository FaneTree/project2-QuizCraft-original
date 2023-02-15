import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom"
import { doc, onSnapshot, getDoc } from 'firebase/firestore';
import {db} from "../firebase";

import Quiz from '../Quiz/Quiz';


export default function Host () {
    const [showQuiz, setShowQuiz] = useState(false);
    const [gameStatus, setGameStatus] = useState(false);

    let { gameId, playerId } = useParams()
    const gameID = gameId

    const unsub = onSnapshot(doc(db, "games", gameID), (doc) => {
        console.log("Current data: ", doc.data());
    });

    // useEffect(() => {
    //     const getGameStatus = onSnapshot(doc(db, "games", gameID), (doc) => {
    //         console.log("Current data: ", doc.data());
    //         setGameStatus(true);
    //     });
    // },[gameStatus]);

    // async function getGameStatus (id) {
    //     const docRef = doc(db, "games", id);
    //     const docSnap = await getDocs(docRef);
    //     console.log(docSnap.data());
    // }
    // getGameStatus(gameID);

    const _showQuiz = () => {
        setShowQuiz(!showQuiz);
        console.log(showQuiz);
    }
    
    return (
        <div>
            {gameID}
            { showQuiz &&
                <div>
                    <Quiz a = { gameID } /> 
                    <button>Next</button>
                    <button onClick = { _showQuiz }>Lobby</button>
                </div>
            }

            { !showQuiz &&
                <div>
                    <p>Hello</p>
                    <button>Start</button>
                    <button onClick = { _showQuiz }>Quiz</button>
                </div>
            }
        </div>
    );
}