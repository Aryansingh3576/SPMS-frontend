import axios from "axios";

// Prefer env var, but default to deployed backend
const DEFAULT_BASE_URL = "https://smart-plant-backend-up2a.onrender.com";
let baseURL = import.meta?.env?.VITE_API_URL || DEFAULT_BASE_URL;

// Ensure baseURL doesn't end with a slash
baseURL = baseURL.replace(/\/$/, "");

// Ensure /api prefix is included
if (!baseURL.includes("/api")) {
  baseURL = `${baseURL}/api`;
}

// Log for debugging (remove in production if desired)
console.log("API Base URL:", baseURL);

const API = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
