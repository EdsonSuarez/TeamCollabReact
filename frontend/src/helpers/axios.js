import axios from "axios";
import { BASE_URL } from '../constants/actionTypes';
import { getToken } from './jwt';

let headers = {};

if(getToken()) {
    headers.Authorization = `Bearer ${getToken()}`;
}

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers
});

export default axiosInstance;
