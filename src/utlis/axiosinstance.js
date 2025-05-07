import axios from "axios";
import { Base_URL } from "./apiPath";

const axiosInstance = axios.create({
  baseURL: Base_URL,
  timeout: 10000,
  header: {
    "content-type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.request.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        window.location.href = "/login";
      } else if (error.response.status === 500) {
        console.error("server error. please try again later");
      } else if (error.code === "ECONNABORTED") {
        console.error("Request timeout. please try again");
      }
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;
