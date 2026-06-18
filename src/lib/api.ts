import axios from "axios";
import { showSessionExpired } from "./sessionDialog";

let isSessionExpired = false;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers = config.headers ?? {};
    (config.headers as Record<string, string>).Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      if (isSessionExpired) {
        return Promise.reject(error);
      }

      isSessionExpired = true;
      showSessionExpired("Your session has expired. Please login again.");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }

    return Promise.reject(error);
  },
);

export default api;
