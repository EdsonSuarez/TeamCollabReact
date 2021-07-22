import axios from "axios";
import { BASE_URL } from '../constants/actionTypes';
import axiosInstance from "../helpers/axios";

export const loginUser = (data) => axios.post("http://localhost:3001/api/auth/login", data);
export const listUsersAll = () => axiosInstance.get("http://localhost:3001/api/user/get");
export const login = (newForm) => axios.post(`${BASE_URL}auth/login`, newForm);
