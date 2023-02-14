import React, { useState, useEffect } from 'react';
import Consoles from './Consoles';
import axios from 'axios';
import Quiz from "./Quiz";
import Scores from "./Scores";
import CountTimer from "../CountTimer";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const CATEGORIES_URL = "https://opentdb.com/api_category.php";

export default function Quizmaster() {
    // store the scores and messages from Quiz and send them to Scores
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(10);
    const [messages, setMessages] = useState("");

    const [consoleVisble,setConsoleVisble] = useState(true);
    const quizComplete = ()=>{
        setConsoleVisble(true);
        console.log("quiz complete !!!!!")
    }

    // state to receive category info from the API
    const [categories, setCategories] = useState([]);
    // call the category API and store the info to the state
    useEffect(() => {
        axios.get(CATEGORIES_URL).then((response) => {
            setCategories(response.data.trivia_categories);
        });
    }, []);

    // state to store the selected difficulty
    const difficulties = [
        {id:1, name:"Easy"},
        {id:2, name:"Medium"},
        {id:3, name:"Hard"}];


    // state to store all the questions and answers received from the API
    const [fetchedQuestions, setFetchedQuestions] = useState([]);

    // TODO: a variable to create a 'game' path which can be later used an identifier
    let new_path = '002';
    const fetchQuestions = ({ questionCount, category, difficulty, timerSet }) => {
        const url = `https://opentdb.com/api.php?amount=${ questionCount }&category=${ category }&difficulty=${ difficulty.toLowerCase() }`;
        axios.get(url)
            .then((response) => {
                console.log("response data: ", response.data.results);
                const questions = response.data.results.map((result, index) => {
                    return {
                        question: result.question,
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
                            questionText: result.question,
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


    const fetchScore = ( score , scoreMessage ) => {
        setScore(score);
        setMessages(scoreMessage);
        // console.log("!!!!$$$$", scoreMessage)
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
                    timer = { timer }
                />
            }

            { !consoleVisble &&
                <CountTimer
                    timer = { timer } 
                />
            }

        </div>
    );
}
