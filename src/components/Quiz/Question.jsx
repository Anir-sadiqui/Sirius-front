// frontend/components/Quiz/Question.jsx
import React from 'react';

function Question({ question, onAnswerChange, onSubmit }) {
    return (
        <div>
            <h2>{question?.questionText}</h2>
            <input type="text" onChange={onAnswerChange} />
            <button onClick={onSubmit} disabled={!question}>
                Next
            </button>
        </div>
    );
}

export default Question;