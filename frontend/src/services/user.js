const axios = require('axios');
// import axiosInstance from "../helpers/axios";

export const loginUser = (data) => axios.post("http://localhost:3001/api/auth/login", data);