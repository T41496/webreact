import {
  SAVE_POST_START,
  SAVE_POST_SUCCESS,
  SAVE_POST_FAILURE,
  FETCH_POSTS_START,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
  FETCH_SINGLE_POST_START,
  FETCH_SINGLE_POST_SUCCESS,
  FETCH_SINGLE_POST_FAILURE,
  DELETE_POST_START,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
  CHANGE_POST_STATUS_START,
  CHANGE_POST_STATUS_SUCCESS,
  CHANGE_POST_STATUS_FAILURE,
  POST_FILE_UPLOAD_START,
  POST_FILE_UPLOAD_SUCCESS,
  POST_FILE_UPLOAD_FAILURE,
  PPV_PAYMENT_STRIPE_START,
  PPV_PAYMENT_STRIPE_SUCCESS,
  PPV_PAYMENT_STRIPE_FAILURE,
  PPV_PAYMENT_WALLET_START,
  PPV_PAYMENT_WALLET_SUCCESS,
  PPV_PAYMENT_WALLET_FAILURE,
  SAVE_REPORT_POST_FAILURE,
  SAVE_REPORT_POST_SUCCESS,
  SAVE_BLOCK_USER_START,
  FETCH_REPORT_POSTS_FAILURE,
  FETCH_REPORT_POSTS_START,
  FETCH_REPORT_POSTS_SUCCESS,
  SAVE_REPORT_POST_START,
  PPV_PAYMENT_PAYPAL_START,
  PPV_PAYMENT_PAYPAL_SUCCESS,
  PPV_PAYMENT_PAYPAL_FAILURE,
  POST_FILE_REMOVE_START,
  POST_FILE_REMOVE_SUCCESS,
  POST_FILE_REMOVE_FAILURE,
  SAVE_LIVESTREAM_START,
  SAVE_LIVESTREAM_SUCCESS,
  SAVE_LIVESTREAM_FAILURE,
  FETCH_SINGLE_STREAM_START,
  FETCH_SINGLE_STREAM_SUCCESS,
  FETCH_SINGLE_STREAM_FAILURE,
  FETCH_LIST_STREAM_START,
  FETCH_LIST_STREAM_SUCCESS,
  FETCH_LIST_STREAM_FAILURE,
  FETCH_LIST_VIDEO_START,
  FETCH_LIST_VIDEO_SUCCESS,
  FETCH_LIST_VIDEO_FAILURE,
  SAVE_LIVESTREAM_USERS_START,
  SAVE_LIVESTREAM_USERS_SUCCESS,
  SAVE_LIVESTREAM_USERS_FAILURE,
  LEAVE_LIVESTREAM_USER_START,
  LEAVE_LIVESTREAM_USER_SUCCESS,
  LEAVE_LIVESTREAM_USER_FAILURE,
  FETCH_SINGLE_CALL_START,
  FETCH_SINGLE_CALL_SUCCESS,
  FETCH_SINGLE_CALL_FAILURE,
  SAVE_SINGLE_CALL_START,
  SAVE_SINGLE_CALL_SUCCESS,
  SAVE_SINGLE_CALL_FAILURE,
  LEAVE_CALL_USER_START,
  LEAVE_CALL_USER_SUCCESS,
  LEAVE_CALL_USER_FAILURE,
  UPDATE_VIDEO_START,
  UPDATE_VIDEO_SUCCESS,
  UPDATE_VIDEO_FAILURE,
  STREAM_PAYMENT_START,
  STREAM_PAYMENT_SUCCESS,
  STREAM_PAYMENT_FAILURE,
} from "../actions/ActionConstant";

