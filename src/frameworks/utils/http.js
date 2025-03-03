import axios from 'axios';

// Create an Axios instance
const http = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Replace with your API base URL
    timeout: 10000, // Request timeout
    headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
    },
});

// Request interceptor
http.interceptors.request.use(
    config => {
        // Add any custom logic before the request is sent
        // For example, adding an authorization token
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        // Handle request error
        return Promise.reject(error);
    }
);

// Response interceptor
http.interceptors.response.use(
    response => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        return response;
    },
    error => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Handle response error
        if (error.response && error.response.status === 401) {
            // Handle unauthorized error
            // For example, redirect to login page
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default http;