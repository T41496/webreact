import {
  SAVE_PRO_OWNER_START,
  SAVE_PRO_OWNER_SUCCESS,
  SAVE_PRO_OWNER_FAILURE,
  FETCH_SINGLE_PRO_OWNER_START,
  FETCH_SINGLE_PRO_OWNER_SUCCESS,
  FETCH_SINGLE_PRO_OWNER_FAILURE,
  SET_VISIBILITY_PRO_OWNER_START,
  SET_VISIBILITY_PRO_OWNER_SUCCESS,
  SET_VISIBILITY_PRO_OWNER_FAILURE,
  UPDATE_AVAILABILITY_PRO_OWNER_START,
  UPDATE_AVAILABILITY_PRO_OWNER_SUCCESS,
  UPDATE_AVAILABILITY_PRO_OWNER_FAILURE,
  FETCH_PRODUCTS_PRO_OWNER_START,
  FETCH_PRODUCTS_PRO_OWNER_SUCCESS,
  FETCH_PRODUCTS_PRO_OWNER_FAILURE,
  FETCH_PRO_CATE_PRO_OWNER_START,
  FETCH_PRO_CATE_PRO_OWNER_SUCCESS,
  FETCH_PRO_CATE_PRO_OWNER_FAILURE,
  FETCH_PRO_SUBCATE_PRO_OWNER_START,
  FETCH_PRO_SUBCATE_PRO_OWNER_SUCCESS,
  FETCH_PRO_SUBCATE_PRO_OWNER_FAILURE,
  PRO_SEARCH_PRO_OWNER_START,
  PRO_SEARCH_PRO_OWNER_SUCCESS,
  PRO_SEARCH_PRO_OWNER_FAILURE,
  FETCH_PRO_IMAGE_PRO_OWNER_START,
  FETCH_PRO_IMAGE_PRO_OWNER_SUCCESS,
  FETCH_PRO_IMAGE_PRO_OWNER_FAILURE,
  SAVE_PRO_IMAGE_PRO_OWNER_START,
  SAVE_PRO_IMAGE_PRO_OWNER_SUCCESS,
  SAVE_PRO_IMAGE_PRO_OWNER_FAILURE,
  DELETE_PRO_IMAGE_PRO_OWNER_START,
  DELETE_PRO_IMAGE_PRO_OWNER_SUCCESS,
  DELETE_PRO_IMAGE_PRO_OWNER_FAILURE,
} from "../actions/ActionConstant";

const initialState = {
  saveProduct: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    buttonDisable: false,
    loadingButtonContent: null,
  },
  singlePro: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
  },
  setVisible: {
    inputData: {},
    data: {},
    loading: true,
    error: false,
  },
  updateAva: {
    inputData: {},
    loading: true,
    error: false,
    success: {},
    buttonDisable: false,
    loadingButtonContent: null,
  },
  products: {
    loading: true,
    error: false,
    success: {},
  },
  proCategory: {
    loading: true,
    error: false,
    success: {},
  },
  proSubCategory: {
    loading: true,
    error: false,
    success: {},
    inputData: {},
  },
  proSearch: {
    loading: true,
    error: false,
    success: {},
    inputData: {},
  },
  proImage: {
    loading: true,
    error: false,
    success: {},
    inputData: {},
  },
  saveProImage: {
    inputData: {},
    loading: true,
    error: false,
    success: {},
    buttonDisable: false,
    loadingButtonContent: null,
  },
  delProImage: {
    inputData: {},
    loading: true,
    error: false,
    success: {},
    buttonDisable: false,
    loadingButtonContent: null,
  },
};

const ProductOwnerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_PRO_OWNER_START:
      return {
        ...state,
        saveProduct: {
          data: {},
          loading: true,
          error: false,
          inputData: action.data,
          buttonDisable: true,
          loadingButtonContent: "Loading... Please wait",
        },
      };
    case SAVE_PRO_OWNER_SUCCESS:
      return {
        ...state,
        saveProduct: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case SAVE_PRO_OWNER_FAILURE:
      return {
        ...state,
        saveProduct: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case FETCH_SINGLE_PRO_OWNER_START:
      return {
        ...state,
        singlePro: {
          inputData: action.data,
          data: {},
          loading: true,
          error: false,
        },
      };
    case FETCH_SINGLE_PRO_OWNER_SUCCESS:
      return {
        ...state,
        singlePro: {
          inputData: {},
          data: action.data,
          loading: false,
          error: false,
        },
      };
    case FETCH_SINGLE_PRO_OWNER_FAILURE:
      return {
        ...state,
        singlePro: {
          inputData: {},
          data: {},
          loading: true,
          error: action.error,
        },
      };
    case SET_VISIBILITY_PRO_OWNER_START:
      return {
        ...state,
        setVisible: {
          data: {},
          inputData: action.data,
          loading: true,
          error: false,
        },
      };
    case SET_VISIBILITY_PRO_OWNER_SUCCESS:
      return {
        ...state,
        setVisible: {
          inputData: {},
          data: action.data,
          loading: false,
          error: false,
        },
      };
    case SET_VISIBILITY_PRO_OWNER_FAILURE:
      return {
        ...state,
        setVisible: {
          inputData: {},
          data: {},
          loading: true,
          error: action.error,
        },
      };
    case UPDATE_AVAILABILITY_PRO_OWNER_START:
      return {
        ...state,
        updateAva: {
          inputData: action.data,
          loading: true,
          error: false,
          success: {},
          buttonDisable: true,
          loadingButtonContent: "Processing.. Please wait...",
        },
      };
    case UPDATE_AVAILABILITY_PRO_OWNER_SUCCESS:
      return {
        ...state,
        updateAva: {
          loading: false,
          error: false,
          success: action.data,
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case UPDATE_AVAILABILITY_PRO_OWNER_FAILURE:
      return {
        ...state,
        updateAva: {
          loading: true,
          error: action.error,
          success: {},
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case FETCH_PRODUCTS_PRO_OWNER_START:
      return {
        ...state,
        products: {
          loading: true,
          error: false,
          success: {},
        },
      };
    case FETCH_PRODUCTS_PRO_OWNER_SUCCESS:
      return {
        ...state,
        products: {
          loading: false,
          error: false,
          success: action.data,
        },
      };
    case FETCH_PRODUCTS_PRO_OWNER_FAILURE:
      return {
        ...state,
        products: {
          loading: true,
          error: action.error,
          success: {},
        },
      };
    case FETCH_PRO_CATE_PRO_OWNER_START:
      return {
        ...state,
        proCategory: {
          loading: true,
          error: false,
          success: {},
        },
      };
    case FETCH_PRO_CATE_PRO_OWNER_SUCCESS:
      return {
        ...state,
        proCategory: {
          loading: false,
          error: false,
          success: action.data,
        },
      };
    case FETCH_PRO_CATE_PRO_OWNER_FAILURE:
      return {
        ...state,
        proCategory: {
          loading: true,
          error: action.error,
          success: {},
        },
      };
    case FETCH_PRO_SUBCATE_PRO_OWNER_START:
      return {
        ...state,
        proSubCategory: {
          inputData: action.data,
          loading: true,
          error: false,
          success: {},
        },
      };
    case FETCH_PRO_SUBCATE_PRO_OWNER_SUCCESS:
      return {
        ...state,
        proSubCategory: {
          inputData: {},
          loading: false,
          error: false,
          success: action.data,
        },
      };
    case FETCH_PRO_SUBCATE_PRO_OWNER_FAILURE:
      return {
        ...state,
        proSubCategory: {
          inputData: {},
          loading: true,
          error: action.error,
          success: {},
        },
      };
    case PRO_SEARCH_PRO_OWNER_START:
      return {
        ...state,
        proSearch: {
          inputData: action.data,
          loading: true,
          error: false,
          success: {},
        },
      };
    case PRO_SEARCH_PRO_OWNER_SUCCESS:
      return {
        ...state,
        proSearch: {
          inputData: {},
          loading: false,
          error: false,
          success: action.data,
        },
      };
    case PRO_SEARCH_PRO_OWNER_FAILURE:
      return {
        ...state,
        proSearch: {
          inputData: {},
          loading: true,
          error: action.error,
          success: {},
        },
      };
    case FETCH_PRO_IMAGE_PRO_OWNER_START:
      return {
        ...state,
        proImage: {
          inputData: action.data,
          loading: true,
          error: false,
          success: {},
        },
      };
    case FETCH_PRO_IMAGE_PRO_OWNER_SUCCESS:
      return {
        ...state,
        proImage: {
          inputData: {},
          loading: false,
          error: false,
          success: action.data,
        },
      };
    case FETCH_PRO_IMAGE_PRO_OWNER_FAILURE:
      return {
        ...state,
        proImage: {
          inputData: {},
          loading: true,
          error: action.error,
          success: {},
        },
      };
    case SAVE_PRO_IMAGE_PRO_OWNER_START:
      return {
        ...state,
        saveProImage: {
          inputData: action.data,
          loading: true,
          error: false,
          success: {},
          buttonDisable: true,
          loadingButtonContent: "Processing.. Please wait...",
        },
      };
    case SAVE_PRO_IMAGE_PRO_OWNER_SUCCESS:
      return {
        ...state,
        saveProImage: {
          loading: false,
          error: false,
          success: action.data,
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case SAVE_PRO_IMAGE_PRO_OWNER_FAILURE:
      return {
        ...state,
        saveProImage: {
          loading: true,
          error: action.error,
          success: {},
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case DELETE_PRO_IMAGE_PRO_OWNER_START:
      return {
        ...state,
        delProImage: {
          inputData: action.data,
          loading: true,
          error: false,
          success: {},
          buttonDisable: true,
          loadingButtonContent: "Processing.. Please wait...",
        },
      };
    case DELETE_PRO_IMAGE_PRO_OWNER_SUCCESS:
      return {
        ...state,
        delProImage: {
          loading: false,
          error: false,
          success: action.data,
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case DELETE_PRO_IMAGE_PRO_OWNER_FAILURE:
      return {
        ...state,
        delProImage: {
          loading: true,
          error: action.error,
          success: {},
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    default:
      return state;
  }
};

export default ProductOwnerReducer;
