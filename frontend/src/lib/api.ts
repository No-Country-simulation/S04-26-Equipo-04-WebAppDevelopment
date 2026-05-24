import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://s04-26-equipo-04-webappdevelopment.onrender.com/api";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para JWT
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});