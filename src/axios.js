import axios from 'axios';

const api = axios.create({
    baseURL: '<https://Epi.Sante.com>',
    timeout: 1000,
    headers: {'Authorization': 'Bearer yourToken'}
});

export default api;