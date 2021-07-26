import axiosInstance from "../helpers/axios";

export const listUsers = () => axiosInstance.get("/user/get");

export const updateUser = (user) =>
  axiosInstance.put("/user/update", user);

export const registerUser = (user) =>
  axiosInstance.post("user/addUserAdmin", user);

export const deleteUser = (user) => axiosInstance.put("/user/delete", user);

export const listRoles = () => axiosInstance.get("/role/get/");

export const deleteRole = (role) => axiosInstance.put("/role/delete", role);

export const activeRole = (role) => axiosInstance.put("/role/update", role);
