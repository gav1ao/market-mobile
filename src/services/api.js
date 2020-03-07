import axios from 'axios';

const api = axios.create({
    baseURL: 'https://gav1ao-market-api.herokuapp.com'
});

export default api;