import { LOGIN, LOGOUT } from '../constants/actionTypes';

export default (homes = [], action) => {
  switch (action.type) {
    case LOGIN:
      return { constant: LOGIN, data: action.payload };
    case LOGOUT:
      return { constant: LOGOUT, data: action.payload };
    default:
      return homes;
  }
};
