import axios from 'axios';

const API_URL = 'https://fastfood-vkr0.onrender.com/api/v1/'; 

const api = axios.create({
  baseURL: API_URL,                
  withCredentials: true,            
  headers: {
    'Content-Type': 'application/json', 
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);


export default api; 