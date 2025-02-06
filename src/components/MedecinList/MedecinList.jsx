import React, { useState } from "react";
import Calendrier from "../Calendrier/Calendrier";
import api from "../../axios";

const MedecinList = ({ medecins }) => {
    const [selectedMedecin, setSelectedMedecin] = useState(null);
    const [disponibilites, setDisponibilites] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleMedecinClick = async (medecin) => {
        if (selectedMedecin?.id === medecin.id) return; // Empêcher le rechargement inutile

        setSelectedMedecin(medecin);
        setDisponibilites([]); // Réinitialise immédiatement avant chargement
        setLoading(true);

        try {
            const response = await api.get(`/api/medecins/disponibilites?medecinId=${medecin.id}`);
            console.log(" Disponibilités récupérées :", response.data);
            setDisponibilites(response.data);
        } catch (error) {
            console.error(" Erreur récupération disponibilités :", error);
            setDisponibilites([]);
        } finally {
            setLoading(false); // Désactive le chargement
        }
    };

    return (
        <div className="space-y-4">
            {medecins.length > 0 ? (
                medecins.map((medecin) => (
                    <div
                        key={medecin.id}
                        className={`p-4 border rounded shadow-md cursor-pointer hover:bg-gray-100 ${
                            selectedMedecin?.id === medecin.id ? "bg-blue-100" : "bg-white"
                        }`}
                        onClick={() => handleMedecinClick(medecin)}
                    >
                        <h2 className="text-xl font-semibold">{medecin.nom}</h2>
                        <p className="text-gray-600">{medecin.specialite}</p>
                    </div>
                ))
            ) : (
                <p className="text-gray-500">Aucun médecin trouvé.</p>
            )}

            {selectedMedecin && (
                <div className="mt-4">
                    <h2 className="text-xl font-bold mb-2 text-gray-800">
                        Disponibilités de {selectedMedecin.nom}
                    </h2>
                    {loading ? (
                        <p className="text-blue-500">Chargement des disponibilités...</p>
                    ) : (
                        <Calendrier disponibilites={disponibilites} />
                    )}
                </div>
            )}
        </div>
    );
};

export default MedecinList;
