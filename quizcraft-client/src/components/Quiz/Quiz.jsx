import React, {useEffect, useState} from "react";
import { getDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase";
import {useAuthState} from 'react-firebase-hooks/auth';


export default function Quiz (props){
    const [user] = useAuthState(auth);
    const gameID =props.a; 
    console.log("current game id :", props.a);

    // store the attempts made by a player and sent to the server (by _handleAnswerClick function)
    // const playerAttempts = {
    //     player: user.displayName,
    //     answers:[]
    // }

    const [roomData, setRoomData] = useState([]);
    const [questionData, setQuestionData] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0); // number of the current question, starting from 0

    useEffect(() => {
        getQuestions();
    },[])

    useEffect(()=>{
        console.log("room Data ==== ", roomData);
        console.log("Question data ==== ", questionData);
        console.log("Current question ==== ", currentQuestion);
    },[roomData, questionData,currentQuestion])

    // retrieve questions from the Firestore
    async function getQuestions(){

        const docRef = doc(db, "games",gameID.toString());
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const questions = docSnap.data().room;
            setCurrentQuestion(questions.currentQuestion);
            setRoomData(questions)
            setQuestionData(questions.questions)
            
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }

    // function to check if the answer clicked is correct or not
    const _handleAnswerClick = (answer) => {
        const correctAnswer = questionData[currentQuestion].correctAnswer;
        // if(correctAnswer === answer){
        //     playerAttempts.answers.push(1);
        // } else {
        //     playerAttempts.answers.push(0);
        //         }
    }
    
    return (
        <div>
            <p>
                Welcome to Game Room <strong>{props.a}</strong>
            </p>
            <p>
                The Host is <strong>{ roomData.host }</strong>
            </p>

            <p>
                { questionData.map((question, index) => {
                    if (index === currentQuestion) {  // Only show the current question
                    return (
                        <div key={index}>
                            <p>Queston #{ index+1}: {question[index].questionText}</p>
                            <ol>
                                { question[index].shuffledAnswers.map((answer, index) => 
                                <li key={index}><button value={answer} onClick={ _handleAnswerClick }>{ answer }</button></li>)}
                            </ol>
                        </div>
                        
                    )}
                })}
            </p>

        </div>
    )
}