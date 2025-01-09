import React from 'react';
import './PageNotFound.css';

const PageNotFound = () => {
    return (
        <div className="page-not-found">
            <h1>404</h1>
            <p>Oops! The page you're looking for doesn't exist.</p>
            <a href="/" className="home-link">Go Back to Home</a>
        </div>
    );
};

export default PageNotFound;
