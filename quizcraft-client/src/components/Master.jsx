import React, { useState, useEffect } from 'react';
import Consoles from './Quiz/Consoles';
import axios from 'axios';
import Quiz from "./Quiz/Quiz";
import Scores from "./Quiz/Scores";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

const CATEGORIES_URL = "https://opentdb.com/api_category.php";

export default function Master() {

    // Firebase User Management ///////////////


    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            console.log("Master - current user :", uid, user.displayName);
            // ...
        } else {
            // User is signed out
            // ...
        }
    });


    // trivia API //////////////////
    // Category:
    const [categories, setCategories] = useState([]);
    // call the category API and store the info to the state
    useEffect(() => {
        axios.get(CATEGORIES_URL).then((response) => {
            setCategories(response.data.trivia_categories);
        });
    }, []);

    // Difficulty:
    const difficulties = [
        {id:1, name:"Easy"},
        {id:2, name:"Medium"},
        {id:3, name:"Hard"}];


    // Chosen question sets are stored here:
    const [fetchedQuestions, setFetchedQuestions] = useState([]);


    // Question Text Cleansing: converts html code to regular characters
    function removeCharacters(question) {
        // regex aye
        return question.replace(/(&quot\;)/g, "\"").replace(/(&rsquo\;)/g, "\"").replace(/(&#039\;)/g, "\'").replace(/(&amp\;)/g, "\"");
    }
    // TODO: a variable to create a 'game' path which can be later used an identifier
    let new_path = '009';

    // Function: 1) receive API data and store them in different States; 2) pass the data to Firestore
    const fetchQuestions = ({ questionCount, category, difficulty, timerSet }) => {
        const url = `https://opentdb.com/api.php?amount=${ questionCount }&category=${ category }&difficulty=${ difficulty.toLowerCase() }`;
        axios.get(url)
            .then((response) => {
                console.log("response data: ", response.data.results);
                const questions = response.data.results.map((result, index) => {
                    return {
                        question: removeCharacters(result.question),
                        correctAnswer: result.correct_answer,
                        incorrectAnswers: result.incorrect_answers
                    };
                });
                setTimer(timerSet);
                setFetchedQuestions(questions);
                setConsoleVisble(false);

                const questionsToFirestore = response.data.results.map((result, index) => {
                    return {
                        [index]: {
                            questionText: removeCharacters(result.question),
                            correct: result.correct_answer,
                            incorrect: result.incorrect_answers,
                        }
                    };
                });
                console.log("FIRESTORE :", questionsToFirestore);
                return questionsToFirestore;
            })
            .then((questionsToFirestore) => {
                const docRef = doc(db, "games", new_path);
                setDoc(docRef, { questions: questionsToFirestore });
            })
            .catch(error => {
                console.error(error);
            });
    };

    // Child Component /////////////////
    // store the scores and messages from Quiz and send them to Scores
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(10);
    const [messages, setMessages] = useState("");



    // create timer function to countdown and pass to Quiz

    const countDownTimer = (counter) => {
        if (counter > 0) {
            setTimeout(() => { counter = counter - 1 } , 1000 );
        }
        countDownTimer(counter);
    }

    // Child component: Quiz /////////////////
    // function to receive the scores calculated in the Quiz
    const fetchScore = ( score , scoreMessage ) => {
        setScore(score);
        setMessages(scoreMessage);
        // console.log("!!!!$$$$", scoreMessage)
    }

    // function to check if a set of quiz is completed
    const [consoleVisble,setConsoleVisble] = useState(true);
    const quizComplete = ()=>{
        setConsoleVisble(true);
        console.log("quiz complete !!!!!")
    }

    return (
        <div>
            <h1>Quiz Master Board - Parent Component </h1>

            {!consoleVisble &&
                <Scores 
                    currentScore={score} 
                    currentMessage={messages} 
                />}

            { consoleVisble && 
                <Consoles
                    categories={categories} 
                    difficulties={difficulties}
                    onSubmit={fetchQuestions} 
                />
            }

            { !consoleVisble &&
                <Quiz 
                    questions={ fetchedQuestions } 
                    quizComplete={ quizComplete } 
                    fetchScore={ fetchScore } 
                    Countdown = { countDownTimer }
                    timer = { timer }
                />
            }
        </div>
    );
}
