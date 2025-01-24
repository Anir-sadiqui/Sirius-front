// frontend/components/Quiz/Result.jsx
import React from 'react';

function Result({ result, onRestart }) {
    return (
        <div>
            <h2>Your Result</h2>
            <p>{result}</p>
            <button onClick={onRestart}>Restart Quiz</button>
        </div>
    );
}

export default Result;