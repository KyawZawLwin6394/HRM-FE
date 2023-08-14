import axios from 'axios';

const url = 'http://hrmbackend.kwintechnologykw11.com:5000/api/';
    const storeToken = localStorage.getItem('token');
const apiInstance = axios.create({
    baseURL: url,
    headers: {Authorization: `Bearer ${storeToken}`,
        'Content-Type': 'application/json'
    }
});

apiInstance.interceptors.request.use(config => {

    if (storeToken) {
        config.headers['Authorization'] = `Bearer ${storeToken}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default apiInstance;
