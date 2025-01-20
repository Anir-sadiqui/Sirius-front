import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MainContent.css';

const MainContent = () => {
    const navigate = useNavigate(); // Utilisation du hook useNavigate pour naviguer

    return (
        <main className="content">
            <h1>Hello From EpiSante</h1>
            <p>Manage your healthcare data efficiently.</p>
            <div className="card-container">
                <div className="card" onClick={() => navigate('/patients')}>
                    <h2>Patient Management</h2>
                    <p>View and manage patient records.</p>
                </div>

                <div className="card" onClick={() => navigate('/rendezvous')}>
                    <h2>Rendez-Vous</h2>
                    <p>Prendre votre Rendez-Vous.</p>
                </div>

                <div className="card">
                    <h2>Diagnostique</h2>
                    <p>Fait Votre Diagnostique (Coming Soon).</p>
                </div>
            </div>
        </main>
    );
};

export default MainContent;
