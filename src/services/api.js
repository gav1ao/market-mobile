import axios from 'axios';

const api = axios.create({
    baseURL: 'https://market-api-legacy-beta.fly.dev'
});

export default api;