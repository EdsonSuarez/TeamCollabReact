import axiosInstance from "../helpers/axios";

const uri = 'http://localhost:3001/api/';
console.log(uri);

export const saveTask = (task) => axiosInstance.post(uri + 'task/add', task);
export const saveTaskImg = (task) => axiosInstance.post(uri + 'task/addImg', task);
export const deleteTask = (taskId) => axiosInstance.delete(uri + 'task/delete/' + taskId);
export const getTasks = () => axiosInstance.get(uri + 'task/get');
export const getOneTask = (taskId) => axiosInstance.get(uri + 'task/get/' + taskId);
export const updateTask = (task) => axiosInstance.put(uri + 'task/update', task);

export const getTeam = (teamId) => axiosInstance.get(uri + 'detailTeam/getTeam/' + teamId);
export const addDetail = (user) => axiosInstance.post(uri + 'detailTask/add', user);
export const getUsersTask = (taskId) => axiosInstance.get(uri + 'detailTask/getUsers/' + taskId);
export const deleteDetail = (userId) => axiosInstance.delete(uri + 'detailTask/delete/' + userId);
export const getManyTask = (id) => axiosInstance.get(uri + 'task/getManyTask/' + id);
