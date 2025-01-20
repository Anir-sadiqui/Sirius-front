import React, { useState } from 'react';
import './RendezVousPage.css';

const RendezVousPage = () => {
    const specialites = ['Cardiologie', 'Dermatologie', 'Orthopédie'];
    const medecins = [
        {
            id: 1,
            nom: 'Brown',
            prenom: 'Laura',
            specialite: 'Cardiologie',
            disponibilites: [
                { jour: '2025-01-15', heure: '09:00 - 10:00' },
                { jour: '2025-01-15', heure: '10:00 - 11:00' },
                { jour: '2025-01-17', heure: '14:00 - 15:00' },
            ],
        },
        {
            id: 2,
            nom: 'Taylor',
            prenom: 'James',
            specialite: 'Dermatologie',
            disponibilites: [
                { jour: '2025-01-16', heure: '10:00 - 11:00' },
                { jour: '2025-01-15', heure: '11:00 - 12:00' },
                { jour: '2025-01-18', heure: '15:00 - 16:00' },
            ],
        },
    ];

    const [selectedSpecialite, setSelectedSpecialite] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [filteredMedecins, setFilteredMedecins] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);

    const handleSpecialiteChange = (e) => {
        setSelectedSpecialite(e.target.value);
        setSelectedDate('');
        setFilteredMedecins([]);
        setSelectedSlot(null);
    };

    const handleDateChange = (e) => {
        const date = e.target.value;
        setSelectedDate(date);

        const filtered = medecins.filter((medecin) =>
            medecin.disponibilites.some((dispo) => dispo.jour === date)
        );
        setFilteredMedecins(filtered);
        setSelectedSlot(null);
    };

    const handleSlotSelection = (medecin, heure) => {
        setSelectedSlot({ medecin, heure });
    };

    const handleConfirm = () => {
        if (!selectedSlot) {
            alert('Veuillez sélectionner un créneau.');
            return;
        }
        alert(
            `Rendez-vous confirmé avec le Dr. ${selectedSlot.medecin.nom} ${selectedSlot.medecin.prenom} à ${selectedSlot.heure}`
        );
    };

    return (
        <div className="rendezvous-page">
            <header>
                <h1>Gestion des Rendez-Vous</h1>
            </header>

            <main>
                {/* Sélection de la spécialité */}
                <div className="form-section">
                    <label htmlFor="specialite">Choisir une spécialité :</label>
                    <select
                        id="specialite"
                        value={selectedSpecialite}
                        onChange={handleSpecialiteChange}
                    >
                        <option value="">-- Sélectionnez une spécialité --</option>
                        {specialites.map((specialite, index) => (
                            <option key={index} value={specialite}>
                                {specialite}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Sélection de la date */}
                {selectedSpecialite && (
                    <div className="form-section">
                        <label htmlFor="date">Choisir une date :</label>
                        <input
                            type="date"
                            id="date"
                            value={selectedDate}
                            onChange={handleDateChange}
                        />
                    </div>
                )}

                {/* Cartes des médecins */}
                {selectedDate && filteredMedecins.length > 0 && (
                    <div className="medecin-cards">
                        {filteredMedecins.map((medecin) => (
                            <div key={medecin.id} className="medecin-card">
                                <h3>Dr. {medecin.nom} {medecin.prenom}</h3>
                                <p>Spécialité : {medecin.specialite}</p>
                                <div className="disponibilites">
                                    <h4>Disponibilités :</h4>
                                    {medecin.disponibilites
                                        .filter((dispo) => dispo.jour === selectedDate)
                                        .map((dispo, index) => (
                                            <button
                                                key={index}
                                                className={`disponibilite-button ${
                                                    selectedSlot &&
                                                    selectedSlot.medecin.id === medecin.id &&
                                                    selectedSlot.heure === dispo.heure
                                                        ? 'selected'
                                                        : ''
                                                }`}
                                                onClick={() =>
                                                    handleSlotSelection(medecin, dispo.heure)
                                                }
                                            >
                                                {dispo.heure}
                                            </button>
                                        ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Confirmation */}
                {selectedSlot && (
                    <div className="confirmation-section">
                        <h3>Créneau sélectionné :</h3>
                        <p>
                            Médecin : {selectedSlot.medecin.nom} {selectedSlot.medecin.prenom} <br />
                            Spécialité : {selectedSlot.medecin.specialite} <br />
                            Heure : {selectedSlot.heure}
                        </p>
                        <button onClick={handleConfirm} className="confirm-button">
                            Confirmer le Rendez-Vous
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default RendezVousPage;
