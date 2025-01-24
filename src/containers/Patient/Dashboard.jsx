// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { generatePatientBilan, getPatientInfo } from 'src/api/Patient';
import Modal from './Modal';
import './Dashboard.css';

const Dashboard = () => {
    const [patientInfo, setPatientInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bilanMessage, setBilanMessage] = useState("");

    const userEmail = localStorage.getItem('userEmail');

    useEffect(() => {
        if (userEmail) {
            loadPatientInfo(userEmail);
        } else {
            setError("Veuillez vous connecter");
            window.location.href = '/';
        }
    }, []);

    const loadPatientInfo = (email) => {
        setLoading(true);
        setError("");

        getPatientInfo(email)
            .then((response) => {
                setPatientInfo(response);
            })
            .catch((error) => {
                setError(error.response?.data?.error || "Erreur de chargement");
            })
            .finally(() => setLoading(false));
    };

    const handleGenerateBilan = () => {
        generatePatientBilan(userEmail)
            .then((response) => {
                setBilanMessage(response.messageBilan);
                setIsModalOpen(true);
            })
            .catch((error) => {
                setError(error.response?.data?.error || "Erreur de génération");
            });
    };

    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="dashboard">
            <h2>Tableau de Bord</h2>
            {error && <p className="error-message">{error}</p>}

            {loading ? (
                <p>Chargement...</p>
            ) : patientInfo ? (
                <div className="patient-info">
                    <div className="info-grid">
                        <div><strong>Nom:</strong> {patientInfo.nom}</div>
                        <div><strong>Prénom:</strong> {patientInfo.prenom}</div>
                        <div><strong>Email:</strong> {patientInfo.email}</div>
                        <div><strong>Téléphone:</strong> {patientInfo.telephone}</div>
                        <div><strong>Adresse:</strong> {patientInfo.adresse}</div>
                        <div><strong>Taille:</strong> {patientInfo.taille} cm</div>
                        <div><strong>Poids:</strong> {patientInfo.poids} kg</div>
                        <div><strong>Sexe:</strong> {patientInfo.sexe === 'H' ? 'Homme' : 'Femme'}</div>
                        <div><strong>Âge:</strong> {patientInfo.age} ans</div>
                    </div>
                    <button onClick={handleGenerateBilan}>Générer Bilan</button>
                </div>
            ) : (
                <p>Aucune donnée trouvée</p>
            )}

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <h3>Bilan Médical</h3>
                <div className="bilan-content">
                    {bilanMessage || "Aucun bilan disponible"}
                </div>
                <button className="close-button" onClick={closeModal}>
                    Fermer
                </button>
            </Modal>
        </div>
    );
};

export default Dashboard;