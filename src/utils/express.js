import axios from "axios";
import { getToken } from "@/utils/persistenceStorage";

const service = axios.create({
  baseURL: import.meta.env.VITE_API_ADDRESS,
  timeout: 20000,
});

service.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = "Bearer " + getToken();
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

service.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error?.response?.status === 403) {
      return "You are not authorized to perform this operation.";
    }
    return error.response;
  },
);

export default service;
