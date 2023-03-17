import axios from 'axios';

export const BACKEND_BASE_URL = 'http://localhost:8000';

const $api = axios.create({
    withCredentials: true,
    baseURL: BACKEND_BASE_URL,
    // credentials: "same-origin",
    // credentials: "include",
    headers: { 'Content-Type': 'application/json'},
});

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
});

export default $api;
