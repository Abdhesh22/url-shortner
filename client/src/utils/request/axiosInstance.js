import axios from "axios";

// Create an Axios instance
console.log("import.meta.env.BASE_URL: ", import.meta.env.VITE_BASE_URL);
const axiosInstance = axios.create({
  baseURL: "/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add authorization headers
axiosInstance.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem("authToken"); // Update as per your token storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      alert("Session expired. Please log in again.");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
