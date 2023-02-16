import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from "../firebase";

import Quiz from '../component/Quiz';
import WaitingRoom from "../component/WaitingRoom";
// import ChatRoom from '../Multiplayer/Main';


export default function Host () {
    const [showQuiz, setShowQuiz] = useState(false);
    const [gameStatus, setGameStatus] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [roomData, setRoomData] = useState([]);

    let { gameId, playerId } = useParams();
    const gameID = gameId;
    const gamesDocRef = doc(db, "games", gameID.toString());

    const unsub = onSnapshot(doc(db, "games", gameID), (doc) => {
        console.log("Current data: ", doc.data());
    });
    unsub();

    const _showQuiz = () => {
        setShowQuiz(!showQuiz);
        console.log(showQuiz);
    }

    // onSnapshot to fetch roomData
    useEffect(() => {
        const unsubRoomData = onSnapshot(gamesDocRef,
            snapShot => {
                setRoomData(snapShot.data().room);
            });
        return () => unsubRoomData();
    }, []);

    // use OnSnapshot to fetch currentQuestion from Database;
    useEffect(
        ()=>{
            const unsubCurrentQuestion = onSnapshot(gamesDocRef,
                snapshot =>
                    setCurrentQuestion(snapshot.data().room.currentQuestion)
            );
            return () => unsubCurrentQuestion();
        },[])

    useEffect(()=>{
        console.log("current Question Number: ", currentQuestion)
    },[currentQuestion])

    const _handleClick = ()=>{
        setCurrentQuestion( currentQuestion + 1 );

        // update the currentQuestion number in the firestore
        updateDoc(doc(db, "games", gameID.toString()),{
            room:{
                ...roomData,
                currentQuestion: currentQuestion + 1 
            }
        })
    }
    
    return (
        <div>
            {gameID}
            { showQuiz &&
                <div>
                    <Quiz a = { gameID } /> 
                    {/* change current question + 1*/}
                    <button onClick={ _handleClick } >Next</button>
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