// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import "./RegisterForm.css";

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        nom: "",
        prenom: "",
        age: "",
        taille: "",
        poids: "",
        adresse: "",
        email: "",
        telephone: "",
        sexe: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Formulaire soumis : " + JSON.stringify(formData, null, 2));
    };

    const handleReset = () => {
        setFormData({
            nom: "",
            prenom: "",
            age: "",
            taille: "",
            poids: "",
            adresse: "",
            email: "",
            telephone: "",
            sexe: "",
        });
    };

    return (
        <div className="register-form-container">
            <h1>Inscription</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nom</label>
                    <input
                        type="text"
                        name="nom"
                        value={formData.nom}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Prénom</label>
                    <input
                        type="text"
                        name="prenom"
                        value={formData.prenom}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Âge</label>
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Taille (cm)</label>
                    <input
                        type="number"
                        name="taille"
                        value={formData.taille}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Poids (kg)</label>
                    <input
                        type="number"
                        name="poids"
                        value={formData.poids}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Adresse</label>
                    <input
                        type="text"
                        name="adresse"
                        value={formData.adresse}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Numéro de téléphone</label>
                    <input
                        type="tel"
                        name="telephone"
                        value={formData.telephone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Sexe</label>
                    <select
                        name="sexe"
                        value={formData.sexe}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Choisissez...</option>
                        <option value="Homme">Homme</option>
                        <option value="Femme">Femme</option>
                    </select>
                </div>
                <div className="form-actions">
                    <button type="submit" className="btn btn-validate">Valider</button>
                    <button type="button" className="btn btn-cancel" onClick={handleReset}>
                        Annuler
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;
