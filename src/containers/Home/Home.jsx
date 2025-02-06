import React, { useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import MedecinList from "../../components/MedecinList/MedecinList";
import api from "../../axios";

const Home = () => {
    const [medecins, setMedecins] = useState([]);

    // 🔥 Fonction pour récupérer les médecins selon la spécialité
    const handleSearch = async (specialite) => {
        if (specialite) {
            try {
                const response = await api.get(`/api/medecins/specialite/${specialite}`);
                console.log("✅ Médecins récupérés :", response.data);
                setMedecins(response.data);
            } catch (error) {
                console.error("❌ Erreur récupération médecins :", error);
            }
        } else {
            setMedecins([]); // Réinitialise la liste si aucune spécialité n'est sélectionnée
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Rechercher un médecin</h1>
            <SearchBar onSearch={handleSearch} />
            <MedecinList medecins={medecins} />
        </div>
    );
};

export default Home;
