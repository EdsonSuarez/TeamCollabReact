import axios from "axios";
import { BASE_URL } from "../constants/actionTypes";
import { getToken } from "./jwt";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {},
});

axiosInstance.interceptors.request.use(async (config) => {
    if(config.headers.Authorization) delete config.headers.Authorization;
    config.headers.authorization = `Bearer ${getToken()}`;
    return config; 
});

export default axiosInstance;
