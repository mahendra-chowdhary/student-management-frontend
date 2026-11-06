
import { AUTH_API } from "../config";

async function authRequest(url, options) {
  let response;

  try {
    response = await fetch(url, options);
  } catch {
    throw new Error(
      "Unable to connect to the server. Please check whether the backend is running."
    );
  }

  let data;

  try {
    const text = await response.text();
    data = text ? JSON.parse(text) : null;
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(
      data?.message || `Request failed with status ${response.status}`
    );
  }

  return data;
}

export async function login(username, password) {
  const data = await authRequest(`${AUTH_API}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!data?.token || !data?.username || !data?.role) {
    throw new Error("Invalid login response from server.");
  }

  const user = {
    username: data.username,
    role: data.role,
  };

  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(user));

  return user;
}

export async function register(username, email, password) {
  return await authRequest(`${AUTH_API}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  });
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}
