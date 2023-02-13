import React, {useEffect, useState} from "react";

export default function Quiz (props){
    const [allQuestions, setAllQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);

    useEffect(() => {
        setAllQuestions(props.questions);
        console.log("useEffect: ", props.questions);
    }, [props.questions]);

    const currentQuestionData = allQuestions[currentQuestion];

    return (
        <div>
            <h3>Quiz - child component</h3>
            {currentQuestionData && (
                <div>
                    <p>{currentQuestionData.question}</p>
                    <p>Correct answer: {currentQuestionData.correctAnswer}</p>
                    <p>Incorrect answers: {currentQuestionData.incorrectAnswers.join(", ")}</p>
                </div>
            )}
            <button onClick={() => setCurrentQuestion(currentQuestion + 1)}>
                Next Question
            </button>
        </div>
    );
}