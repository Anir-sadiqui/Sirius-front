import React, { useState, useEffect } from "react";
import api from "../../axios";

const SearchBar = ({ onSearch }) => {
    const [specialites, setSpecialites] = useState([]);
    const [selectedSpecialite, setSelectedSpecialite] = useState("");

    useEffect(() => {
        const fetchSpecialites = async () => {
            try {
                const response = await api.get("/api/medecins/specialites");
                setSpecialites(response.data);
            } catch (error) {
                console.error("Erreur chargement spécialités:", error);
            }
        };
        fetchSpecialites();
    }, []);

    const handleSearch = (e) => {
        const value = e.target.value;
        setSelectedSpecialite(value);
        onSearch(value);
    };

    return (
        <div className="mb-6 w-full max-w-md mx-auto">
            <select
                value={selectedSpecialite}
                onChange={handleSearch}
                className="w-full p-3 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:outline-none"
            >
                <option value="">Choisir une spécialité...</option>
                {specialites.map((spec, index) => (
                    <option key={index} value={spec}>
                        {spec}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SearchBar;
