import React, {useEffect, useState} from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useParams } from "react-router-dom"


export default function Quiz (props){
    let { gameId, playerId } = useParams()
    console.log("Game ID: ", props)

    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        getQuestions();
    },[])

    // retrieve questions from the Firestore
    async function getQuestions(gameID){

        const docRef = doc(db, "games",gameID);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }

        // getDocs(doc(db, "games", "704382")).then(response=>{
        //     console.log('response', response);
            // const questions = response.docs.map(doc => ({
            //     id: doc.id,
            //   ...doc.data()
            // }))
            // console.log("questions passed to the state: ", questions)
            // setQuestions(questions)
        // }).catch(error=> console.log(error.message))
    }
    return (
        <div>
            Quiz is coming
        </div>
    )
}