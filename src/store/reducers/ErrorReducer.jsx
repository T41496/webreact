import { ERROR_LOGOUT_CHECK } from "../actions/ActionConstant";

const initialState = {
  error: null,
  isOpen: false,
};

const ErrorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ERROR_LOGOUT_CHECK:
      return {
        ...state,
        error: action.data,
        isOpen: true,
      };

    default:
      return state;
  }
};

export default ErrorReducer;
