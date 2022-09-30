import {
  FETCH_WITHDRAWALS_START,
  FETCH_WITHDRAWALS_SUCCESS,
  FETCH_WITHDRAWALS_FAILURE,
  SEND_WITHDRAW_REQUEST_START,
  SEND_WITHDRAW_REQUEST_SUCCESS,
  SEND_WITHDRAW_REQUEST_FAILURE,
  CANCEL_WITHDRAW_REQUEST_START,
  CANCEL_WITHDRAW_REQUEST_SUCCESS,
  CANCEL_WITHDRAW_REQUEST_FAILURE,
  SEARCH_WITHDRAWALS_START,
  SEARCH_WITHDRAWALS_SUCCESS,
  SEARCH_WITHDRAWALS_FAILURE,
  SEND_WALLET_RECHARGE_START,
  SEND_WALLET_RECHARGE_SUCCESS,
  SEND_WALLET_RECHARGE_FAILURE,
  FETCH_SINGLE_WITHDRAWALS_START,
  FETCH_SINGLE_WITHDRAWALS_SUCCESS,
  FETCH_SINGLE_WITHDRAWALS_FAILURE,
} from "../actions/ActionConstant";

const initialState = {
  withDrawals: {
    data: {},
    loading: true,
    error: false,
  },
  sendWithDraw: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    buttonDisable: false,
    loadingButtonContent: null,
  },
  cancelWithDraw: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    buttonDisable: false,
    loadingButtonContent: null,
  },
  sendWalletRecharge: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    buttonDisable: false,
    loadingButtonContent: null,
  },
  searchWithDraw: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
  },
  singleWithDraw: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
  },
  buttonDisable: false,
  loadingButtonContent: null,
};

const WithDrawReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WITHDRAWALS_START:
      return {
        ...state,
        withDrawals: {
          data: {},
          loading: true,
          error: false,
        },
      };
    case FETCH_WITHDRAWALS_SUCCESS:
      return {
        ...state,
        withDrawals: {
          data: action.data,
          loading: false,
          error: false,
        },
      };
    case FETCH_WITHDRAWALS_FAILURE:
      return {
        ...state,
        withDrawals: {
          data: {},
          loading: true,
          error: action.error,
        },
      };
    case SEND_WITHDRAW_REQUEST_START:
      return {
        ...state,
        sendWithDraw: {
          data: {},
          loading: true,
          error: false,
          inputData: action.data,
          buttonDisable: true,
          loadingButtonContent: "Loading...",
        },
      };
    case SEND_WITHDRAW_REQUEST_SUCCESS:
      return {
        ...state,
        sendWithDraw: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case SEND_WITHDRAW_REQUEST_FAILURE:
      return {
        ...state,
        sendWithDraw: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case SEND_WALLET_RECHARGE_START:
      return {
        ...state,
        sendWalletRecharge: {
          data: {},
          loading: true,
          error: false,
          inputData: action.data,
          buttonDisable: true,
          loadingButtonContent: "Loading...",
        },
      };
    case SEND_WALLET_RECHARGE_SUCCESS:
      return {
        ...state,
        sendWalletRecharge: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case SEND_WITHDRAW_REQUEST_FAILURE:
      return {
        ...state,
        sendWalletRecharge: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case CANCEL_WITHDRAW_REQUEST_START:
      return {
        ...state,
        cancelWithDraw: {
          data: {},
          loading: true,
          error: false,
          inputData: action.data,
          buttonDisable: true,
          loadingButtonContent: "Loading...",
        },
      };
    case CANCEL_WITHDRAW_REQUEST_SUCCESS:
      return {
        ...state,
        cancelWithDraw: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case CANCEL_WITHDRAW_REQUEST_FAILURE:
      return {
        ...state,
        cancelWithDraw: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };

    case SEARCH_WITHDRAWALS_START:
      return {
        ...state,
        searchWithDraw: {
          data: {},
          loading: true,
          error: false,
          inputData: action.data,
        },
      };
    case SEARCH_WITHDRAWALS_SUCCESS:
      return {
        ...state,
        searchWithDraw: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
        },
      };
    case SEARCH_WITHDRAWALS_FAILURE:
      return {
        ...state,
        searchWithDraw: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
        },
      };
    case FETCH_SINGLE_WITHDRAWALS_START:
      return {
        ...state,
        singleWithDraw: {
          data: {},
          loading: true,
          error: false,
          inputData: action.data,
        },
      };
    case FETCH_SINGLE_WITHDRAWALS_SUCCESS:
      return {
        ...state,
        singleWithDraw: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
        },
      };
    case FETCH_SINGLE_WITHDRAWALS_FAILURE:
      return {
        ...state,
        singleWithDraw: {
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

export default WithDrawReducer;
