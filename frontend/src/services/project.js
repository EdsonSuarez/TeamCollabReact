import { BASE_URL } from '../constants/actionTypes';
import axiosInstance from "../helpers/axios";

export const fetchProjects = () => axiosInstance.get(`${BASE_URL}project/getAll`);