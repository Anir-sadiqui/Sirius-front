// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { login, register } from 'src/api/Patient';
import './AuthPage.css';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
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

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            localStorage.setItem('userEmail', email);
            window.location.href = '/main';
            // eslint-disable-next-line no-unused-vars
        } catch (error) {
            setError("Email ou mot de passe incorrect");
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
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
            mdp: password,
        };

        try {
            await register(patient);
            setIsLogin(true); // Switch to login form
            setError(""); // Clear errors
            setPassword(""); // Clear password field
        } catch (error) {
            setError("Erreur lors de l'inscription: " + error.message);
        }
    };

    return (
        <div className="auth-page">
            <div className={`auth-container ${isLogin ? '' : 'switch'}`}>
                {isLogin ? (
                    <form className="login-form" onSubmit={handleLogin}>
                        <h2>Connexion</h2>
                        {error && <p className="error-message">{error}</p>}
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit">Me connecter</button>
                        <p>
                            Pas encore inscrit ?{' '}
                            <span onClick={() => setIsLogin(false)}>Créer un compte</span>
                        </p>
                    </form>
                ) : (
                    <form className="register-form" onSubmit={handleRegister}>
                        <h2>Inscription</h2>
                        {error && <p className="error-message">{error}</p>}
                        <input
                            type="text"
                            placeholder="Nom"
                            value={nom}
                            onChange={(e) => setNom(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Prénom"
                            value={prenom}
                            onChange={(e) => setPrenom(e.target.value)}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Âge"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Taille (cm)"
                            value={taille}
                            onChange={(e) => setTaille(e.target.value)}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Poids (kg)"
                            value={poids}
                            onChange={(e) => setPoids(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Adresse"
                            value={adresse}
                            onChange={(e) => setAdresse(e.target.value)}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="tel"
                            placeholder="Téléphone"
                            value={telephone}
                            onChange={(e) => setTelephone(e.target.value)}
                            required
                        />
                        <select
                            value={sexe}
                            onChange={(e) => setSexe(e.target.value)}
                            required
                        >
                            <option value="">Sexe</option>
                            <option value="HOMME">Homme</option>
                            <option value="FEMME">Femme</option>
                        </select>
                        <input
                            type="password"
                            placeholder="Mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit">S'inscrire</button>
                        <p>
                            Déjà inscrit ?{' '}
                            <span onClick={() => setIsLogin(true)}>Se connecter</span>
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
};

export default AuthPage;