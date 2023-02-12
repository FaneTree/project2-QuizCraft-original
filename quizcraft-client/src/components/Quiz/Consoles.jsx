import React, { useState, useEffect } from 'react';
import Select from "react-dropdown-select";
import axios from "axios";

const CATEGORIES_URL = "https://opentdb.com/api_category.php";

export default function Consoles(props){

    return(
        <div>
            <h3>Quiz Consoles</h3>
            <section>
            Number of questions:
            <input type="number" placeholder="Number of Questions [1..50]"  min="1" max="50"/>
            </section>
            <section>
            Category:
            <Select options={props.categories} labelField='name' valueField='id' onChange={ props.onSelectCategory }/>
            </section>
            <section>
            Difficulty:
            <Select options={props.difficulties} labelField='name' valueField='id' onChange={ props.onSelectDifficulty } />
            </section>
        </div>
    )
}
