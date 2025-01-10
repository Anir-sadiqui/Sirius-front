import React, { useState } from "react";
import axios from "../../axios";
import "./Registration.css";
import { Link, useNavigate } from "react-router-dom";

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        nom: "",
        prenom: "",
        age: "",
        poids: "",
        height: "",
        email: "",
        phoneNumber: "",
        address: "",
        identifier: "",
        password: "",
        sexe: "",
    });
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check passwords on the frontend first for new registrations
        if (formData.password !== confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }

        try {
            const response = await axios.post("/api/patients/register", formData);
            if (response.data.message === "Patient with this identifier already exists.") {
                setMessage(
                    <>
                        {response.data.message} <Link to="/login">Please Log In</Link>
                    </>
                );
            } else if (response.data.message === "Patient registered successfully!") {
                setMessage(response.data.message + ". Redirecting to login...");
                navigate("/login");
            } else {
                setMessage(response.data.message); // Handle other potential backend messages
            }
        } catch (error) {
            setMessage(error.response?.data?.message || "An error occurred");
        }
    };

    return (
        <div className="registration-container">
            <h2>Register a New Patient</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="nom" placeholder="Name" onChange={handleChange} required />
                <input type="text" name="prenom" placeholder="Prenom" onChange={handleChange} required />
                <input type="number" name="age" placeholder="Age" onChange={handleChange} required />
                <div className="form-group">
                    <select id="sexe" name="sexe" value={formData.sexe} onChange={handleChange} required>
                        <option value="">Select Sex</option>
                        <option value="HOMME">Homme</option>
                        <option value="FEMME">Femme</option>
                    </select>
                </div>
                <input type="number" name="poids" placeholder="Weight (kg)" onChange={handleChange} required />
                <input type="number" name="height" placeholder="Height (cm)" onChange={handleChange} />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} />
                <input type="text" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} />
                <textarea name="address" placeholder="Address" onChange={handleChange}></textarea>
                <input type="text" name="identifier" placeholder="Identifier" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    required
                />
                <button type="submit">Register</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default RegistrationForm;