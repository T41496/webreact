import {
  SAVE_POST_LIKE_START,
  SAVE_POST_LIKE_SUCCESS,
  SAVE_POST_LIKE_FAILURE,
  FETCH_POST_LIKED_START,
  FETCH_POST_LIKED_SUCCESS,
  FETCH_POST_LIKED_FAILURE,
} from "../actions/ActionConstant";

const initialState = {
  saveLike: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
  },
  likes: {
    data: {},
    loading: true,
    error: false,
  },
};

const PostLikesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_POST_LIKE_START:
      return {
        ...state,
        saveLike: {
          data: {},
          loading: true,
          error: false,
          inputData: action.data,
        },
      };
    case SAVE_POST_LIKE_SUCCESS:
      return {
        ...state,
        saveLike: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
        },
      };
    case SAVE_POST_LIKE_FAILURE:
      return {
        ...state,
        saveLike: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
        },
      };

    case FETCH_POST_LIKED_START:
      return {
        ...state,
        likes: {
          data: {},
          loading: true,
          error: false,
        },
      };
    case FETCH_POST_LIKED_SUCCESS:
      return {
        ...state,
        likes: {
          data: action.data,
          loading: false,
          error: false,
        },
      };
    case FETCH_POST_LIKED_FAILURE:
      return {
        ...state,
        likes: {
          data: {},
          loading: true,
          error: action.error,
        },
      };

    default:
      return state;
  }
};

export default PostLikesReducer;
