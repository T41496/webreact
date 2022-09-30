import {
  FETCH_FAV_START,
  FETCH_FAV_SUCCESS,
  FETCH_FAV_FAILURE,
  SAVE_FAV_START,
  SAVE_FAV_SUCCESS,
  SAVE_FAV_FAILURE,
  DELETE_FAV_START,
  DELETE_FAV_SUCCESS,
  DELETE_FAV_FAILURE,
} from "../actions/ActionConstant";

const initialState = {
  fav: {
    data: {
      favs: [],
    },
    loading: true,
    error: false,
    skip: 0,
    length: 0,
  },
  saveFav: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  deleteFav: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
};

const FavReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FAV_START:
      return {
        ...state,
        fav: {
          inputData: action.data,
          data: {
            favs: [...state.fav.data.favs],
          },
          loading: true,
          error: false,
          skip: state.fav.skip,
          length: state.fav.length,
        },
      };
    case FETCH_FAV_SUCCESS:
      return {
        ...state,
        fav: {
          data: {
            favs: [...state.fav.data.favs, ...action.data.fav_users],
          },
          loading: false,
          error: false,
          inputData: {},
          skip: action.data.fav_users.length + state.fav.skip,
          length: action.data.fav_users.length,
        },
      };
    case FETCH_FAV_FAILURE:
      return {
        ...state,
        fav: {
          data: {},
          loading: true,
          error: action.error,
          skip: state.fav.skip,
          length: state.fav.length,
        },
      };
    case SAVE_FAV_START:
      return {
        ...state,
        saveFav: {
          data: {},
          loading: true,
          error: false,
          inputData: action.data,
          loadingButtonContent: "Loading... Please wait.",
          buttonDisable: true,
        },
      };
    case SAVE_FAV_SUCCESS:
      return {
        ...state,
        saveFav: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case SAVE_FAV_FAILURE:
      return {
        ...state,
        saveFav: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case DELETE_FAV_START:
      return {
        ...state,
        deleteFav: {
          data: {},
          loading: true,
          error: false,
          inputData: action.data,
          loadingButtonContent: "Loading...",
          buttonDisable: true,
        },
      };
    case DELETE_FAV_SUCCESS:
      return {
        ...state,
        deleteFav: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case DELETE_FAV_FAILURE:
      return {
        ...state,
        deleteFav: {
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

export default FavReducer;
