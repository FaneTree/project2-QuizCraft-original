import React, { useState } from "react";
import { useParams } from "react-router-dom"
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from "../firebase";

import Quiz from '../component/Quiz';
import WaitingRoom from "../component/WaitingRoom";
// import ChatRoom from '../Multiplayer/Main';


export default function Host () {
    const [showQuiz, setShowQuiz] = useState(false);
    const [gameStatus, setGameStatus] = useState(false);

    let { gameId, playerId } = useParams();
    const gameID = gameId;

    const unsub = onSnapshot(doc(db, "games", gameID), (doc) => {
        console.log("Current data: ", doc.data());
    });

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
                    {/* change current question + 1*/}
                    <button>Next</button>
                    <button onClick = { _showQuiz }>Lobby</button>
                </div>
            }

            { !showQuiz &&
                <div>
                    <WaitingRoom a = { gameID } />
                    {/* <ChatRoom /> */}
                    {/* change game status to true */}
                    <button>Start</button>
                    <button onClick = { _showQuiz }>Quiz</button>
                </div>
            }
        </div>
    );
}