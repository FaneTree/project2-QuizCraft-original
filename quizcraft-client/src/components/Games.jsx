import React from "react";
import axios from 'axios';
import { useEffect, useState } from 'react';

// need to use session tokens so users don't see the same question twice (yet to be included)

export default function Games(){
    
    // most of lines 9 - 98 copied from https://github.com/AndyUGA/trivia-api-tutorial-project/blob/main/src/App.js
    const [triviaQuestion, setTriviaQuestion] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [currentPoints, setCurrentPoints] = useState(0);
    const [allPossibleAnswers, setAllPossibleAnswers] = useState([]);
    const [loading, setLoading] = useState(false);

    // combines correct & incorrect answers into a single array
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
    }

    useEffect(() => {
        getTriviaData();
    }, []);

    function verifyAnswer(selectedAnswer) {
        if (selectedAnswer === correctAnswer) {
            getTriviaData();
            setCurrentPoints(currentPoints + 1);
        } else {
            setCurrentPoints(currentPoints - 1);
            // show selected answer is incorrect & show correct answer
            // getTriviaData();
        }
    }

    // converts html code to regular characters
    function removeCharacters(question) {
        // regex aye
        return question.replace(/(&quot\;)/g, "\"").replace(/(&rsquo\;)/g, "\"").replace(/(&#039\;)/g, "\'").replace(/(&amp\;)/g, "\"");
    }
    
    return(
        <div className="Games">
            <header className="Games-header">
                {loading ? "Trivia Question Loading..." : <div>
                    <div>
                        Current Points: {currentPoints}
                    </div>
                    <br />

                {triviaQuestion.map((triviaData, index) => 
                    <div key={index}>
                        <div>
                            {removeCharacters(triviaData.question)}
                        </div>
                        <br />
                        <div className="allAnswers">
                            {
                                allPossibleAnswers.map((answer, index) => 
                                <div key ={index}>
                                    <button className="answerBtns" key={index} onClick={() => verifyAnswer(answer)} >
                                        {removeCharacters(answer)}
                                    </button>
                                </div> 
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