import { logout } from '../services/auth';
import { LOGIN, LOGOUT } from '../constants/actionTypes';
import * as api from '../services/user';

export const login = (post) => async (dispatch) => {
  try {
    const { data: { jwtToken } } = await api.login(post);
    dispatch({ type: LOGIN, payload: jwtToken });
  } catch (error) {
    console.log(error.message);
  }
};

export const exit = () => (dispatch) => {
  try {
    logout();
    dispatch({ type: LOGOUT, payload: {} });
  } catch (error) {
    console.log(error.message);
  }
};