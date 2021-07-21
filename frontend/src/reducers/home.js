import { LOGIN } from '../constants/actionTypes';

export default (homes = [], action) => {
  switch (action.type) {
    case LOGIN:
      return { data: action.payload };
    default:
    default:
      return homes;
  }
};
