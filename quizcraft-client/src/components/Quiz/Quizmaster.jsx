import React, { useState, useEffect } from 'react';
import Consoles from './Consoles';
import axios from 'axios';
import Quiz from "./Quiz";

const CATEGORIES_URL = "https://opentdb.com/api_category.php";

export default function Quizmaster() {
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


    const generateURL = ({ questionCount, category, difficulty }) => {
        // const selectedDifficulty = difficulties.find(d => d.id === difficulty);
        // const difficultyName = selectedDifficulty ? selectedDifficulty.name.toLowerCase() : '';
        const URL = `https://opentdb.com/api.php?amount=${ questionCount }&category=${ category }&difficulty=${ difficulty.toLowerCase() }`
        console.log(URL);
        return URL
    };

    // state to store all the questions and answers received from the API


    return (
        <div>
            <h1>Quizs</h1>
            <Consoles
                categories={categories} difficulties={difficulties}
                onSubmit={generateURL}
            />

            <Quiz  />
        </div>
    );
}
