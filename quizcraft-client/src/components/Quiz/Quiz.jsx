import React, {useEffect, useState} from "react";

export default function Quiz (props){
    const [allQuestions, setAllQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);

    useEffect(() => {
        setAllQuestions(props.questions);
        console.log("useEffect: ", props.questions);
        setCurrentQuestion(0);
    }, [props.questions]);

    const currentQuestionData = allQuestions[currentQuestion];

   const updateCurrentQuestion = () => {
       if(currentQuestion >= allQuestions.length -1 ){
           props.quizComplete()
       }
       setCurrentQuestion(currentQuestion + 1);
   }

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
            <button onClick={ updateCurrentQuestion }>
                Next Question
            </button>
        </div>
    );
}