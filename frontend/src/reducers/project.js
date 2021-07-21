import { PROJECT_FETCH_ALL } from '../constants/actionTypes';

export default (projects = [], action) => {
  switch (action.type) {
    case PROJECT_FETCH_ALL:
        return action.payload;
    default:
      return projects;
  }
};