import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RendezVousComponent.css';

const RendezVousComponent = () => {
    const formatDateTime = (isoString) => {
        const options = {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(isoString).toLocaleString('fr-FR', options);
    };

    const [disponibilites, setDisponibilites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDisponibilites = async () => {
            try {
                const response = await axios.get('http://localhost:9090/disponibilites'); // Corrected port
                console.log('API Response:', response.data);
                setDisponibilites(response.data);
            } catch (err) {
                console.error('API Error:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchDisponibilites();
    }, []);

    return (
        <main className="content">
            <button onClick={() => navigate(-1)}>Back</button>
            <h1>Available Appointments</h1>
            {loading ? (
                <p>Loading appointments...</p>
            ) : error ? (
                <p>Error loading appointments: {error}</p>
            ) : (
                <div className="card-container">
                    {disponibilites.map((dispo) => (
                        <div key={dispo.id} className="card">
                            <h3>{dispo.medecin.nom}</h3>
                            <p className="specialty">{dispo.medecin.specialite}</p>
                            <div className="time-block">
                                <span className="time-icon">⏰</span>
                                <p>
                                    {formatDateTime(dispo.debut)}<br/>
                                    to<br/>
                                    {formatDateTime(dispo.fin)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
};

export default RendezVousComponent;