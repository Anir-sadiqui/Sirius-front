// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { login, register } from 'src/api/Patient'; // Importez les méthodes API
import './AuthPage.css'; // Assurez-vous de créer ce fichier CSS

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true); // Pour basculer entre connexion et inscription
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [age, setAge] = useState("");
    const [taille, setTaille] = useState("");
    const [poids, setPoids] = useState("");
    const [adresse, setAdresse] = useState("");
    const [telephone, setTelephone] = useState("");
    const [sexe, setSexe] = useState("");
    const [error, setError] = useState("");

    // Fonction pour gérer la connexion
    const handleLogin = async () => {
        try {
            const response = await login(email, password);
            console.log("Connexion réussie :", response);
            // Stocker l'email dans le localStorage ou un état global (ex: Redux, Context)
            localStorage.setItem('userEmail', email);
            // Rediriger vers une autre page (ex: Dashboard)
            if (login(email, password)) {
                window.location.href = '/dashboard';
            }
        } catch (error) {
            console.error("Erreur lors de la connexion :", error);
            setError("Email ou mot de passe incorrect.");
        }
    };

    // Fonction pour gérer l'inscription
    const handleRegister = async () => {
        const patient = {
            nom,
            prenom,
            age,
            taille,
            poids,
            adresse,
            email,
            telephone,
            sexe,
            mdp: password, // Assurez-vous que le backend attend "mdp" pour le mot de passe
        };

        try {
            const response = await register(patient);
            console.log("Inscription réussie :", response);
            // Stocker l'email dans le localStorage ou un état global
            localStorage.setItem('userEmail', email);
            // Rediriger vers une autre page (ex: Dashboard)
            window.location.href = '/dashboard';
        } catch (error) {
            console.error("Erreur lors de l'inscription :", error);
            setError("Erreur lors de l'inscription. Veuillez réessayer.");
        }
    };

    return (
        <div className="auth-page">
            <div className={`auth-container ${isLogin ? '' : 'switch'}`}>
                {/* Formulaire de connexion */}
                {isLogin ? (
                    <div className="login-form">
                        <h2>Connexion</h2>
                        {error && <p className="error-message">{error}</p>}
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button onClick={handleLogin}>Me connecter</button>
                        <p>
                            Pas encore inscrit ?{' '}
                            <span onClick={() => setIsLogin(false)}>Créer un compte</span>
                        </p>
                    </div>
                ) : (
                    <div className="register-form">
                        <h2>Inscription</h2>
                        {error && <p className="error-message">{error}</p>}
                        <input
                            type="text"
                            placeholder="Nom"
                            value={nom}
                            onChange={(e) => setNom(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Prénom"
                            value={prenom}
                            onChange={(e) => setPrenom(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Âge"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Taille (cm)"
                            value={taille}
                            onChange={(e) => setTaille(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Poids (kg)"
                            value={poids}
                            onChange={(e) => setPoids(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Adresse"
                            value={adresse}
                            onChange={(e) => setAdresse(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="tel"
                            placeholder="Téléphone"
                            value={telephone}
                            onChange={(e) => setTelephone(e.target.value)}
                        />
                        <select value={sexe} onChange={(e) => setSexe(e.target.value)}>
                            <option value="">Sélectionnez votre sexe</option>
                            <option value="HOMME">Homme</option>
                            <option value="FEMME">Femme</option>
                        </select>
                        <input
                            type="password"
                            placeholder="Mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button onClick={handleRegister}>S&#39;inscrire</button>
                        <p>
                            Déjà inscrit ?{' '}
                            <span onClick={() => setIsLogin(true)}>Se connecter</span>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AuthPage;