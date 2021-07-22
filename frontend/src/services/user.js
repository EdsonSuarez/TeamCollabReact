const axios = require('axios');
// import axiosInstance from "../helpers/axios";

export const loginUser = (data) => axios.post("http://localhost:3001/api/auth/login", data);
export const listUsersAll = () => axios.get("http://localhost:3001/api/user/get/");