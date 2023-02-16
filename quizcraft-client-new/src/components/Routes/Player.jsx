import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom"
import { doc, onSnapshot, getDoc } from 'firebase/firestore';
import {db} from "../firebase";

import Quiz from '../component/Quiz';
import WaitingRoom from "../component/WaitingRoom";
// import ChatRoom from '../Multiplayer/Main';

export default function Player () {
    const navigate = useNavigate()
    let { gameId, playerId } = useParams();
    const [showQuiz,setShowQuiz] = useState(true);
    const gameID = gameId;

    return (
        <div>
            {gameID}
            { showQuiz &&
                <div>
                    <Quiz a = { gameID } />
                </div>
            }
            { showQuiz &&
                <div>
                    <WaitingRoom a = { gameID } />
                </div>
            }
            {/* <ChatRoom /> */}
        </div>
    )
}