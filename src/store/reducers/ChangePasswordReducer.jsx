import {
  CHANGE_PASSWORD_START,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILURE,
  EDIT_CHANGE_PASSWORD,
} from "../actions/ActionConstant";

const initialState = {
  inputData: {
    data: {},
    loading: true,
    error: false,
    success: {},
  },
  buttonDisable: false,
  loadingButtonContent: null,
};

const ChangePasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_PASSWORD_START:
      return {
        ...state,
        inputData: {
          data: action.data,
          loading: true,
          error: false,
        },
        buttonDisable: true,
        loadingButtonContent: "Loading please wait",
      };
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        inputData: {
          data: {},
          success: action.data,
          loading: false,
          error: false,
        },
        buttonDisable: false,
        loadingButtonContent: null,
      };
    case CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        inputData: {
          data: {},
          loading: true,
          error: action.error,
        },
        buttonDisable: false,
        loadingButtonContent: null,
      };
    case EDIT_CHANGE_PASSWORD:
      return {
        ...state,
        inputData: {
          loading: false,
          error: false,
          data: {
            ...state.inputData.data,
            [action.name]: action.value,
          },
        },
      };
    default:
      return state;
  }
};

export default ChangePasswordReducer;
