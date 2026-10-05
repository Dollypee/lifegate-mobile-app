import axios from 'axios';

const DEV_BASE_URL = 'http://10.0.2.2:5098/api';
const PROD_BASE_URL = 'https://lifegatechurchapp-1.onrender.com/api';

export const BASE_URL = __DEV__ ? DEV_BASE_URL : PROD_BASE_URL;

export const API = {
  sermons: `${BASE_URL}/YouTube`,
  clips: `${BASE_URL}/YouTube/clips`,
  events: `${BASE_URL}/events`,
  members: `${BASE_URL}/members`,
  bible: `${BASE_URL}/bible`,
} as const;

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor — good place to attach auth tokens later
apiClient.interceptors.request.use(
  (config) => {
    // e.g. config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor — centralised error handling
apiClient.interceptors.response.use(
  (response) => response.data, 
  (error) => {
    if (error.response) {
      // Server responded with a non-2xx status
      console.error(`API Error ${error.response.status}:`, error.response.data);
    } else if (error.request) {
      // Request was made but no response received (network down, timeout)
      console.error('Network error — no response received:', error.request);
    } else {
      console.error('Request setup error:', error.message);
    }
    return Promise.reject(error);
  },
);