import React, {useEffect, useState} from "react";

export default function Quiz (props){
    const [allQuestions, setAllQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [choices, setChoices] = useState([]);
    const [score, setScore] = useState(0);

    // make a copy of the question-answer set in the child
    useEffect(() => {
        setAllQuestions(props.questions);
        console.log("useEffect: ", props.questions);
        setCurrentQuestion(0);
    }, [props.questions]);

    const currentQuestionData = allQuestions[currentQuestion];


    // store all the answers in an array and display the answers for a user to click-choose
    // function to shuffle an array
    const shuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    useEffect(()=>{
        if (currentQuestionData) {
            setChoices(shuffle([...currentQuestionData.incorrectAnswers, currentQuestionData.correctAnswer]))
        }
    },[currentQuestionData])


    const updateCurrentQuestion = () => {
       if(currentQuestion >= allQuestions.length -1 ){
           setTimeout(()=>props.quizComplete(),7000 )
       }
       setCurrentQuestion(currentQuestion + 1);
   }

   // function to handle the answer selected
    const _handleAnswerSelected = (answer) => {
        console.log("event listener: ", answer.target.value);
        console.log("correct answer: ", currentQuestionData.correctAnswer);
        if(answer.target.value === currentQuestionData.correctAnswer){
            setScore(score + 1);
            updateCurrentQuestion();
        }else{
            setScore(score - 1);
            updateCurrentQuestion();
        }
    }

    return (
        <div>
            <h3>Quiz - child component</h3>
            {currentQuestionData && (
                <div>
                    <h4>{currentQuestionData.question}</h4>
                    <h5>Score: {score}</h5>
                    <ul>{choices.map((choice, index)=>{
                        return <li key={index}><button onClick={ _handleAnswerSelected } value={choice}>{ choice }</button></li>
                        }
                    )}</ul>
                </div>
            )}
            <button onClick={ updateCurrentQuestion }>
                Next Question
            </button>
        </div>
    );
}