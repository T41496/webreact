import {
  SEND_TIP_BY_STRIPE_START,
  SEND_TIP_BY_STRIPE_SUCCESS,
  SEND_TIP_BY_STRIPE_FAILURE,
  SEND_TIP_BY_WALLET_START,
  SEND_TIP_BY_WALLET_SUCCESS,
  SEND_TIP_BY_WALLET_FAILURE,
  SEND_TIP_BY_PAYPAL_START,
  SEND_TIP_BY_PAYPAL_SUCCESS,
  SEND_TIP_BY_PAYPAL_FAILURE,
} from "../actions/ActionConstant";

const initialState = {
  tipStripe: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  tipWallet: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  tipPaypal: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
};

const SendTipReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_TIP_BY_STRIPE_START:
      return {
        ...state,
        tipStripe: {
          data: {},
          loading: true,
          error: false,
          inputData: action.data,
          loadingButtonContent: "Loading... Please wait.",
          buttonDisable: true,
        },
      };
    case SEND_TIP_BY_STRIPE_SUCCESS:
      return {
        ...state,
        tipStripe: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case SEND_TIP_BY_STRIPE_FAILURE:
      return {
        ...state,
        tipStripe: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
      case SEND_TIP_BY_PAYPAL_START:
        return {
          ...state,
          tipPaypal: {
            data: {},
            loading: true,
            error: false,
            inputData: action.data,
            loadingButtonContent: "Loading... Please wait.",
            buttonDisable: true,
          },
        };
      case SEND_TIP_BY_PAYPAL_SUCCESS:
        return {
          ...state,
          tipPaypal: {
            data: action.data,
            loading: false,
            error: false,
            inputData: {},
            loadingButtonContent: null,
            buttonDisable: false,
          },
        };
      case SEND_TIP_BY_PAYPAL_FAILURE:
        return {
          ...state,
          tipPaypal: {
            data: {},
            loading: true,
            error: action.error,
            inputData: {},
            loadingButtonContent: null,
            buttonDisable: false,
          },
        };
    case SEND_TIP_BY_WALLET_START:
      return {
        ...state,
        tipWallet: {
          data: {},
          loading: true,
          error: false,
          inputData: action.data,
          loadingButtonContent: "Loading... Please wait.",
          buttonDisable: true,
        },
      };
    case SEND_TIP_BY_WALLET_SUCCESS:
      return {
        ...state,
        tipWallet: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case SEND_TIP_BY_WALLET_FAILURE:
      return {
        ...state,
        tipWallet: {
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

export default SendTipReducer;
