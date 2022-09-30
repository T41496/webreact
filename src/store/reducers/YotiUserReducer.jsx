import {
    FETCH_YOTI_USER_DETAILS_STRAT,
    FETCH_YOTI_USER_DETAILS_SUCCESS,
    FETCH_YOTI_USER_DETAILS_FAILURE,
   
  } from "../actions/ActionConstant";
  

  const initialState = {
      yotiUser: {
        data: {},
        loading: true,
        error: false,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
      },
   
  };
  
  const YotiUserReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_YOTI_USER_DETAILS_STRAT:
          console.log(action.data);
        return {
            ...state,
            yotiUser: {
              data: {},
              loading: true,
              error: false,
              inputData: action.data,
              loadingButtonContent: "Loading... Please wait.",
              buttonDisable: true,
            },
        };
      case FETCH_YOTI_USER_DETAILS_SUCCESS:
        return {
            ...state,
            yotiUser: {
              data: action.data,
              loading: false,
              error: false,
              inputData: {},
              loadingButtonContent: null,
              buttonDisable: false,
            },
        };
      case FETCH_YOTI_USER_DETAILS_FAILURE:
        return {
            ...state,
            yotiUser: {
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
  
  export default YotiUserReducer;
  