const axios = require('axios');
const config = require('../config/config.json');

//const url = 'http://clinicdenovobackend.kwintechnologies.com:3000/api/';
//const url = "http://localhost:900/api/";

// Create an instance of Axios with common configuration
const apiInstance = axios.create({
    baseURL: config.url,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add an interceptor to automatically add the token to requests
apiInstance.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// Export the apiInstance
module.exports = apiInstance;
