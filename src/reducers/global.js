import { GLOBAL_USER_DATA, GLOBAL_EXAMPLE_DATA } from '../actions/global';

export const initialState = {
  appName: 'WeCode',
  userInfo: null
};

export default function global(state = initialState, action) {
  switch (action.type) {
    case GLOBAL_USER_DATA:
      return {
        ...state,
        userInfo: action.payload
      };
    case GLOBAL_EXAMPLE_DATA:
      return {
        ...state,
        exampleData: action.payload
      }
    default:
      return state;
  }
}
