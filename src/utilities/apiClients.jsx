import { store } from "@/store";
import { setToast } from "@/store/slice/toastSlice";
import axios from "axios";

const TIMEOUT = 1 * 60 * 1000;

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  timeout: TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(
        setToast({
          varient: "error",
          message:
            error.response.data?.detail ||
            "Unauthorized access. Please login again.",
        })
      );
      console.warn("Unauthorized:", error.response.data?.detail);
    }
    return Promise.reject(error);
  }
);

export default apiClient;