const initialState = {
  savePost: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  posts: {
    data: {},
    loading: true,
    error: false,
  },
  saveLiveStream: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  saveLiveStreamUsers: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  leaveLiveStreamUser: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  livestream: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  streamlists: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  videoList: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  leaveCallUser: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  saveCallUser: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  streamPayment: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  updateCallUser: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  call: {
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
  delPost: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  changePostStatus: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  fileUpload: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  ppvPayStripe: {
    inputData: {},
    loading: true,
    error: false,
    success: {},
    buttonDisable: false,
    loadingButtonContent: null,
  },
  ppvPayWallet: {
    inputData: {},
    loading: true,
    error: false,
    success: {},
    buttonDisable: false,
    loadingButtonContent: null,
  },
  reportPosts: {
    data: {},
    loading: true,
    error: false,
  },
  saveReportPost: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  fileRemove: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
};

const PostReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_POST_START:
      return {
        ...state,
        savePost: {
          inputData: action.data,
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "Loading... Please wait",
          buttonDisable: true,
        },
      };
    case SAVE_POST_SUCCESS:
      return {
        ...state,
        savePost: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case SAVE_POST_FAILURE:
      return {
        ...state,
        savePost: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case SAVE_LIVESTREAM_START:
      return {
        ...state,
        saveLiveStream: {
          inputData: action.data,
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "Loading... Please wait",
          buttonDisable: true,
        },
      };
    case SAVE_LIVESTREAM_SUCCESS:
      return {
        ...state,
        saveLiveStream: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case SAVE_LIVESTREAM_FAILURE:
      return {
        ...state,
        saveLiveStream: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case SAVE_LIVESTREAM_USERS_START:
      return {
        ...state,
        saveLiveStreamUsers: {
          inputData: action.data,
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "Loading... Please wait",
          buttonDisable: true,
        },
      };
    case SAVE_LIVESTREAM_USERS_SUCCESS:
      return {
        ...state,
        saveLiveStreamUsers: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case SAVE_LIVESTREAM_USERS_FAILURE:
      return {
        ...state,
        saveLiveStreamUsers: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
      case LEAVE_LIVESTREAM_USER_START:
      return {
        ...state,
        leaveLiveStreamUser: {
          inputData: action.data,
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "Loading... Please wait",
          buttonDisable: true,
        },
      };
    case LEAVE_LIVESTREAM_USER_SUCCESS:
      return {
        ...state,
        leaveLiveStreamUser: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case LEAVE_LIVESTREAM_USER_FAILURE:
      return {
        ...state,
        leaveLiveStreamUser: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case LEAVE_CALL_USER_START:
      return {
        ...state,
        leaveCallUser: {
          inputData: action.data,
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "Loading... Please wait",
          buttonDisable: true,
        },
      };
    case LEAVE_CALL_USER_SUCCESS:
      return {
        ...state,
        leaveCallUser: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case LEAVE_CALL_USER_FAILURE:
      return {
        ...state,
        leaveCallUser: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case FETCH_POSTS_START:
      return {
        ...state,
        posts: {
          data: {},
          loading: true,
          error: false,
        },
      };
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        posts: {
          data: action.data,
          loading: false,
          error: false,
        },
      };
    case FETCH_POSTS_FAILURE:
      return {
        ...state,
        posts: {
          data: {},
          loading: false,
          error: action.error,
        },
      };
    case FETCH_SINGLE_STREAM_START:
      return {
        ...state,
        livestream: {
          inputData: action.data,
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "Loading... Please wait",
          buttonDisable: true,
        },
      };
    case FETCH_SINGLE_STREAM_SUCCESS:
      return {
        ...state,
        livestream: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case FETCH_SINGLE_STREAM_FAILURE:
      return {
        ...state,
        livestream: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case FETCH_SINGLE_CALL_START:
      return {
        ...state,
        call: {
          inputData: action.data,
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "Loading... Please wait",
          buttonDisable: true,
        },
      };
    case FETCH_SINGLE_CALL_SUCCESS:
      return {
        ...state,
        call: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case FETCH_SINGLE_CALL_FAILURE:
      return {
        ...state,
        call: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case SAVE_SINGLE_CALL_START:
      return {
        ...state,
        saveCallUser: {
          inputData: action.data,
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "Loading... Please wait",
          buttonDisable: true,
        },
      };
    case SAVE_SINGLE_CALL_SUCCESS:
      return {
        ...state,
        saveCallUser: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case SAVE_SINGLE_CALL_FAILURE:
      return {
        ...state,
        saveCallUser: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case STREAM_PAYMENT_START:
      return {
        ...state,
        streamPayment: {
          inputData: action.data,
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "Loading... Please wait",
          buttonDisable: true,
        },
      };
    case STREAM_PAYMENT_SUCCESS:
      return {
        ...state,
        streamPayment: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case STREAM_PAYMENT_FAILURE:
      return {
        ...state,
        streamPayment: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case UPDATE_VIDEO_START:
      return {
        ...state,
        updateCallUser: {
          inputData: action.data,
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "Loading... Please wait",
          buttonDisable: true,
        },
      };
    case UPDATE_VIDEO_SUCCESS:
      return {
        ...state,
        updateCallUser: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case UPDATE_VIDEO_FAILURE:
      return {
        ...state,
        updateCallUser: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case FETCH_LIST_STREAM_START:
      return {
        ...state,
        streamlists: {
          inputData: action.data,
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "Loading... Please wait",
          buttonDisable: true,
        },
      };
    case FETCH_LIST_STREAM_SUCCESS:
      return {
        ...state,
        streamlists: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case FETCH_LIST_STREAM_FAILURE:
      return {
        ...state,
        streamlists: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case FETCH_LIST_VIDEO_START:
      return {
        ...state,
        videoList: {
          inputData: action.data,
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "Loading... Please wait",
          buttonDisable: true,
        },
      };
    case FETCH_LIST_VIDEO_SUCCESS:
      return {
        ...state,
        videoList: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case FETCH_LIST_VIDEO_FAILURE:
      return {
        ...state,
        videoList: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case FETCH_SINGLE_POST_START:
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
    case FETCH_SINGLE_POST_SUCCESS:
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
    case FETCH_SINGLE_POST_FAILURE:
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

    case DELETE_POST_START:
      return {
        ...state,
        delPost: {
          inputData: action.data,
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "Loading... Please wait",
          buttonDisable: true,
        },
      };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        delPost: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case DELETE_POST_FAILURE:
      return {
        ...state,
        delPost: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };

    case CHANGE_POST_STATUS_START:
      return {
        ...state,
        changePostStatus: {
          inputData: action.data,
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "Loading... Please wait",
          buttonDisable: true,
        },
      };
    case CHANGE_POST_STATUS_SUCCESS:
      return {
        ...state,
        changePostStatus: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case CHANGE_POST_STATUS_FAILURE:
      return {
        ...state,
        changePostStatus: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case POST_FILE_UPLOAD_START:
      return {
        ...state,
        fileUpload: {
          inputData: action.data,
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "File Uploading....",
          buttonDisable: true,
        },
      };
    case POST_FILE_UPLOAD_SUCCESS:
      return {
        ...state,
        fileUpload: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case POST_FILE_UPLOAD_FAILURE:
      return {
        ...state,
        fileUpload: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case PPV_PAYMENT_STRIPE_START:
      return {
        ...state,
        ppvPayStripe: {
          inputData: action.data,
          loading: true,
          error: false,
          success: {},
          buttonDisable: true,
          loadingButtonContent: "Processing.. Please wait...",
        },
      };
    case PPV_PAYMENT_STRIPE_SUCCESS:
      return {
        ...state,
        ppvPayStripe: {
          loading: false,
          error: false,
          success: action.data,
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case PPV_PAYMENT_STRIPE_FAILURE:
      return {
        ...state,
        ppvPayStripe: {
          loading: true,
          error: action.error,
          success: {},
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case PPV_PAYMENT_WALLET_START:
      return {
        ...state,
        ppvPayWallet: {
          inputData: action.data,
          loading: true,
          error: false,
          success: {},
          buttonDisable: true,
          loadingButtonContent: "Processing.. Please wait...",
        },
      };
    case PPV_PAYMENT_WALLET_SUCCESS:
      return {
        ...state,
        ppvPayWallet: {
          loading: false,
          error: false,
          success: action.data,
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case PPV_PAYMENT_WALLET_FAILURE:
      return {
        ...state,
        ppvPayWallet: {
          loading: true,
          error: action.error,
          success: {},
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };

    case FETCH_REPORT_POSTS_START:
      return {
        ...state,
        reportPosts: {
          data: {},
          loading: true,
          error: false,
        },
      };
    case FETCH_REPORT_POSTS_SUCCESS:
      return {
        ...state,
        reportPosts: {
          data: action.data,
          loading: false,
          error: false,
        },
      };
    case FETCH_REPORT_POSTS_FAILURE:
      return {
        ...state,
        reportPosts: {
          data: {},
          loading: true,
          error: action.error,
        },
      };
    case SAVE_REPORT_POST_START:
      return {
        ...state,
        saveReportPost: {
          data: {},
          loading: true,
          error: false,
          inputData: action.data,
          loadingButtonContent: "Loading... Please wait.",
          buttonDisable: true,
        },
      };
    case SAVE_REPORT_POST_SUCCESS:
      return {
        ...state,
        saveReportPost: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case SAVE_REPORT_POST_FAILURE:
      return {
        ...state,
        saveReportPost: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case PPV_PAYMENT_PAYPAL_START:
      return {
        ...state,
        ppvPayPal: {
          inputData: action.data,
          loading: true,
          error: false,
          success: {},
          buttonDisable: true,
          loadingButtonContent: "Processing.. Please wait...",
        },
      };
    case PPV_PAYMENT_PAYPAL_SUCCESS:
      return {
        ...state,
        ppvPayPal: {
          loading: false,
          error: false,
          success: action.data,
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case PPV_PAYMENT_PAYPAL_FAILURE:
      return {
        ...state,
        ppvPayPal: {
          loading: true,
          error: action.error,
          success: {},
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
      case POST_FILE_REMOVE_START:
        return {
          ...state,
          fileRemove: {
            inputData: action.data,
            data: {},
            loading: true,
            error: false,
            loadingButtonContent: "File Deleting....",
            buttonDisable: true,
          },
        };
      case POST_FILE_REMOVE_SUCCESS:
        return {
          ...state,
          fileRemove: {
            data: action.data,
            loading: false,
            error: false,
            inputData: {},
            loadingButtonContent: null,
            buttonDisable: false,
          },
        };
      case POST_FILE_REMOVE_FAILURE:
        return {
          ...state,
          fileRemove: {
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

export default PostReducer;
