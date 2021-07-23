import axiosInstance from "../helpers/axios";

export const getBoard = () => axiosInstance.get("http://localhost:3001/api/board/get");
export const boardsUser = (id) => axiosInstance.get("http://localhost:3001/api/board/getBoards/" + id);
export const tasksBoard = (id) => axiosInstance.get("http://localhost:3001/api/board/getTasks/" + id);
export const teamsUser = () => axiosInstance.get("http://localhost:3001/api/board/getTeamUser/");
export const editSprint = (data) => axiosInstance.put("http://localhost:3001/api/board/update/", data);
