import { LOGIN } from '../constants/actionTypes';
import * as api from '../services/user';

export const login = (post) => async (dispatch) => {
  try {
    const { data: { jwtToken } } = await api.login(post);
    dispatch({ type: LOGIN, payload: jwtToken });
  } catch (error) {
    console.log(error.message);
  }
};