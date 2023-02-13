import React, { useState, useEffect } from 'react';
import Consoles from './Consoles';
import axios from 'axios';
import Quiz from "./Quiz";
import { NavLink, useNavigate } from 'react-router-dom';

const CATEGORIES_URL = "https://opentdb.com/api_category.php";

export default function Quizmaster() {

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
    const fetchQuestions = ({ questionCount, category, difficulty }) => {
        const url = `https://opentdb.com/api.php?amount=${ questionCount }&category=${ category }&difficulty=${ difficulty.toLowerCase() }`;
        axios.get(url).then((response) => {
            // response.datat.results -> return an array of objects
            // each object is a question-answer set
            console.log("response data: ", response.data.results);
            const questions = response.data.results.map(result => {
                return {
                    question: result.question,
                    correctAnswer: result.correct_answer,
                    incorrectAnswers: result.incorrect_answers
                };
            });
            setFetchedQuestions(questions);
            setConsoleVisble(false)
            // Call the resetCurrentQuestion function passed down from the child component

        }).catch(error => {
            console.error(error);
        });
    };


    return (
        <div>
            <h1>Quiz Master Board - Parent Component </h1>
            { consoleVisble&& <Consoles
                categories={categories} difficulties={difficulties}
                onSubmit={fetchQuestions}
            />}

            { !consoleVisble &&
                <Quiz questions={fetchedQuestions} quizComplete={quizComplete}/>}
        </div>
    );
}
