
import axiosInstance from "../helpers/axios";

export const updateTask = (task) => axiosInstance.put("http://localhost:3001/api/task/update", task);