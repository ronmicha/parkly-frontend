import axios from "axios";
import { type ResponseMiddleware } from "./types";

const { VITE_API_BASE_URL } = process.env;

const instance = axios.create({
  baseURL: VITE_API_BASE_URL,
  withCredentials: true,
});

export const addResponseMiddleware = (middleware: ResponseMiddleware): void => {
  instance.interceptors.response.use((config) => {
    middleware(config);
    return config;
  });
};

export const apiService = instance;
