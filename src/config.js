
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export const API = `${API_BASE_URL}/api/students`;

export const AUTH_API = `${API_BASE_URL}/api/auth`;
