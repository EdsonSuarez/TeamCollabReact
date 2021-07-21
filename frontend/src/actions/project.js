import { PROJECT_FETCH_ALL } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const projectGet = () => async (dispatch) => {
  try {
    const { data } = await api.fetchProjects();
    dispatch({ type: PROJECT_FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};