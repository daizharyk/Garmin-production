import axios from "axios";

const instance = axios.create({
  baseURL: process.env.SERVER_API_URL,
});

instance.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem("user"))?.token;
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default instance;
