import React, { useState, useRef } from 'react';
import './Quiz.css';
import { quizData } from '../assets/data';

const Quiz = () => {
    const [index, setIndex] = useState(0);
    const [question, setQuestion] = useState(quizData[index]);
    const [lock, setLock] = useState(false);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const optionsRef = useRef(null);

    const checkAns = (e, ans) => {
        if (!lock) {
            if (question.ans === ans) {
                e.target.classList.add("correct");
                setScore(prev => prev + 1);
            } else {
                e.target.classList.add("wrong");
            }
            setLock(true);
        }
    }

    const next = () => {
        if (lock) {
            if (index === quizData.length - 1) {
                // Set flag to show result
                setShowResult(true);
            } else {
                // Clear existing colors
                const options = optionsRef.current.querySelectorAll('li');
                options.forEach(option => {
                    option.classList.remove("correct", "wrong");
                });

                // Move to next question
                const newIndex = index + 1;
                setIndex(newIndex);
                setQuestion(quizData[newIndex]);
                setLock(false);
            }
        }
    }

    return (
        <div className='container'>
            <h1>QUIZ APP</h1>
            <hr />
            {showResult ? (
                <div className="result">
                    <h1>"Thank you for using our app! We hope to see you again soon."</h1>
                    <h2>Your score is: {score} / {quizData.length}</h2>
                </div>
            ) : (
                <>
                    <h2>{index + 1}. {question.question}</h2>
                    <ul ref={optionsRef}>
                        <li onClick={(e) => checkAns(e, 1)}>{question.option1}</li>
                        <li onClick={(e) => checkAns(e, 2)}>{question.option2}</li>
                        <li onClick={(e) => checkAns(e, 3)}>{question.option3}</li>
                        <li onClick={(e) => checkAns(e, 4)}>{question.option4}</li>
                    </ul>
                    <button onClick={next}>Next</button>
                    <div className="index">{index + 1} of {quizData.length} questions</div>
                </>
            )}
        </div>
    )
}

export default Quiz;
