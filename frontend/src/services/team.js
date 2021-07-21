import axiosInstance from "../helpers/axios";

export const getTeamAdmin = () => axiosInstance.get("http://localhost:3001/api/team/getAdmin");