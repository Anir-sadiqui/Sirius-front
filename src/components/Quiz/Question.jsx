// frontend/components/Quiz/Question.jsx
import React from 'react';

function Question({ question, onAnswerChange, onSubmit, currentAnswer }) {
    const formatOption = (option) => {
        // Capitalize first letter and make other letters lowercase
        return option.charAt(0).toUpperCase() + option.slice(1).toLowerCase();
    };

    const renderInput = () => {
        switch(question?.questionType?.toUpperCase()) {
            case 'NUMERIC':
                return (
                    <div className="input-group">
                        <input
                            type="number"
                            value={currentAnswer}
                            onChange={onAnswerChange}
                            className="numeric-input"
                        />
                        {question.unit && (
                            <span className="unit-label">
                                {question.unit.toLowerCase() === 'kg' ? 'kg' :
                                    question.unit.toLowerCase() === 'cm' ? 'cm' :
                                        question.unit}
                            </span>
                        )}
                    </div>
                );

            case 'BOOLEAN':
                return (
                    <div className="boolean-options">
                        {['yes', 'no'].map((option) => (
                            <label key={option} className="boolean-option">
                                <input
                                    type="radio"
                                    name="boolean-answer"
                                    value={option}
                                    checked={currentAnswer.toLowerCase() === option}
                                    onChange={onAnswerChange}
                                />
                                {formatOption(option)}
                            </label>
                        ))}
                    </div>
                );

            case 'MULTIPLE_CHOICE':
                const options = question.options ? question.options.split(',') : [];
                return (
                    <select
                        value={currentAnswer}
                        onChange={onAnswerChange}
                        className="select-input"
                    >
                        <option value="">Select an option</option>
                        {options.map((option, index) => (
                            <option key={index} value={option.trim().toLowerCase()}>
                                {formatOption(option)}
                            </option>
                        ))}
                    </select>
                );

            default:
                return <input
                    type="text"
                    value={currentAnswer}
                    onChange={onAnswerChange}
                    className="text-input"
                />;
        }
    };

    return (
        <div className="question-container">
            <h2 className="question-text">{question?.questionText}</h2>
            <div className="input-container">
                {renderInput()}
            </div>
            <button
                onClick={onSubmit}
                disabled={!currentAnswer}
                className="submit-button"
            >
                {question ? 'Next Question' : 'Start Quiz'}
            </button>
        </div>
    );
}

export default Question;