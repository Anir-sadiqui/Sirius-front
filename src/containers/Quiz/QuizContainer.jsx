import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import Question from '../../components/Quiz/Question';
import Result from '../../components/Quiz/Result';

function QuizContainer() {
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [currentAnswer, setCurrentAnswer] = useState('');
    const [userAnswers, setUserAnswers] = useState({});
    const [showResult, setShowResult] = useState(false);
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchNextQuestion();
    }, []);

    const fetchNextQuestion = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/quiz/next-question');
            console.log(response.data)
            setCurrentQuestion(response.data);
            setCurrentAnswer('');
        } catch (error) {
            if (error.response && error.response.status === 204) {
                // No more questions, fetch the result
                fetchResult();
            } else {
                console.error('Error fetching next question:', error);
            }
        } finally {
            setLoading(false);
        }
    };

    const fetchResult = async () => {
        try {
            const response = await axios.get('/api/quiz/result');
            setResult(response.data);
            setShowResult(true);
        } catch (error) {
            console.error('Error fetching result:', error);
        }
    };

    const handleAnswerChange = (event) => {
        setCurrentAnswer(event.target.value);
    };

    const handleSubmitAnswer = async () => {
        if (currentQuestion) {
            setUserAnswers({ ...userAnswers, [currentQuestion.id]: currentAnswer });
            try {
                await axios.post('/api/quiz/submit-answer', null, {
                    params: { questionId: currentQuestion.id, answer: currentAnswer },
                });
                const hasMoreQuestions = await axios.get('/api/quiz/has-more-questions')

                if(hasMoreQuestions.data) {
                    fetchNextQuestion()
                }else {
                    fetchResult()
                }
            } catch (error) {
                console.error('Error submitting answer:', error);
            }
        }
    };

    const handleRestartQuiz = () => {
        axios
            .post('/api/quiz/reset')
            .then(() => {
                setCurrentQuestion(null);
                setCurrentAnswer('');
                setUserAnswers({});
                setShowResult(false);
                setResult('');
                fetchNextQuestion();
            })
            .catch((error) => {
                console.error('Error resetting quiz:', error);
            });
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            {!showResult && currentQuestion && (
                <Question
                    question={currentQuestion}
                    onAnswerChange={handleAnswerChange}
                    onSubmit={handleSubmitAnswer}
                    currentAnswer={currentAnswer}
                />
            )}

            {showResult && <Result result={result} onRestart={handleRestartQuiz} />}

            {!currentQuestion && !showResult && !loading && <p>No questions available.</p>}
        </div>
    );
}

export default QuizContainer;