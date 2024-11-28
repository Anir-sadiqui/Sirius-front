import React from 'react';
import './footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-copyright">
                    <p>&copy; 2024 EpiSante. All rights reserved.</p>
                </div>
                <div className="footer-nav">
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/services">Services</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </div>
                <div className="footer-social">
                    <p>Follow us on:</p>
                    <a href="#">Social Media 1</a>
                    <a href="#">Social Media 2</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;