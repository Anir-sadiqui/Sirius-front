// eslint-disable-next-line no-unused-vars
import React from 'react';
import './MainContent.css';
import { useNavigate } from 'react-router-dom';



const MainContent = () => {
    const navigate = useNavigate();

    return (
        <main className="content">
            <h1>Hello From EpiSante</h1>
            <p>Manage your healthcare data efficiently.</p>
            <div className="card-container">
                <div className="card" onClick={() => window.location.href = '/dashboard'}>
                    <h2>Tableau de bord</h2>
                    <p>View and manage patient records.</p>

                </div>

                <div className="card" onClick={() => navigate('/rendezvous')}>
                    <h2>Rendez-Vous</h2>
                    <p>Prendre Votre Rendez-Vous.</p>
                </div>

                {/* Add a new card for the Quiz */}
                <div className="card" onClick={() => window.location.href = '/quiz'}>
                    <h2>Quick Test</h2>
                    <p>Take a fun personality test.</p>
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