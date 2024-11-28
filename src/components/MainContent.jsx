import React from 'react';
import './MainContent.css';


const MainContent = () => {
    return (
        <main className="content">
            <h1>Hello From EpiSante</h1>
            <p>Manage your healthcare data efficiently.</p>
            <div className="card-container">
                <div className="card" onClick={() => window.location.href = '/patients'}>
                    <h2>Patient Management</h2>
                    <p>View and manage patient records.</p>

                </div>

                <div className="card">
                    <h2>Appointments</h2>
                    <p>Schedule and manage appointments (Coming Soon).</p>
                </div>

                <div className="card">
                    <h2>Doctors</h2>
                    <p>Manage doctor profiles (Coming Soon).</p>
                </div>

            </div>
        </main>
    );
};
export default MainContent;