import axios from "axios";
const url = "http://localhost:3001/api/";


export const fetchPosts = () => axios.get(url);
export const boardGet = () => axios.get(url+ 'board/get');
export const login = (newPost) => axios.post(url+'auth/login', newPost);
export const createPost = (newPost) => axios.post(url+'auth/login', newPost);
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
export const updatePost = (id, updatedPost) =>
axios.patch(`${url}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);
