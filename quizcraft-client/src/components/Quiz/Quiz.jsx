import React, {useEffect, useState} from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";


export default function Quiz (props){
    console.log(props.a);

    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        getQuestions();
    },[])

    // retrieve questions from the Firestore
    async function getQuestions(gameID){

        const docRef = doc(db, "games",props.a);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const questions = docSnap.data().room;
            setQuestions(questions)
            console.log("question data ======= ", questions);
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }

        
    }
    return (
        <div>
            <p>
                Welcome to Game Room <strong>{props.a}</strong>
            </p>
            <p>
                The Host is <strong>{ questions.host }</strong>
            </p>
            <div>
                { questions.questions.map((question, index) => {
                    return (
                        <div key={index}>
                            <p>{question[index].questionText}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}