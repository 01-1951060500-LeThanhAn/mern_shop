import axios from "axios";
export const BASE_URL = "https://shop-server-fawn.vercel.app";
const token = JSON.parse(localStorage.getItem("tokenAdmmin"));
export const userApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    token: `Bearer ${token}`,
  },
});

export const baseApi = axios.create({
  baseURL: BASE_URL,
});
