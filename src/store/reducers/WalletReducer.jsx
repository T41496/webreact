import {
  FETCH_WALLET_DETAILS_START,
  FETCH_WALLET_DETAILS_SUCCESS,
  FETCH_WALLET_DETAILS_FAILURE,
  ADD_MONEY_VIA_CARD_START,
  ADD_MONEY_VIA_CARD_SUCCESS,
  ADD_MONEY_VIA_CARD_FAILURE,
  ADD_MONEY_VIA_BANK_START,
  ADD_MONEY_VIA_BANK_SUCCESS,
  ADD_MONEY_VIA_BANK_FAILURE,
} from "../actions/ActionConstant";

const initialState = {
  walletData: {
    data: {},
    loading: true,
    error: false,
  },
  addMoneyInput: {
    data: {},
    loading: true,
    error: false,
    buttonDisable: false,
    loadingButtonContent: null,
    successData: {},
  },
  buttonDisable: false,
  loadingButtonContent: null,
};

const WalletReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WALLET_DETAILS_START:
      return {
        ...state,
        walletData: {
          data: {},
          loading: true,
          error: false,
        },
      };
    case FETCH_WALLET_DETAILS_SUCCESS:
      return {
        ...state,
        walletData: {
          data: action.data,
          loading: false,
          error: false,
        },
      };
    case FETCH_WALLET_DETAILS_FAILURE:
      return {
        ...state,
        walletData: {
          data: {},
          loading: true,
          error: action.error,
        },
      };
    case ADD_MONEY_VIA_CARD_START:
      return {
        ...state,
        addMoneyInput: {
          data: action.data,
          loading: true,
          error: false,
          buttonDisable: true,
          loadingButtonContent: "Processing...",
          successData: {},
        },
      };
    case ADD_MONEY_VIA_CARD_SUCCESS:
      return {
        ...state,
        addMoneyInput: {
          data: {},
          loading: false,
          error: false,
          buttonDisable: false,
          loadingButtonContent: null,
          successData: action.data,
        },
      };
    case ADD_MONEY_VIA_CARD_FAILURE:
      return {
        ...state,
        addMoneyInput: {
          data: {},
          loading: true,
          error: action.error,
          buttonDisable: false,
          loadingButtonContent: null,
          successData: {},
        },
      };
    case ADD_MONEY_VIA_BANK_START:
      return {
        ...state,
        addMoneyInput: {
          data: action.data,
          loading: true,
          error: false,
          buttonDisable: true,
          loadingButtonContent: "Processing...",
          successData: {},
        },
      };
    case ADD_MONEY_VIA_BANK_SUCCESS:
      return {
        ...state,
        addMoneyInput: {
          data: {},
          loading: false,
          error: false,
          buttonDisable: false,
          loadingButtonContent: null,
          successData: action.data,
        },
      };
    case ADD_MONEY_VIA_BANK_FAILURE:
      return {
        ...state,
        addMoneyInput: {
          data: {},
          loading: true,
          error: action.error,
          buttonDisable: false,
          loadingButtonContent: null,
          successData: {},
        },
      };
    default:
      return state;
  }
};

export default WalletReducer;
