// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { generatePatientBilan, getPatientInfo } from 'src/api/Patient';
import Modal from './Modal'; // Importez la modale
import './Dashboard.css';

const Dashboard = () => {
    const [patientInfo, setPatientInfo] = useState(null);
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false); // État pour la modale
    const [bilanMessage, setBilanMessage] = useState(""); // Message du bilan

    // Fonction pour valider l'email
    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    // Charger les informations du patient
    const loadPatientInfo = (email) => {
        if (!email || !validateEmail(email)) {
            setError("Veuillez entrer un email valide.");
            return;
        }

        setLoading(true);
        setError("");

        getPatientInfo(email)
            .then((response) => {
                setPatientInfo(response);
            })
            .catch((error) => {
                console.error("Erreur complète :", error);
                if (error.response) {
                    setError(`Erreur ${error.response.status} : ${error.response.data.error}`);
                } else {
                    setError("Erreur lors du chargement des informations.");
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    // Générer le bilan du patient
    const handleGenerateBilan = () => {
        if (patientInfo) {
            generatePatientBilan(patientInfo.email)
                .then((response) => {
                    console.log("Réponse du serveur :", response); // Log la réponse
                    setBilanMessage(response.messageBilan); // Utiliser messageBilan au lieu de bilan
                    setIsModalOpen(true); // Ouvrir la modale
                })
                .catch((error) => {
                    console.error("Erreur lors de la génération du bilan :", error);
                    setError("Erreur lors de la génération du bilan.");
                });
        } else {
            setError("Aucune information de patient chargée.");
        }
    };

    // Fermer la modale
    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="dashboard">
            <h2>Patient Dashboard</h2>
            <div className="email-input">
                <input
                    type="email"
                    placeholder="Entrez l'email du patient"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button onClick={() => loadPatientInfo(email)} disabled={loading}>
                    {loading ? "Chargement..." : "Charger les infos"}
                </button>
            </div>

            {error && <p className="error-message">{error}</p>}

            {loading ? (
                <p>Chargement en cours...</p>
            ) : patientInfo ? (
                <div className="patient-info">
                    <p><strong>Nom :</strong> {patientInfo.nom}</p>
                    <p><strong>Prénom :</strong> {patientInfo.prenom}</p>
                    <p><strong>Email :</strong> {patientInfo.email}</p>
                    <p><strong>Téléphone :</strong> {patientInfo.telephone}</p>
                    <p><strong>Adresse :</strong> {patientInfo.adresse}</p>
                    <p><strong>Taille :</strong> {patientInfo.taille} cm</p>
                    <p><strong>Poids :</strong> {patientInfo.poids} kg</p>
                    <p><strong>Sexe :</strong> {patientInfo.sexe === 'H' ? 'Homme' : 'Femme'}</p>
                    <p><strong>Âge :</strong> {patientInfo.age} ans</p>
                    <button onClick={handleGenerateBilan}>Lancer un bilan</button>
                </div>
            ) : (
                <p>Aucune information de patient chargée.</p>
            )}

            {/* Modale pour afficher le bilan */}
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <h3>Bilan du patient</h3>
                <p>{bilanMessage}</p> {/* Afficher le message du bilan */}
            </Modal>
        </div>
    );
};

export default Dashboard;