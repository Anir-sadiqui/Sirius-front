// frontend/components/Quiz/Question.jsx
import React from 'react';

function Question({ question, onAnswerChange, onSubmit, currentAnswer }) {
    const renderInput = () => {
        if (question?.questionType === 'number') {
            return (
                <>
                    <input type="number" value={currentAnswer} onChange={onAnswerChange} />
                    {question.unit && <span style={{marginLeft: "5px"}}> {question.unit}</span>}
                </>
            );
        } else if (question?.questionType === 'select') {
            const options = question.options ? question.options.split(',') : [];
            return (
                <select value={currentAnswer} onChange={onAnswerChange}>
                    <option value="">Select</option>
                    {options.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            );
        } else {
            return <input type="text" value={currentAnswer} onChange={onAnswerChange} />;
        }
    };

    return (
        <div>
            <h2>{question?.questionText}</h2>
            {renderInput()}
            <button onClick={onSubmit} disabled={!question}>
                Next
            </button>
        </div>
    );
}

export default Question;