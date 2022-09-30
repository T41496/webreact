import {
  FETCH_HOME_POSTS_START,
  FETCH_HOME_POSTS_SUCCESS,
  FETCH_HOME_POSTS_FAILURE,
  SEARCH_USER_START,
  SEARCH_USER_SUCCESS,
  SEARCH_USER_FAILURE,
  FETCH_OTHERS_SINGLE_POST_START,
  FETCH_OTHERS_SINGLE_POST_SUCCESS,
  FETCH_OTHERS_SINGLE_POST_FAILURE,
  FETCH_POST_SUGGESTION_START,
  FETCH_POST_SUGGESTION_SUCCESS,
  FETCH_POST_SUGGESTION_FAILURE,
  POST_PAYMENT_STRIPE_START,
  POST_PAYMENT_STRIPE_SUCCESS,
  POST_PAYMENT_STRIPE_FAILURE,
  POST_PAYMENT_WALLET_START,
  POST_PAYMENT_WALLET_SUCCESS,
  POST_PAYMENT_WALLET_FAILURE,
  FETCH_LISTS_DETAILS_START,
  FETCH_LISTS_DETAILS_SUCCESS,
  FETCH_LISTS_DETAILS_FAILURE,
  FETCH_NEARBY_USER_START,
  FETCH_NEARBY_USER_SUCCESS,
  FETCH_NEARBY_USER_FAILURE,
} from "../actions/ActionConstant";

const initialState = {
  homePost: {
    data: {
      posts: [],
    },
    loading: true,
    error: false,
    skip: 0,
    length: 0,
  },
  searchUser: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  singlePost: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  postSug: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  postPaymentStripe: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  postPaymentWallet: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  lists: {
    data: {},
    loading: true,
    error: false,
  },
  nearByUsers: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
};

const HomeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_HOME_POSTS_START:
      return {
        ...state,
        homePost: {
          data: {
            posts: [...state.homePost.data.posts],
          },
          loading: true,
          error: false,
          skip: state.homePost.skip,
          length: state.homePost.length,
        },
      };
    case FETCH_HOME_POSTS_SUCCESS:
      return {
        ...state,
        homePost: {
          data: {
            posts: [...state.homePost.data.posts, ...action.data.posts],
          },
          loading: false,
          error: false,
          skip: action.data.posts.length + state.homePost.skip,
          length: action.data.posts.length,
        },
      };
    case FETCH_HOME_POSTS_FAILURE:
      return {
        ...state,
        homePost: {
          data: {
            posts: [],
          },
          loading: true,
          error: action.error,
          skip: state.homePost.skip,
          length: state.homePost.length,
        },
      };
    case SEARCH_USER_START:
      return {
        ...state,
        searchUser: {
          data: {},
          loading: true,
          error: false,
          inputData: action.data,
          loadingButtonContent: "Loading...",
          buttonDisable: true,
        },
      };
    case SEARCH_USER_SUCCESS:
      return {
        ...state,
        searchUser: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case SEARCH_USER_FAILURE:
      return {
        ...state,
        searchUser: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };

    case FETCH_OTHERS_SINGLE_POST_START:
      return {
        ...state,
        singlePost: {
          inputData: action.data,
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "Loading... Please wait",
          buttonDisable: true,
        },
      };
    case FETCH_OTHERS_SINGLE_POST_SUCCESS:
      return {
        ...state,
        singlePost: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case FETCH_OTHERS_SINGLE_POST_FAILURE:
      return {
        ...state,
        singlePost: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };

    case FETCH_POST_SUGGESTION_START:
      return {
        ...state,
        postSug: {
          inputData: action.data,
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "Loading... Please wait",
          buttonDisable: true,
        },
      };
    case FETCH_POST_SUGGESTION_SUCCESS:
      return {
        ...state,
        postSug: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case FETCH_POST_SUGGESTION_FAILURE:
      return {
        ...state,
        postSug: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };

    case POST_PAYMENT_STRIPE_START:
      return {
        ...state,
        postPaymentStripe: {
          inputData: action.data,
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "Loading... Please wait",
          buttonDisable: true,
        },
      };
    case POST_PAYMENT_STRIPE_SUCCESS:
      return {
        ...state,
        postPaymentStripe: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case POST_PAYMENT_STRIPE_FAILURE:
      return {
        ...state,
        postPaymentStripe: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case POST_PAYMENT_WALLET_START:
      return {
        ...state,
        postPaymentWallet: {
          inputData: action.data,
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "Loading... Please wait",
          buttonDisable: true,
        },
      };
    case POST_PAYMENT_WALLET_SUCCESS:
      return {
        ...state,
        postPaymentWallet: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case POST_PAYMENT_WALLET_FAILURE:
      return {
        ...state,
        postPaymentWallet: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case FETCH_LISTS_DETAILS_START:
      return {
        ...state,
        lists: {
          data: {},
          loading: true,
          error: false,
        },
      };
    case FETCH_LISTS_DETAILS_SUCCESS:
      return {
        ...state,
        lists: {
          data: action.data,
          loading: false,
          error: false,
        },
      };
    case FETCH_LISTS_DETAILS_FAILURE:
      return {
        ...state,
        lists: {
          data: {},
          loading: true,
          error: action.error,
        },
      };
      case FETCH_NEARBY_USER_START:
        return {
          ...state,
          nearByUsers: {
            inputData: action.data,
            data: {},
            loading: true,
            error: false,
            loadingButtonContent: "Loading... Please wait",
            buttonDisable: true,
          },
        };
      case FETCH_NEARBY_USER_SUCCESS:
        return {
          ...state,
          nearByUsers: {
            data: action.data,
            loading: false,
            error: false,
            inputData: {},
            loadingButtonContent: null,
            buttonDisable: false,
          },
        };
      case FETCH_NEARBY_USER_FAILURE:
        return {
          ...state,
          nearByUsers: {
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

export default HomeReducer;
