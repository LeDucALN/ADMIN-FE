import axios from "axios";

export const BASE_URL = "http://localhost:5000/api";
export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});
axiosInstance.interceptors.request.use((config) => {
    const tokenJson = localStorage.getItem("accessToken");
    const token = tokenJson ? JSON.parse(tokenJson) : null;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;