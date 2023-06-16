import axios from "axios";

const { VITE_API_BASE_URL } = process.env;

const instance = axios.create({
  baseURL: VITE_API_BASE_URL,
});

instance.interceptors.request.use((config) => {
  config.headers["User-Id"] = "35f90ac8-ccbd-4fba-aa91-caeef7928494";
  return config;
});

export const apiService = instance;
