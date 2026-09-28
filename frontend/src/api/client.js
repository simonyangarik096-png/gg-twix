import axios from 'axios';

// Axios instance — բոլոր API կանչերի համար
const api = axios.create({
  baseURL: '/api',
  timeout: 30000
});

// Request interceptor — JWT token-ը ավտոմատ ավելացնում է ամեն request-ին
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('ggtwix_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — եթե 401 (token անվավեր) → ջնջել token-ը
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('ggtwix_token');
      if (window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;