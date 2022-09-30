import {
  FOLLOW_USER_START,
  FOLLOW_USER_SUCCESS,
  FOLLOW_USER_FAILURE,
  UNFOLLOW_USER_START,
  UNFOLLOW_USER_SUCCESS,
  UNFOLLOW_USER_FAILURE,
  FETCH_FOLLOWERS_START,
  FETCH_FOLLOWERS_SUCCESS,
  FETCH_FOLLOWERS_FAILURE,
  FETCH_ACTIVE_FOLLOWERS_START,
  FETCH_ACTIVE_FOLLOWERS_SUCCESS,
  FETCH_ACTIVE_FOLLOWERS_FAILURE,
  FETCH_EXPIRED_FOLLOWERS_START,
  FETCH_EXPIRED_FOLLOWERS_SUCCESS,
  FETCH_EXPIRED_FOLLOWERS_FAILURE,
  FETCH_FOLLOWING_START,
  FETCH_FOLLOWING_SUCCESS,
  FETCH_FOLLOWING_FAILURE,
  FETCH_ACTIVE_FOLLOWING_START,
  FETCH_ACTIVE_FOLLOWING_SUCCESS,
  FETCH_ACTIVE_FOLLOWING_FAILURE,
  FETCH_EXPIRED_FOLLOWING_START,
  FETCH_EXPIRED_FOLLOWING_SUCCESS,
  FETCH_EXPIRED_FOLLOWING_FAILURE,
} from "../actions/ActionConstant";

const initialState = {
  followUser: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  unFollowUser: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  followers: {
    data: {},
    loading: true,
    error: false,
  },
  activeFollowers: {
    data: {},
    loading: true,
    error: false,
  },
  expiredFollowers: {
    data: {},
    loading: true,
    error: false,
  },
  following: {
    data: {},
    loading: true,
    error: false,
  },
  activeFollowing: {
    data: {},
    loading: true,
    error: false,
  },
  expiredFollowing: {
    data: {},
    loading: true,
    error: false,
  },
};

const FollowReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW_USER_START:
      return {
        ...state,
        followUser: {
          data: {},
          loading: true,
          error: false,
          inputData: action.data,
          loadingButtonContent: "Loading... Please wait.",
          buttonDisable: true,
        },
      };
    case FOLLOW_USER_SUCCESS:
      return {
        ...state,
        followUser: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case FOLLOW_USER_FAILURE:
      return {
        ...state,
        followUser: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case UNFOLLOW_USER_START:
      return {
        ...state,
        unFollowUser: {
          data: {},
          loading: true,
          error: false,
          inputData: action.data,
          loadingButtonContent: "Loading... Please wait.",
          buttonDisable: true,
        },
      };
    case UNFOLLOW_USER_SUCCESS:
      return {
        ...state,
        unFollowUser: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case UNFOLLOW_USER_FAILURE:
      return {
        ...state,
        unFollowUser: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case FETCH_FOLLOWERS_START:
      return {
        ...state,
        followers: {
          data: {},
          loading: true,
          error: false,
        },
      };
    case FETCH_FOLLOWERS_SUCCESS:
      return {
        ...state,
        followers: {
          data: action.data,
          loading: false,
          error: false,
        },
      };
    case FETCH_FOLLOWERS_FAILURE:
      return {
        ...state,
        followers: {
          data: {},
          loading: true,
          error: action.error,
        },
      };

    case FETCH_ACTIVE_FOLLOWERS_START:
      return {
        ...state,
        activeFollowers: {
          data: {},
          loading: true,
          error: false,
        },
      };
    case FETCH_ACTIVE_FOLLOWERS_SUCCESS:
      return {
        ...state,
        activeFollowers: {
          data: action.data,
          loading: false,
          error: false,
        },
      };
    case FETCH_ACTIVE_FOLLOWERS_FAILURE:
      return {
        ...state,
        activeFollowers: {
          data: {},
          loading: true,
          error: action.error,
        },
      };
    case FETCH_EXPIRED_FOLLOWERS_START:
      return {
        ...state,
        expiredFollowers: {
          data: {},
          loading: true,
          error: false,
        },
      };
    case FETCH_EXPIRED_FOLLOWERS_SUCCESS:
      return {
        ...state,
        expiredFollowers: {
          data: action.data,
          loading: false,
          error: false,
        },
      };
    case FETCH_EXPIRED_FOLLOWERS_FAILURE:
      return {
        ...state,
        expiredFollowers: {
          data: {},
          loading: true,
          error: action.error,
        },
      };
    case FETCH_FOLLOWING_START:
      return {
        ...state,
        following: {
          data: {},
          loading: true,
          error: false,
        },
      };
    case FETCH_FOLLOWING_SUCCESS:
      return {
        ...state,
        following: {
          data: action.data,
          loading: false,
          error: false,
        },
      };
    case FETCH_FOLLOWING_FAILURE:
      return {
        ...state,
        following: {
          data: {},
          loading: true,
          error: action.error,
        },
      };
    case FETCH_ACTIVE_FOLLOWING_START:
      return {
        ...state,
        activeFollowing: {
          data: {},
          loading: true,
          error: false,
        },
      };
    case FETCH_ACTIVE_FOLLOWING_SUCCESS:
      return {
        ...state,
        activeFollowing: {
          data: action.data,
          loading: false,
          error: false,
        },
      };
    case FETCH_ACTIVE_FOLLOWING_FAILURE:
      return {
        ...state,
        activeFollowing: {
          data: {},
          loading: true,
          error: action.error,
        },
      };
    case FETCH_EXPIRED_FOLLOWING_START:
      return {
        ...state,
        expiredFollowing: {
          data: {},
          loading: true,
          error: false,
        },
      };
    case FETCH_EXPIRED_FOLLOWING_SUCCESS:
      return {
        ...state,
        expiredFollowing: {
          data: action.data,
          loading: false,
          error: false,
        },
      };
    case FETCH_EXPIRED_FOLLOWING_FAILURE:
      return {
        ...state,
        expiredFollowing: {
          data: {},
          loading: true,
          error: action.error,
        },
      };
    default:
      return state;
  }
};

export default FollowReducer;
