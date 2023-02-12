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

    // state to store the selected category
    const [selectedCategories, setSelectedCategories] = useState([]);

    // callback function to receive selected category
    const handleSelectCategory = (category) => {
        console.log(category) //TODO: save it for URL generation
        setSelectedCategories(category); //TODO: this is NOT working
        console.log(selectedCategories)
    };

    // state to store the selected difficulty
    const difficulties = [
        {
         id:1,
         name:"Easy"
        },
        {
            id:2,
            name:"Medium"
        },
        {
            id:3,
            name:"Hard"
        }
    ];
    const [selectedDifficulties, setSelectedDifficulties] = useState([]);

    // callback function to receive selected difficulty
    const handleSelectDifficulty = (difficulty) => {
        console.log("diff",difficulty) //TODO: save it for URL generation
        setSelectedDifficulties([...selectedDifficulties, difficulty]);
        console.log("selected diff", selectedDifficulties)
    }

    return (
        <div>
            <h1>Quizs</h1>
            <Consoles
                categories={categories} onSelectCategory={handleSelectCategory}
                difficulties={difficulties} onSelectDifficulty={handleSelectDifficulty}
            />

        </div>
    );
}
