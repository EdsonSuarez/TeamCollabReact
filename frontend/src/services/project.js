import { BASE_URL } from "../constants/actionTypes";
import axiosInstance from "../helpers/axios";

export const fetchAdmin = () => axiosInstance.get(`${BASE_URL}project/getAll`);
export const fetchScrum = () =>
  axiosInstance.get(`${BASE_URL}project/getAllScrum`);
export const fetchUserLeader = () =>
  axiosInstance.get(`${BASE_URL}project/getMyProjects`);
export const saveProject = (newForm) =>
  axiosInstance.post(`${BASE_URL}project/add`, newForm);
export const updateProject = (updateForm) =>
  axiosInstance.put(`${BASE_URL}project/update`, updateForm);
export const deleteProject = (deleteForm) =>
  axiosInstance.put(`${BASE_URL}project/delete`, deleteForm);
