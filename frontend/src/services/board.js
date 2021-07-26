import axiosInstance from "../helpers/axios";

export const getBoard = () => axiosInstance.get("http://localhost:3001/api/board/get");
export const boardsUser = (id) => axiosInstance.get("http://localhost:3001/api/board/getBoards/" + id);
export const tasksBoard = (id) => axiosInstance.get("http://localhost:3001/api/board/getTasks/" + id);
export const teamsUser = () => axiosInstance.get("http://localhost:3001/api/board/getTeamUser/");
export const updateSprint = (data) => axiosInstance.put("http://localhost:3001/api/board/update/", data);
export const addSprint = (data) => axiosInstance.post("http://localhost:3001/api/board/add/", data);
export const deleteSprint = (id) => axiosInstance.delete("http://localhost:3001/api/board/deleteBoard/" + id);
