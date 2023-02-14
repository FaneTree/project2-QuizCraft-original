import React, { useState, useEffect } from 'react';
import Consoles from './Consoles';
import axios from 'axios';

const CATEGORIES_URL = "https://opentdb.com/api_category.php";

export default function Quizs() {
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
        const selectedDifficulty = difficulties.find(d => d.id === difficulty);
        const difficultyName = selectedDifficulty ? selectedDifficulty.name.toLowerCase() : '';
        const URL = `https://opentdb.com/api.php?amount=${ questionCount }&category=${ category }&difficulty=${ difficultyName }`
        console.log(URL);
    };

    return (
        <div>
            <h1>Quizs</h1>
            <Consoles
                categories={categories} difficulties={difficulties}
                onSubmit={generateURL}
            />
        </div>
    );
}
