import React, { useState } from 'react';
import Select from "react-dropdown-select";
// import { NavLink, useNavigate } from 'react-router-dom';

export default function Consoles(props){
    // const navigate = useNavigate();

    const [questionCount, setQuestionCount] = useState(0);
    const [category, setCategory] = useState(null);
    const [difficulty, setDifficulty] = useState(null);

    const handleCategoryChange = (selectedItems) => {
        const categoryId = selectedItems[0].id;
        setCategory(categoryId);
    }

    const handleDifficultyChange = (selectedItems) => {
        const difficultyId = selectedItems[0].name;
        setDifficulty(difficultyId);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onSubmit({ questionCount, category, difficulty });
        // setQuestionCount(0);
        // setCategory(null);
        // setDifficulty(null);

        // navigate('/quiz');
    }

    return(
        <div>
            <h3>Quiz Consoles</h3>
            <form onSubmit={handleSubmit}>
                <section>
                    Number of questions:
                    <input type="number" name="questionCount" value={questionCount} onChange={(e) => setQuestionCount(e.target.value)} min="1" max="15" />
                </section>
                <section>
                    Category:
                    <Select options={props.categories} labelField='name' valueField='id' onChange={handleCategoryChange} />
                </section>
                <section>
                    Difficulty:
                    <Select options={props.difficulties} labelField='name' valueField='id' onChange={handleDifficultyChange} />
                </section>
                <section>
                    <input type="submit" value="Submit"/>
                </section>
            </form>
        </div>
    )
}
