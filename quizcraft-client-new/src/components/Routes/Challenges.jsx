import React from "react";
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Challenges (){
    
    // most of lines are copied from https://github.com/AndyUGA/trivia-api-tutorial-project/blob/main/src/App.js
    const [triviaQuestion, setTriviaQuestion] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [currentPoints, setCurrentPoints] = useState(0);
    const [allPossibleAnswers, setAllPossibleAnswers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [incorrectAnswer, setIncorrectAnswer] = useState("");
    const [attempted, setAttempted] = useState(false);


    // // combines correct & incorrect answers into a single array
    async function combineAllAnswers(incorrectAnswers, correctAnswer) {
        let allAnswers = [];
        incorrectAnswers.map((item) => {
            item.incorrect_answers.map((incorrectAnswer) => {
                allAnswers.push(incorrectAnswer)
            });
        });
        allAnswers.push(correctAnswer);
        // randomise order of answers in array
        allAnswers.sort(() => Math.random() - 0.5);
        setAllPossibleAnswers(allAnswers);
    }

    // make api call to trivia api 
    async function getTriviaData() {
        // set loading boolean to true so that we know to show loading text 
        setLoading(true);

        // make trivia api call using axios 
        const resp = await axios.get("https://opentdb.com/api.php?amount=1");

        setTriviaQuestion(resp.data.results);
        setCorrectAnswer(resp.data.results[0].correct_answer);

        // combines correct & incorrect answers into single array 
        await combineAllAnswers(resp.data.results, resp.data.results[0].correct_answer);

        // set loading boolean to false so that we know to show trivia question 
        setLoading(false);
        setAttempted(false);
    }

    useEffect(() => {
        getTriviaData();
    }, []);

    function verifyAnswer(selectedAnswer) {
        setAttempted(true);
        if (selectedAnswer === correctAnswer) {
            setCurrentPoints(currentPoints + 1);
        } else {
            setIncorrectAnswer(selectedAnswer)
            setCurrentPoints(currentPoints - 1);
            // next line won't happen until host clicks for next question
        }
        setTimeout(getTriviaData, 1000);
    }

    // converts html code to regular characters
    function removeCharacters(question) {
        // regex aye
        return question.replace(/(&quot\;)/g, "\"").replace(/(&rsquo\;)/g, "\"").replace(/(&#039\;)/g, "\'").replace(/(&amp\;)/g, "\"");
    }
    
    return(
        <div className="Games midtext textwhite">
            <header className="Games-header">
                {loading ? "Trivia Question Loading..." : <div>
                    <div className="midtag">
                        Current Points: {currentPoints}
                    </div>
                    <br />

                {triviaQuestion.map((triviaData, index) => 
                    <div key={index}>
                        <div className="midtag">
                            {removeCharacters(triviaData.question)}
                        </div>
                        <br />
                        <div className="allAnswers">
                            {
                                allPossibleAnswers.map((answer, id) => {
                                    let style;
                                    // if (id === 1) {
                                    //     style = {backgroundColor: "#AEC6CF"}
                                    // } else if (id === 2) {
                                    //     style = {backgroundColor: "#F49AC2"}
                                    // } else if (id === 3) {
                                    //     style = {backgroundColor: "#967BB6"}
                                    // } else {
                                    //     style = {backgroundColor: "#FFB347"}
                                    // }

                                    if (attempted && answer === correctAnswer) {
                                        style = {backgroundColor: "green"}
                                    } else if (attempted && answer === incorrectAnswer) {
                                        style = {backgroundColor: "red"}
                                    } else if (attempted && answer !== correctAnswer && incorrectAnswer) {
                                        style = {backgroundColor: "#D3D3D3"}
                                    }
                                    return (<div key ={id}>
                                    <button className="answerBtns" style={style} key={id} onClick={() => verifyAnswer(answer)} >
                                        {removeCharacters(answer)}
                                    </button>
                                    </div> )
                                }
                                )
                            }
                        </div>
                    </div>
                )}
                </div>
                }
            </header>
        </div>
    );
}