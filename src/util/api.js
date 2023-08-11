import axios from 'axios';
const url = 'http://hrmbackend.kwintechnologykw11.com:5000/api/';

const apiInstance = axios.create({
    baseURL: url,
    headers: {
        'Content-Type': 'application/json'
    }
});

apiInstance.interceptors.request.use(config => {
    //const token = localStorage.getItem('token');
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVkZW50aWFscyI6IjY0ZDMzY2ZiY2IzYjM4MTI5MTczOGY5My5tKnFmNjNHT2V1OSo5b0RldENiNjNZLnJvb3R1c2VyQGdtYWlsLmNvbSIsImlhdCI6MTY5MTc0MDI5NCwiZXhwIjoxNjkxODI2Njk0fQ.KUUxi86d3QKFVkTJV0jrG0vyh2f2NQmtTS8O23in5tk'
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default apiInstance;
