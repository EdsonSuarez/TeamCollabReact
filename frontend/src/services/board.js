import axiosInstance from "../helpers/axios";
// import axios from "axios"

export const getBoard = () => axiosInstance.get("http://localhost:3001/api/board/get");
export const boardsUser = (id) => axiosInstance.get("http://localhost:3001/api/board/getBoards/" + id);
export const tasksBoard = (id) => axiosInstance.get("http://localhost:3001/api/board/getTasks/" + id);
export const teamsUser = () => axiosInstance.get("http://localhost:3001/api/board/getTeamUser/");

