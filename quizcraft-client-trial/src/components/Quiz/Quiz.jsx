import React, {useEffect, useState} from "react";
import CountTimer from "../CountTimer";

export default function Quiz (props){
    const [allQuestions, setAllQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [choices, setChoices] = useState([]);
    const [score, setScore] = useState(0);
    const [scoreMessage, setScoreMessage] = useState("Enjoy your quiz!");


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
           setTimeout(()=>props.quizComplete(), 3000 )
       }
       setTimeout(()=>setCurrentQuestion(currentQuestion + 1), 2000);
   }

   // function to handle the answer selected
    const _handleAnswerSelected = (answer) => {
        console.log("event listener: ", answer.target.value);
        console.log("correct answer: ", currentQuestionData.correctAnswer);
        if(answer.target.value === currentQuestionData.correctAnswer){
            const updatedScore = score + 1
            setScore( updatedScore );
            // props.fetchScore( score )

            const updatedScoreMessage = 'Good Job. You score 1 point!'
            setScoreMessage ( updatedScoreMessage )
            props.fetchScore ( score, scoreMessage ) // send back 2 arguments at the same time instead of doing separately
            updateCurrentQuestion();
        }else{
            const updatedScore = score - 1
            setScore( updatedScore );
            // props.fetchScore( score )

            const updatedScoreMessage = 'Damn, your idot. You lost 1 point!'
            setScoreMessage ( updatedScoreMessage )
            props.fetchScore ( score, scoreMessage )

            updateCurrentQuestion();
        }
    }

    return (
        <div>
            <h3>Quiz - child component</h3>
            {currentQuestionData && (
                <div>
                    <h3>Question #{ currentQuestion +1 }: {currentQuestionData.question}</h3>
                    <ul>{choices.map((choice, index)=>{
                        return <li key={index}><button onClick={ _handleAnswerSelected } value={choice}>{ choice }</button></li>
                        }
                    )}</ul>
                </div>
            )}
            <CountTimer />
        </div>
    );
}