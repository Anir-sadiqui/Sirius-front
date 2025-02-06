import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:9090"; // ✅ Supprime le deuxième "/api"

const api = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: { 'Content-Type': 'application/json' },
});

export default api;
