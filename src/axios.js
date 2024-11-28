import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:9090',
    timeout: 1000,
    headers: {'Authorization': 'Bearer yourToken'}
});

export default api;