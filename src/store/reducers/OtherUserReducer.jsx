import {
  FETCH_SINGLE_USER_PROFILE_START,
  FETCH_SINGLE_USER_PROFILE_SUCCESS,
  FETCH_SINGLE_USER_PROFILE_FAILURE,
  FETCH_SINGLE_USER_POSTS_START,
  FETCH_SINGLE_USER_POSTS_SUCCESS,
  FETCH_SINGLE_USER_POSTS_FAILURE,
  SEARCH_USER_POST_START,
  SEARCH_USER_POST_SUCCESS,
  SEARCH_USER_POST_FAILURE,
} from "../actions/ActionConstant";

const initialState = {
  userDetails: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  userPosts: {
    data: {
      posts: [],
    },
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
    skip: 0,
    length: 0,
    loadMore: false,
  },
  searchPosts: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
};

const OtherUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SINGLE_USER_PROFILE_START:
      return {
        ...state,
        userDetails: {
          data: {},
          loading: true,
          error: false,
          inputData: action.data,
          loadingButtonContent: "Loading... Please wait.",
          buttonDisable: true,
        },
      };
    case FETCH_SINGLE_USER_PROFILE_SUCCESS:
      return {
        ...state,
        userDetails: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case FETCH_SINGLE_USER_PROFILE_FAILURE:
      return {
        ...state,
        userDetails: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case FETCH_SINGLE_USER_POSTS_START:
      return {
        ...state,
        userPosts: {
          data: {
            posts:
              action.data.loadMore === "loadMore"
                ? [...state.userPosts.data.posts]
                : [],
          },
          loadMore: action.data.loadMore === "loadMore" ? true : false,
          loading: true,
          error: false,
          inputData: action.data,
          loadingButtonContent: "Loading... Please wait.",
          buttonDisable: true,
          skip: action.data.loadMore === "loadMore" ? state.userPosts.skip : 0,
          length:
            action.data.loadMore === "loadMore" ? state.userPosts.length : 0,
        },
      };
    case FETCH_SINGLE_USER_POSTS_SUCCESS:
      return {
        ...state,
        userPosts: {
          data: {
            posts: state.userPosts.loadMore
              ? [...state.userPosts.data.posts, ...action.data.posts]
              : [...action.data.posts],
          },
          loadMore: state.userPosts.loadMore,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
          skip: action.data.posts.length + state.userPosts.skip,
          length: action.data.posts.length,
        },
      };
    case FETCH_SINGLE_USER_POSTS_FAILURE:
      return {
        ...state,
        userPosts: {
          data: {
            posts: [],
          },
          loading: true,
          loadMore: false,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
          skip: state.userPosts.skip,
          length: state.userPosts.length,
        },
      };
    case SEARCH_USER_POST_START:
      return {
        ...state,
        searchPosts: {
          data: {},
          loading: true,
          error: false,
          inputData: action.data,
          loadingButtonContent: "Loading... Please wait.",
          buttonDisable: true,
        },
      };
    case SEARCH_USER_POST_SUCCESS:
      return {
        ...state,
        searchPosts: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case SEARCH_USER_POST_FAILURE:
      return {
        ...state,
        searchPosts: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };

    default:
      return state;
  }
};

export default OtherUserReducer;
