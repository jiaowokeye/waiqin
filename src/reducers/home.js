import { FETCH_DEMO_INIT, FETCH_DEMO_SUCCESS, FETCH_DEMO_FAILURE } from '../actions/home';

// 初始化状态
export const initialState = {
  isLoading: false,
  isError: false,
  fetchData: {
    title: null
  }
};

export default function home(state = initialState, action) {
  switch (action.type) {
    case FETCH_DEMO_INIT:
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case FETCH_DEMO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        fetchData: action.payload
      };
    case FETCH_DEMO_FAILURE: 
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    default:
      return { ...state };
  }
}
