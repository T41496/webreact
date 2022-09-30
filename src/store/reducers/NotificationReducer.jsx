import {
  FETCH_NOTIFICATIONS_START,
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_NOTIFICATIONS_FAILURE,
} from "../actions/ActionConstant";

const initialState = {
  notification: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
  },
  notifications: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
  },
};

const NotificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NOTIFICATIONS_START:
      return {
        ...state,
        notification: {
          data: {},
          loading: true,
          error: false,
          inputData: action.data,
        },
      };
    case FETCH_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notification: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
        },
      };
    case FETCH_NOTIFICATIONS_FAILURE:
      return {
        ...state,
        notification: {
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

export default NotificationReducer;
