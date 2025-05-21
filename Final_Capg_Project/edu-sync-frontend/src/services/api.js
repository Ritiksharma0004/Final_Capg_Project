import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:7180/api',  // make sure this is correct
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
