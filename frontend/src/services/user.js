import axios from "axios";

import { BASE_URL } from '../constants/actionTypes';
// import axiosInstance from "../helpers/axios";

export const login = (newForm) => axios.post(`${BASE_URL}auth/login`, newForm);