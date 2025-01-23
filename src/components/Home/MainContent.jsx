// eslint-disable-next-line no-unused-vars
import React from 'react';
import './MainContent.css';


const MainContent = () => {
    return (
        <main className="content">
            <h1>Hello From EpiSante</h1>
            <p>Manage your healthcare data efficiently.</p>
            <div className="card-container">
                <div className="card" onClick={() => window.location.href = '/dashboard'}>
                    <h2>Tableau de bord</h2>
                    <p>View and manage patient records.</p>

                </div>

                <div className="card">
                    <h2>Rendez-Vous</h2>
                    <p>Prendre Votre Rendez-Vous  (Coming Soon).</p>
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