import {
  FETCH_COMMENTS_START,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAILURE,
  SAVE_COMMENT_START,
  SAVE_COMMENT_SUCCESS,
  SAVE_COMMENT_FAILURE,
  DELETE_COMMENT_START,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,
} from "../actions/ActionConstant";

const initialState = {
  comments: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
  },
  saveComment: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  delComment: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
};

const CommentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMMENTS_START:
      return {
        ...state,
        comments: {
          data: {},
          loading: true,
          error: false,
          inputData: action.data,
          loadingButtonContent: "Loading...",
        },
      };
    case FETCH_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
        },
      };
    case FETCH_COMMENTS_FAILURE:
      return {
        ...state,
        comments: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
        },
      };
    case SAVE_COMMENT_START:
      return {
        ...state,
        saveComment: {
          data: {},
          loading: true,
          error: false,
          inputData: action.data,
          loadingButtonContent: "Loading... Please wait.",
          buttonDisable: true,
        },
      };
    case SAVE_COMMENT_SUCCESS:
      return {
        ...state,
        saveComment: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case SAVE_COMMENT_FAILURE:
      return {
        ...state,
        saveComment: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case DELETE_COMMENT_START:
      return {
        ...state,
        delComment: {
          data: {},
          loading: true,
          error: false,
          inputData: action.data,
          loadingButtonContent: "Loading...",
          buttonDisable: true,
        },
      };
    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        delComment: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case DELETE_COMMENT_FAILURE:
      return {
        ...state,
        delComment: {
          data: {},
          loading: true,
          error: action.data,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };

    default:
      return state;
  }
};

export default CommentsReducer;
