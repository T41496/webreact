import {
  GET_KYC_DOCUMENT_START,
  GET_KYC_DOCUMENT_SUCCESS,
  GET_KYC_DOCUMENT_FAILURE,
  ADD_KYC_DOCUMENT_START,
  ADD_KYC_DOCUMENT_SUCCESS,
  ADD_KYC_DOCUMENT_FAILURE,
} from "../actions/ActionConstant";

const initialState = {
  addKycDocInput: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    buttonDisable: false,
    loadingButtonContent: null,
  },
  kycDocDetails: {
    data: {},
    loading: true,
    error: false,
  },
  buttonDisable: false,
  loadingButtonContent: null,
};

const KycDocumentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_KYC_DOCUMENT_START:
      return {
        ...state,
        addKycDocInput: {
          data: {},
          loading: true,
          error: false,
          inputData: action.data,
          buttonDisable: true,
          loadingButtonContent: "Loading...",
        },
      };
    case ADD_KYC_DOCUMENT_SUCCESS:
      return {
        ...state,
        addKycDocInput: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          buttonDisable: false,
          loadingButtonContent: "Send for Approval",
        },
      };
    case ADD_KYC_DOCUMENT_FAILURE:
      return {
        ...state,
        addKycDocInput: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          buttonDisable: false,
          loadingButtonContent: "Send for Approval",
        },
      };
    case GET_KYC_DOCUMENT_START:
      return {
        ...state,
        kycDocDetails: {
          data: {},
          loading: true,
          error: false,
        },
      };
    case GET_KYC_DOCUMENT_SUCCESS:
      return {
        ...state,
        kycDocDetails: {
          data: action.data,
          loading: false,
          error: false,
        },
      };
    case GET_KYC_DOCUMENT_FAILURE:
      return {
        ...state,
        kycDocDetails: {
          data: {},
          loading: true,
          error: action.error,
        },
      };

    default:
      return state;
  }
};

export default KycDocumentReducer;
