import {
  FETCH_ALL_TRANSACTION_START,
  FETCH_ALL_TRANSACTION_SUCCESS,
  FETCH_ALL_TRANSACTION_FAILURE,
  FETCH_SENT_PAYMENT_TRANSACTION_START,
  FETCH_SENT_PAYMENT_TRANSACTION_SUCCESS,
  FETCH_SENT_PAYMENT_TRANSACTION_FAILURE,
  FETCH_RECEIVED_PAYMENT_TRANSACTION_START,
  FETCH_RECEIVED_PAYMENT_TRANSACTION_SUCCESS,
  FETCH_RECEIVED_PAYMENT_TRANSACTION_FAILURE,
  FETCH_DEPOSIT_TRANSACTION_START,
  FETCH_DEPOSIT_TRANSACTION_SUCCESS,
  FETCH_DEPOSIT_TRANSACTION_FAILURE,
} from "../actions/ActionConstant";

const initialState = {
  allTransaction: {
    data: {},
    loading: true,
    error: false,
  },
  sentPayTrans: {
    data: {},
    loading: true,
    error: false,
  },
  receivedPayTrans: {
    data: {},
    loading: true,
    error: false,
  },
  depositTrans: {
    data: {},
    loading: true,
    error: false,
  },
  buttonDisable: false,
  loadingButtonContent: null,
};

const TransactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_TRANSACTION_START:
      return {
        ...state,
        allTransaction: {
          data: {},
          loading: true,
          error: false,
        },
      };
    case FETCH_ALL_TRANSACTION_SUCCESS:
      return {
        ...state,
        allTransaction: {
          data: action.data,
          loading: false,
          error: false,
        },
      };
    case FETCH_ALL_TRANSACTION_FAILURE:
      return {
        ...state,
        allTransaction: {
          data: {},
          loading: true,
          error: action.error,
        },
      };
    case FETCH_SENT_PAYMENT_TRANSACTION_START:
      return {
        ...state,
        sentPayTrans: {
          data: {},
          loading: true,
          error: false,
        },
      };
    case FETCH_SENT_PAYMENT_TRANSACTION_SUCCESS:
      return {
        ...state,
        sentPayTrans: {
          data: action.data,
          loading: false,
          error: false,
        },
      };
    case FETCH_SENT_PAYMENT_TRANSACTION_FAILURE:
      return {
        ...state,
        sentPayTrans: {
          data: {},
          loading: true,
          error: action.error,
        },
      };
    case FETCH_RECEIVED_PAYMENT_TRANSACTION_START:
      return {
        ...state,
        receivedPayTrans: {
          data: {},
          loading: true,
          error: false,
        },
      };
    case FETCH_RECEIVED_PAYMENT_TRANSACTION_SUCCESS:
      return {
        ...state,
        receivedPayTrans: {
          data: action.data,
          loading: false,
          error: false,
        },
      };
    case FETCH_RECEIVED_PAYMENT_TRANSACTION_FAILURE:
      return {
        ...state,
        receivedPayTrans: {
          data: {},
          loading: true,
          error: action.error,
        },
      };
    case FETCH_DEPOSIT_TRANSACTION_START:
      return {
        ...state,
        depositTrans: {
          data: {},
          loading: true,
          error: false,
        },
      };
    case FETCH_DEPOSIT_TRANSACTION_SUCCESS:
      return {
        ...state,
        depositTrans: {
          data: action.data,
          loading: false,
          error: false,
        },
      };
    case FETCH_DEPOSIT_TRANSACTION_FAILURE:
      return {
        ...state,
        depositTrans: {
          data: {},
          loading: true,
          error: action.error,
        },
      };

    default:
      return state;
  }
};

export default TransactionReducer;
