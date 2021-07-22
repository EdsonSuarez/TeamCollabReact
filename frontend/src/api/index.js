import axios from "axios";

import { BASE_URL } from '../constants/actionTypes';
import axiosInstance from "../helpers/axios";

export const login = (newForm) => axios.post(`${BASE_URL}auth/login`, newForm);
export const fetchPosts = () => axios.get(BASE_URL);
export const boardGet = () => axios.get(`${BASE_URL}board/get`);
export const likePost = (id) => axios.patch(`${BASE_URL}/${id}/likePost`);
export const updatePost = (id, updatedPost) =>
axios.patch(`${BASE_URL}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${BASE_URL}/${id}`);
