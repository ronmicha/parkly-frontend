import axios from "axios";

const { VITE_API_BASE_URL } = process.env;

const instance = axios.create({
  baseURL: VITE_API_BASE_URL,
});

export const addHeaders = (headers: Record<string, string>): void => {
  instance.interceptors.request.use((config) => {
    config.headers.set(headers);
    return config;
  });
};

export const apiService = instance;
