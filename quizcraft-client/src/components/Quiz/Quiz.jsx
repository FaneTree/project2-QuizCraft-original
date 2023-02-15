import React, { useEffect, useState } from "react";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Quiz(props) {
  const [user] = useAuthState(auth);
  const currentUser = user.displayName;

  const gameID = props.a;

  const [playerAttempts, setPlayerAttempts] = useState({});
  const [roomData, setRoomData] = useState([]);
  const [questionData, setQuestionData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const currentHost = roomData.host;

  useEffect(() => {
    getQuestions();
  }, []);

//   useEffect(() => {
//     console.log("room Data ==== ", roomData);
//     console.log("Question data ==== ", questionData);
//     console.log("Current question ==== ", currentQuestion);
//   }, [roomData, questionData, currentQuestion]);

  async function getQuestions() {
    const docRef = doc(db, "games", gameID.toString());
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const questions = docSnap.data().room;
      setCurrentQuestion(questions.currentQuestion);
      setRoomData(questions);
      setQuestionData(questions.questions);
    } else {
      console.log("No such document!");
    }
  }

  const _handleAnswerClick = (e) => {
    const answer = e.target.value;
    const correctAnswer = questionData[currentQuestion].correctAnswer;

    // create a copy of the playerAttempts object to update it
    const updatedPlayerAttempts = { ...playerAttempts };

    if (correctAnswer === answer) {
      updatedPlayerAttempts[currentUser] = [        ...(updatedPlayerAttempts[currentUser] || []),
        1,
      ];
    } else {
      updatedPlayerAttempts[currentUser] = [        ...(updatedPlayerAttempts[currentUser] || []),
        0,
      ];
    }

    setPlayerAttempts(updatedPlayerAttempts);

    console.log("playerAttempts ==== ", updatedPlayerAttempts);
  };

  async function addPlayerAttemptsToFirestore() {
    try {
      const docRef = doc(db, "games", gameID.toString());
      const gameDoc = await getDoc(docRef);

      if (gameDoc.exists()) {
        const gameData = gameDoc.data();
        const gameRoom = gameData.room;
        const playerAttemptsData = gameRoom.playerAttempts || {};

        // merge the updated player attempts with the existing data
        const updatedPlayerAttemptsData = {
          ...playerAttemptsData,
          ...playerAttempts,
        };

        await updateDoc(docRef, {
          "room.playerAttempts": updatedPlayerAttemptsData,
        });
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    addPlayerAttemptsToFirestore();
  }, [playerAttempts]);

  useEffect(() => {
    const questionTimer = setTimeout(() => {
      const updatedCurrentQuestion = currentQuestion + 1;

      const docRef = doc(db, "games", gameID.toString());

      updateDoc(docRef, {
        "room.currentQuestion": updatedCurrentQuestion
      }).then(() => {
        setCurrentQuestion(updatedCurrentQuestion);
      }).catch((error) => {
        console.error(error);
      });
    }, roomData.questionTimeLimit * 1000);

    return () => clearTimeout(questionTimer);
  }, [currentQuestion, roomData.questionTimeLimit, gameID]);

  return (
    <div>
      <p>
        Dear <strong>{currentUser}</strong>, Welcome to Game Room
        <strong>{props.a}</strong>
      </p>
      <p>
        The Host is <strong>{currentHost}</strong>
      </p>

      {questionData.map((question, index) => {
        if (index === currentQuestion) {
          return (
            <div key={index}>
              <p>
                Queston #{index + 1}: {question[index].questionText}
              </p>
              <ol>
                {question[index].shuffledAnswers.map((answer, index) => (
                  <li key={index}>
                    <button value={answer} onClick={_handleAnswerClick}>
                      {answer}
                    </button>
                  </li>
                ))}
              </ol>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}
