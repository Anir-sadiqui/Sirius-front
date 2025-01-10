// LoginPage.js
import React, { useState } from 'react';
import axios from '../../axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // Create LoginPage.css

const LoginPage = () => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [loginMessage, setLoginMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("Attempting login with:", { identifier, password }); // Log input values
      try {
          const response = await axios.post('/api/patients/login', { identifier, password });
          console.log("Login Response:", response); // Log the entire response
          if (response.data.message === "Login successful") {
              navigate('/profile', { state: { patientName: response.data.patientName } });
          } else {
              setLoginMessage(response.data.message);
          }
      } catch (error) {
          console.error("Login Error:", error); // Log the error object
          setLoginMessage(error.response?.data?.message || 'Login failed');
      }
  };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Identifier"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            {loginMessage && <p className="error">{loginMessage}</p>}
        </div>
    );
};

export default LoginPage;