import axiosInstance from "../helpers/axios";

export const getBoard = () => axiosInstance.get("http://localhost:3001/api/board/get");
export const boardsUser = (id) => axiosInstance.get("http://localhost:3001/api/board/getBoards" + id);
