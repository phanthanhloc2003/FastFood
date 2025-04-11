import axios from 'axios';
import { refreshToken } from './auth';

const API_URL = 'https://fastfood-vkr0.onrender.com/api/v1/'; 
// const API_URL = 'http://localhost:3000/api/v1/'; 

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
    else{
      console.log("sds",token)
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { config, response } = error;
    if (config.url !== "/login" && response && response.status === 401) {
      const originalRequest = config;
      if (!originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const newAccessToken = await refreshToken();
          const { accessToken } = newAccessToken;
          if (accessToken) {
            localStorage.setItem("accessToken", accessToken);
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${accessToken}`;
            return axios(originalRequest);
          }
        } catch (refreshError) {
          console.error("Refresh token failed:", refreshError);
        }
      }
    }
    console.error("API Error:", response ? response.data : error.message);
    return Promise.reject(error);
  }
);


export default api; 
