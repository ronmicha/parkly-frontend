import axios from "axios";
import { type ResponseMiddleware } from "./types";

const { VITE_API_BASE_URL } = process.env;

const instance = axios.create({
  baseURL: VITE_API_BASE_URL,
  withCredentials: true,
});

export const addResponseMiddleware = (middleware: ResponseMiddleware): void => {
  instance.interceptors.response.use(
    (response) => {
      middleware.onSuccess?.(response);
      return response;
    },
    async (error) => {
      middleware.onError?.(error);
      return await Promise.reject(error);
    }
  );
};

export const apiService = instance;
