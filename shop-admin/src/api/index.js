import axios from "axios";
export const BASE_URL = "https://shop-server-fawn.vercel.app";
const TOKEN = JSON.parse(localStorage.getItem("tokenAdmin"));

axios.interceptors.request.use(
  (config) => {
    if (TOKEN) {
      config.headers.Authorization = `Bearer ${TOKEN}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export const baseApi = axios.create({
  baseURL: BASE_URL,
});

export const adminApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    token: `Bearer ${TOKEN}`,
  },
  timeout: 30000,
});
