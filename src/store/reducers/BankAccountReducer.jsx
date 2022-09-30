import {
  ADD_BANK_ACCOUNT_START,
  ADD_BANK_ACCOUNT_SUCCESS,
  ADD_BANK_ACCOUNT_FAILURE,
  DELETE_BANK_ACCOUNT_START,
  DELETE_BANK_ACCOUNT_SUCCESS,
  DELETE_BANK_ACCOUNT_FAILURE,
  GET_BANK_ACCOUNT_START,
  GET_BANK_ACCOUNT_SUCCESS,
  GET_BANK_ACCOUNT_FAILURE,
  MAKE_DEFAULT_BANK_ACCOUNT_START,
  MAKE_DEFAULT_BANK_ACCOUNT_SUCCESS,
  MAKE_DEFAULT_BANK_ACCOUNT_FAILURE,
  FETCH_SINGLE_BANK_ACCOUNT_START,
  FETCH_SINGLE_BANK_ACCOUNT_SUCCESS,
  FETCH_SINGLE_BANK_ACCOUNT_FAILURE,
  ADD_BANK_ACCOUNT_DATA,
} from "../actions/ActionConstant";

const initialState = {
  addBankAccountInput: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  bankAccount: {
    data: {},
    loading: true,
    error: false,
  },
  deleteAccount: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
  },
  makeDefault: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
  },
  singleAccount: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
  },
  buttonDisable: false,
  loadingButtonContent: null,
};

const BankAccountReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BANK_ACCOUNT_START:
      return {
        ...state,
        addBankAccountInput: {
          data: {},
          loading: true,
          error: false,
          inputData: action.data,
          loadingButtonContent: "Loading... Please wait",
          buttonDisable: true,
        },
      };
    case ADD_BANK_ACCOUNT_SUCCESS:
      return {
        ...state,
        addBankAccountInput: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case ADD_BANK_ACCOUNT_FAILURE:
      return {
        ...state,
        addBankAccountInput: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case GET_BANK_ACCOUNT_START:
      return {
        ...state,
        bankAccount: {
          data: {},
          loading: true,
          error: false,
        },
      };
    case GET_BANK_ACCOUNT_SUCCESS:
      return {
        ...state,
        bankAccount: {
          data: action.data,
          loading: false,
          error: false,
        },
      };
    case GET_BANK_ACCOUNT_FAILURE:
      return {
        ...state,
        bankAccount: {
          data: {},
          loading: true,
          error: action.error,
        },
      };
    case DELETE_BANK_ACCOUNT_START:
      return {
        ...state,
        deleteAccount: {
          inputData: action.data,
          data: {},
          loading: true,
          error: false,
        },
      };
    case DELETE_BANK_ACCOUNT_SUCCESS:
      return {
        ...state,
        deleteAccount: {
          data: action.data,
          loading: false,
          error: false,
        },
      };
    case DELETE_BANK_ACCOUNT_FAILURE:
      return {
        ...state,
        deleteAccount: {
          data: {},
          loading: true,
          error: action.error,
        },
      };
    case MAKE_DEFAULT_BANK_ACCOUNT_START:
      return {
        ...state,
        makeDefault: {
          inputData: action.data,
          data: {},
          loading: true,
          error: false,
        },
      };
    case MAKE_DEFAULT_BANK_ACCOUNT_SUCCESS:
      return {
        ...state,
        makeDefault: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
        },
      };
    case MAKE_DEFAULT_BANK_ACCOUNT_FAILURE:
      return {
        ...state,
        makeDefault: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
        },
      };
    case FETCH_SINGLE_BANK_ACCOUNT_START:
      return {
        ...state,
        singleAccount: {
          inputData: action.data,
          data: {},
          loading: true,
          error: false,
        },
      };
    case FETCH_SINGLE_BANK_ACCOUNT_SUCCESS:
      return {
        ...state,
        singleAccount: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
        },
      };
    case FETCH_SINGLE_BANK_ACCOUNT_FAILURE:
      return {
        ...state,
        singleAccount: {
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

export default BankAccountReducer;
