import axios from 'axios';

// Dynamically set the baseURL based on environment
const baseURL =
    import.meta.env.MODE === 'development'
        ? import.meta.env.VITE_API_BASE_URL_LOCAL
        : import.meta.env.VITE_API_BASE_URL_VM;

// Configure Axios instance
const api = axios.create({
    baseURL: baseURL,
    timeout: 5000, // Augmenté pour prévenir les timeout trop courts
    headers: {
        'Authorization': 'Bearer yourToken', // Remplace "yourToken" par ton token réel ou supprime si inutile
        'Content-Type': 'application/json'
    },
    withCredentials: true, // Nécessaire si les cookies ou sessions sont utilisés
});

// Add interceptors for logging and debugging
api.interceptors.request.use(
    (request) => {
        console.log('Request URL:', request.url);
        console.log('Request Headers:', request.headers);
        return request;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        console.log('Response Data:', response.data);
        return response;
    },
    (error) => {
        console.error('Response error:', error.response || error.message);
        return Promise.reject(error);
    }
);

export default api;
