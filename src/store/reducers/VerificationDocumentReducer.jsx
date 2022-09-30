import {
  FETCH_VERI_DOCUMENT_START,
  FETCH_VERI_DOCUMENT_SUCCESS,
  FETCH_VERI_DOCUMENT_FAILURE,
  SAVE_VERI_DOC_START,
  SAVE_VERI_DOC_SUCCESS,
  SAVE_VERI_DOC_FAILURE,
  DEL_VERI_DOC_START,
  DEL_VERI_DOC_SUCCESS,
  DEL_VERI_DOC_FAILURE,
  VERI_STATUS_CHECK_START,
  VERI_STATUS_CHECK_SUCCESS,
  VERI_STATUS_CHECK_FAILURE,
} from "../actions/ActionConstant";

const initialState = {
  docs: {
    data: {},
    loading: true,
    error: false,
  },
  saveDocs: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  delDocs: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  docStatus: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
};

const VerificationDocumentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_VERI_DOCUMENT_START:
      return {
        ...state,
        docs: {
          data: {},
          loading: true,
          error: false,
        },
      };
    case FETCH_VERI_DOCUMENT_SUCCESS:
      return {
        ...state,
        docs: {
          data: action.data,
          loading: false,
          error: false,
        },
      };
    case FETCH_VERI_DOCUMENT_FAILURE:
      return {
        ...state,
        docs: {
          data: {},
          loading: true,
          error: action.error,
        },
      };
    case SAVE_VERI_DOC_START:
      return {
        ...state,
        saveDocs: {
          data: {},
          loading: true,
          error: false,
          inputData: action.data,
          loadingButtonContent: "Loading... Please wait.",
          buttonDisable: true,
        },
      };
    case SAVE_VERI_DOC_SUCCESS:
      return {
        ...state,
        saveDocs: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case SAVE_VERI_DOC_FAILURE:
      return {
        ...state,
        saveDocs: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case DEL_VERI_DOC_START:
      return {
        ...state,
        delDocs: {
          data: {},
          loading: true,
          error: false,
          inputData: action.data,
          loadingButtonContent: "Loading...",
          buttonDisable: true,
        },
      };
    case DEL_VERI_DOC_SUCCESS:
      return {
        ...state,
        delDocs: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case DEL_VERI_DOC_FAILURE:
      return {
        ...state,
        delDocs: {
          data: {},
          loading: true,
          error: action.data,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case VERI_STATUS_CHECK_START:
      return {
        ...state,
        docStatus: {
          data: {},
          loading: true,
          error: false,
          inputData: action.data,
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case VERI_STATUS_CHECK_SUCCESS:
      return {
        ...state,
        docStatus: {
          data: action.data,
          loading: true,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case VERI_STATUS_CHECK_FAILURE:
      return {
        ...state,
        docStatus: {
          data: {},
          loading: true,
          error: action.data,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    default:
      return state;
  }
};

export default VerificationDocumentReducer;
