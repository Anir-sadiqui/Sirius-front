import axios from 'axios';

const api = axios.create({
    baseURL: 'http://172.31.250.60:9090',
    timeout: 1000,
    headers: {'Authorization': 'Bearer yourToken'}
});

export default api;