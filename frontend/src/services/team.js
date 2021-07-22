import axiosInstance from "../helpers/axios";

export const getTeamAdmin = () => axiosInstance.get("http://localhost:3001/api/team/getAdmin");
export const getUsers = (id) => axiosInstance.get("http://localhost:3001/api/team/getUsers/" + id);
export const deleteDetail = (id) => axiosInstance.delete("http://localhost:3001/api/detailTeam/delete/" + id);
