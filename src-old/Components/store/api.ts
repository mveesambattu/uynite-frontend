import axios from "axios";

const API_BASE_URL = "https://yc66dd7dug.execute-api.us-east-2.amazonaws.com";

// Function to fetch authentication token
const fetchAuthToken = async () => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/admin/auth/authenticate`,
      {
        username: "lsurisetti@uynite.com",
        password: "adminpassword",
      }
    );
    return response.data.token; // Assuming token is returned as response.data.token
  } catch (error) {
    console.error("Failed to get authentication token:", error);
    throw new Error("Authentication failed");
  }
};

// Create an Axios instance
const api = axios.create({
  baseURL: `${API_BASE_URL}/profile/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Fetch token if missing
api.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem("authToken");

    if (!token) {
      token = await fetchAuthToken(); // Fetch new token
      if (token) {
        localStorage.setItem("authToken", token); // Store token for future use
      }
    }

    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle API errors and token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.warn("Token expired, refreshing...");
      try {
        const newToken = await fetchAuthToken();
        localStorage.setItem("authToken", newToken);
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return api.request(error.config); // Retry original request with new token
      } catch (authError) {
        console.error("Token refresh failed:", authError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
