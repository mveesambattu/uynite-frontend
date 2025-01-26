import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "https://yc66dd7dug.execute-api.us-east-2.amazonaws.com/profile/api", // Base URL for all API requests
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Add interceptors for request/response if needed
api.interceptors.request.use(
  (config) => {
    // Add authorization token or other headers if needed
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally if needed
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default api;
