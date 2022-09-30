import {
  FETCH_USER_DETAILS_START,
  FETCH_USER_DETAILS_SUCCESS,
  FETCH_USER_DETAILS_FAILURE,
  EDIT_USER_DETAILS,
  UPDATE_USER_DETAILS_START,
  UPDATE_USER_DETAILS_SUCCESS,
  UPDATE_USER_DETAILS_FAILURE,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  GET_LOGIN_DETAILS,
  GET_REGISTER_DETAILS,
  FORGOT_PASSWORD_START,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  DELETE_ACCOUNT_START,
  DELETE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_FAILURE,
  REGISTER_VERIFY_START,
  REGISTER_VERIFY_SUCCESS,
  REGISTER_VERIFY_FAILURE,
  REGISTER_VERIFY_RESEND_START,
  REGISTER_VERIFY_RESEND_SUCCESS,
  REGISTER_VERIFY_RESEND_FAILURE,
  NOTIFICATION_STATUS_UPDATE_START,
  NOTIFICATION_STATUS_UPDATE_SUCCESS,
  NOTIFICATION_STATUS_UPDATE_FAILURE,
  GET_FORGOT_PASSWORD_DETAILS,
  FETCH_PAYMENTS_START,
  FETCH_PAYMENTS_SUCCESS,
  FETCH_PAYMENTS_FAILURE,
  FETCH_BLOCK_USERS_START,
  FETCH_BLOCK_USERS_SUCCESS,
  FETCH_BLOCK_USERS_FAILURE,
  SAVE_BLOCK_USER_START,
  SAVE_BLOCK_USER_SUCCESS,
  SAVE_BLOCK_USER_FAILURE,
  USER_VERIFY_BADGE_STATUS_SUCCESS,
  USER_VERIFY_BADGE_STATUS_START,
  USER_VERIFY_BADGE_STATUS_FAILURE,
  RESET_PASSWORD_START,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  USERNAME_VALIDATION_START,
  USERNAME_VALIDATION_SUCCESS,
  USERNAME_VALIDATION_FAILURE,
  USERNAME_VALIDATION_EMPTY,
  LOGOUT_START,
  FETCH_STRIPE_CONNECT_START,
  FETCH_STRIPE_CONNECT_SUCCESS,
  FETCH_STRIPE_CONNECT_FAILED,
} from "../actions/ActionConstant";

