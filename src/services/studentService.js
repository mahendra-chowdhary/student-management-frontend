import { API } from "../config";
export { API };

export async function request(url, options = {}) {
  let response;

  try {
    const token = localStorage.getItem("token");

    const headers = new Headers(options.headers);

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    response = await fetch(url, {
      ...options,
      headers,
    });
  } catch (error) {
    throw new Error(
      "Unable to connect to the server. Please check whether the backend is running.",
    );
  }

  const responseText = await response.text();

  let data = null;

  try {
    data = responseText ? JSON.parse(responseText) : null;
  } catch {
    data = responseText;
  }

  if (!response.ok) {
    const validationErrors = {};
    const fieldErrorData = data?.data || {};

    ["name", "email", "course"].forEach((field) => {
      if (typeof fieldErrorData[field] === "string") {
        validationErrors[field] = fieldErrorData[field];
      }
    });

    const error = new Error(
      Object.keys(validationErrors).length > 0
        ? "Please correct the highlighted fields"
        : data?.message ||
            data?.detail ||
            (typeof data === "string" && data) ||
            {
              400: "Bad request. Please check the submitted data.",
              401: "Unauthorized. Please log in.",
              403: "You do not have permission to perform this action.",
              404: "Requested student or resource was not found.",
              409: "Conflict. This record may already exist.",
              500: "Internal server error. Please try again later.",
              503: "Server is temporarily unavailable.",
            }[response.status] ||
            `Request failed with status ${response.status}`,
    );

    error.fieldErrors = validationErrors;
    throw error;
  }

  return data;
}
