import axiosInstance from "../helpers/axios";
// import axios from "axios"

export const getTeamAdmin = () => axiosInstance.get("http://localhost:3001/api/team/getAdmin");
export const getUsers = (id) => axiosInstance.get("http://localhost:3001/api/team/getUsers/" + id);
export const deleteDetail = (id) => axiosInstance.delete("http://localhost:3001/api/detailTeam/delete/" + id);
export const addDetail = (data) => axiosInstance.post("http://localhost:3001/api/detailTeam/add", data);
export const addTeam = (team) => axiosInstance.post("http://localhost:3001/api/team/add", team);