const initialState = {
  profile: {
    data: {},
    loading: true,
    error: false,
  },
  profileInputData: {
    data: {},
    loading: true,
    error: false,
    buttonDisable: false,
    loadingButtonContent: null,
  },
  buttonDisable: false,
  loadingButtonContent: null,
  loginInputData: {
    data: {},
    loading: true,
    error: false,
    buttonDisable: false,
    loadingButtonContent: null,
  },
  registerInputData: {
    data: {},
    loading: true,
    error: false,
    buttonDisable: false,
    loadingButtonContent: null,
  },
  forgotPasswordInputData: {
    data: {},
    loading: true,
    error: false,
    buttonDisable: false,
    loadingButtonContent: null,
  },
  deleteAccount: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    buttonDisable: false,
    loadingButtonContent: null,
  },
  registerVerify: {
    data: {},
    loading: true,
    error: false,
    buttonDisable: false,
    buttonLoadingContent: null,
    inputData: {},
  },
  registerVerifyResend: {
    data: {},
    loading: true,
    error: false,
    buttonDisable: false,
    buttonLoadingContent: null,
    inputData: {},
  },
  notificationUpdate: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
  },
  verifyBadgeUpdate: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
  },
  payments: {
    data: {},
    loading: true,
    error: false,
  },
  blockUsers: {
    data: {},
    loading: true,
    error: false,
  },
  saveBlockUser: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  validationInputData: {
    data: {},
    loading: true,
    error: false,
    isValid: false,
    isInValid: false,
  },
  stripeConnect: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_DETAILS_START:
      return {
        ...state,
        profile: {
          data: {},
          loading: true,
          error: false,
        },
      };
    case FETCH_USER_DETAILS_SUCCESS:
      return {
        ...state,
        profile: {
          data: action.data.data,
          loading: false,
          error: false,
        },
      };
    case FETCH_USER_DETAILS_FAILURE:
      return {
        ...state,
        profile: {
          data: {},
          loading: true,
          error: action.error,
        },
      };
    case EDIT_USER_DETAILS:
      return {
        ...state,
        profile: {
          loading: false,
          error: false,
          data: {
            ...state.profile.data,
            [action.name]: action.value,
          },
        },
      };
    case UPDATE_USER_DETAILS_START:
      return {
        ...state,
        profileInputData: {
          data: {
            first_name: state.profile.data.first_name,
            last_name: state.profile.data.last_name,
            email: state.profile.data.email,
            name: state.profile.data.name,
            username: state.profile.data.username,
            about: state.profile.data.about ?? '',
            address: state.profile.data.address,
            latitude: (state.profile.data.latitude)?state.profile.data.latitude:'',
            longitude: (state.profile.data.longitude)?state.profile.data.longitude:'',
            show_address: (state.profile.data.show_address)?state.profile.data.show_address:0,
            website: state.profile.data.website,
            amazon_wishlist: state.profile.data.amazon_wishlist,
            instagram_link: state.profile.data.instagram_link,
            facebook_link: state.profile.data.facebook_link,
            twitter_link: state.profile.data.twitter_link,
            snapchat_link: state.profile.data.snapchat_link,
            linkedin_link: state.profile.data.linkedin_link,
            pinterest_link: state.profile.data.pinterest_link,
            youtube_link: state.profile.data.youtube_link,
            twitch_link: state.profile.data.twitch_link,
            videocall_price: (state.profile.data.videocall_price)?state.profile.data.videocall_price:0,
            monthly_amount:
              state.profile.data.monthly_amount != undefined
                ? state.profile.data.monthly_amount
                : 0,
            yearly_amount:
              state.profile.data.yearly_amount != undefined
                ? state.profile.data.yearly_amount
                : 0,
            mobile:
              state.profile.data.mobile != null
                ? state.profile.data.mobile
                : "",
            picture: action.data
              ? action.data.picture != undefined
                ? action.data.picture
                : ""
              : "",
            cover: action.data
              ? action.data.cover != undefined
                ? action.data.cover
                : ""
              : "",
          },
          buttonDisable: true,
          loadingButtonContent: "Loading...please wait",
        },
      };

    case UPDATE_USER_DETAILS_SUCCESS:
      return {
        ...state,
        profile: {
          data: action.data.data,
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case UPDATE_USER_DETAILS_FAILURE:
      return {
        ...state,
        profile: {
          data: state.profile.data,
          loading: false,
          error: action.error,
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };

    case GET_LOGIN_DETAILS:
      return {
        ...state,
        loginInputData: {
          loading: false,
          error: false,
          data: {
            ...state.loginInputData.data,
            [action.name]: action.value,
          },
        },
      };
    case LOGIN_START:
      return {
        ...state,
        loginInputData: {
          data: {
            ...action.data,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
          buttonDisable: true,
          loadingButtonContent: "Loading please wait",
        },
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        profile: {
          data: action.data.data,
          loading: false,
          error: false,
        },
        loginInputData: {
          data: {},
          loading: true,
          error: false,
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loginInputData: {
          data: {},
          loading: true,
          error: false,
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case GET_REGISTER_DETAILS:
      return {
        ...state,
        registerInputData: {
          loading: false,
          error: false,
          data: {
            ...state.registerInputData.data,
            [action.name]: action.value,
          },
        },
      };
    case REGISTER_START:
      return {
        ...state,
        registerInputData: {
          data: {
            ...action.data,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
          loading: true,
          error: false,
          buttonDisable: true,
          loadingButtonContent: "Loading please wait",
        },
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        profile: {
          data: action.data.data,
        },
        registerInputData: {
          data: {},
          loading: false,
          error: false,
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        registerInputData: {
          data: {},
          loading: false,
          error: action.data,
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case GET_FORGOT_PASSWORD_DETAILS:
      return {
        ...state,
        forgotPasswordInputData: {
          loading: false,
          error: false,
          data: {
            ...state.forgotPasswordInputData.data,
            [action.name]: action.value,
          },
        },
      };
    case FORGOT_PASSWORD_START:
      return {
        ...state,
        forgotPasswordInputData: {
          data: action.data,
          loading: false,
          error: false,
          buttonDisable: true,
          loadingButtonContent: "Loading please wait",
        },
      };

    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        forgotPasswordInputData: {
          data: {},
          loading: true,
          error: false,
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        forgotPasswordInputData: {
          data: {},
          loading: true,
          error: action.data,
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case DELETE_ACCOUNT_START:
      return {
        ...state,
        deleteAccount: {
          data: {},
          loading: true,
          error: {},
          inputData: action.data,
          buttonDisable: true,
          loadingButtonContent: "Loading please wait",
        },
      };

    case DELETE_ACCOUNT_SUCCESS:
      return {
        ...state,
        deleteAccount: {
          data: action.data,
          loading: true,
          error: {},
          inputData: {},
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case DELETE_ACCOUNT_FAILURE:
      return {
        ...state,
        deleteAccount: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case REGISTER_VERIFY_START:
      return {
        ...state,
        registerVerify: {
          inputData: action.data,
          buttonDisable: true,
          loadingButtonContent: "Loading please wait",
          data: {},
          loading: true,
        },
      };
    case REGISTER_VERIFY_SUCCESS:
      return {
        ...state,
        registerVerify: {
          inputData: {},
          buttonDisable: false,
          loadingButtonContent: null,
          data: action.data,
          loading: false,
        },
      };
    case REGISTER_VERIFY_FAILURE:
      return {
        ...state,
        registerVerify: {
          inputData: {},
          buttonDisable: false,
          loadingButtonContent: null,
          data: {},
          error: action.error,
          loading: true,
        },
      };
    case REGISTER_VERIFY_RESEND_START:
      return {
        ...state,
        registerVerifyResend: {
          inputData: action.data,
          buttonDisable: true,
          loadingButtonContent: "Loading please wait",
          data: {},
          loading: true,
        },
      };
    case REGISTER_VERIFY_RESEND_SUCCESS:
      return {
        ...state,
        registerVerifyResend: {
          inputData: {},
          buttonDisable: false,
          loadingButtonContent: null,
          data: action.data,
          loading: false,
        },
      };
    case REGISTER_VERIFY_RESEND_FAILURE:
      return {
        ...state,
        registerVerifyResend: {
          inputData: {},
          buttonDisable: false,
          loadingButtonContent: null,
          data: {},
          error: action.error,
          loading: true,
        },
      };
    case NOTIFICATION_STATUS_UPDATE_START:
      return {
        ...state,
        notificationUpdate: {
          inputData: action.data,
          data: {},
          loading: true,
        },
      };
    case NOTIFICATION_STATUS_UPDATE_SUCCESS:
      return {
        ...state,
        notificationUpdate: {
          inputData: {},
          data: action.data,
          loading: false,
          error: false,
        },
        profile: {
          data: action.data.data,
          loading: false,
          error: false,
        },
      };
    case NOTIFICATION_STATUS_UPDATE_FAILURE:
      return {
        ...state,
        notificationUpdate: {
          inputData: {},
          data: {},
          error: action.error,
          loading: true,
        },
      };
    case FETCH_PAYMENTS_START:
      return {
        ...state,
        payments: {
          data: {},
          loading: true,
          error: false,
        },
      };
    case FETCH_PAYMENTS_SUCCESS:
      return {
        ...state,
        payments: {
          data: action.data.data,
          loading: false,
          error: false,
        },
      };
    case FETCH_PAYMENTS_FAILURE:
      return {
        ...state,
        payments: {
          data: {},
          loading: true,
          error: action.error,
        },
      };

    case FETCH_BLOCK_USERS_START:
      return {
        ...state,
        blockUsers: {
          data: {},
          loading: true,
          error: false,
        },
      };
    case FETCH_BLOCK_USERS_SUCCESS:
      return {
        ...state,
        blockUsers: {
          data: action.data,
          loading: false,
          error: false,
        },
      };
    case FETCH_BLOCK_USERS_FAILURE:
      return {
        ...state,
        blockUsers: {
          data: {},
          loading: true,
          error: action.error,
        },
      };
    case SAVE_BLOCK_USER_START:
      return {
        ...state,
        saveBlockUser: {
          data: {},
          loading: true,
          error: false,
          inputData: action.data,
          loadingButtonContent: "Loading... Please wait.",
          buttonDisable: true,
        },
      };
    case SAVE_BLOCK_USER_SUCCESS:
      return {
        ...state,
        saveBlockUser: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case SAVE_BLOCK_USER_FAILURE:
      return {
        ...state,
        saveBlockUser: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case USER_VERIFY_BADGE_STATUS_START:
      return {
        ...state,
        verifyBadgeUpdate: {
          inputData: action.data,
          data: {},
          loading: true,
        },
      };
    case USER_VERIFY_BADGE_STATUS_SUCCESS:
      return {
        ...state,
        verifyBadgeUpdate: {
          inputData: {},
          data: action.data,
          loading: false,
          error: false,
        },
        profile: {
          data: action.data.data,
          loading: false,
          error: false,
        },
      };
    case USER_VERIFY_BADGE_STATUS_FAILURE:
      return {
        ...state,
        verifyBadgeUpdate: {
          inputData: {},
          data: {},
          error: action.error,
          loading: true,
        },
      };
    case RESET_PASSWORD_START:
      return {
        ...state,
        resetPasswordInputData: {
          inputData: action.data,
        },
        buttonDisable: true,
        loadingButtonContent: "Loading please wait",
      };

    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        profile: {
          data: action.data.data,
          loading: false,
          error: false,
        },
        inputData: {
          data: {},
          loading: true,
          error: false,
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case RESET_PASSWORD_FAILURE:
      return {
        ...state,
        buttonDisable: false,
        loadingButtonContent: null,
      };
    case USERNAME_VALIDATION_START:
      return {
        ...state,
        validationInputData: {
          data: {
            ...action.data,
          },
          loading: true,
          error: false,
          buttonDisable: true,
          loadingButtonContent: "Loading please wait",
        },
      };

    case USERNAME_VALIDATION_SUCCESS:
      return {
        ...state,
        // profile: {
        //   data: action.data.data,
        // },
        validationInputData: {
          data: {},
          loading: false,
          error: false,
          isValid: true,
          isInValid: false,
        },
      };
    case USERNAME_VALIDATION_FAILURE:
      return {
        ...state,
        validationInputData: {
          data: {},
          loading: false,
          error: action.data,
          isInValid: true,
          isValid: false,
        },
      };
    case USERNAME_VALIDATION_EMPTY:
      return {
        ...state,
        validationInputData: {
          data: {},
          loading: false,
          error: false,
          isInValid: false,
          isValid: false,
        },
      };
    case LOGOUT_START:
      return {
        ...state,
        validationInputData: {
          data: {},
          loading: false,
          error: false,
          isInValid: false,
          isValid: false,
        },
      };
    case FETCH_STRIPE_CONNECT_START:
      return {
        ...state,
        stripeConnect: {
          loading: true,
          error: false,
          inputData: action.data,
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case FETCH_STRIPE_CONNECT_SUCCESS:
      return {
        ...state,
        stripeConnect: {
          loading: true,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case FETCH_STRIPE_CONNECT_FAILED:
      return {
        ...state,
        stripeConnect: {
          loading: true,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    default:
      return state;
  }
};

export default userReducer;
