import {
  FETCH_SINGLE_PAGE_START,
  FETCH_SINGLE_PAGE_SUCCESS,
  FETCH_SINGLE_PAGE_FAILURE,
} from "../actions/ActionConstant";

const initialState = {
  pageData: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
  },
};

const PageReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SINGLE_PAGE_START:
      return {
        ...state,
        pageData: {
          data: {},
          loading: true,
          error: false,
          inputData: action.data,
        },
      };
    case FETCH_SINGLE_PAGE_SUCCESS:
      return {
        ...state,
        pageData: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
        },
      };
    case FETCH_SINGLE_PAGE_FAILURE:
      return {
        ...state,
        pageData: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
        },
      };

    default:
      return state;
  }
};

export default PageReducer;
