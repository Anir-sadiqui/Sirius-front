import axios from 'axios';

// Dynamically set the baseURL based on environment
const baseURL =
    import.meta.env.MODE === 'development'
        ? import.meta.env.VITE_API_BASE_URL_LOCAL
        : import.meta.env.VITE_API_BASE_URL_VM;

// Configure Axios instance
const api = axios.create({
    baseURL: baseURL,
    timeout: 1000,
    headers: { 'Authorization': 'Bearer yourToken' },
});

export default api;
