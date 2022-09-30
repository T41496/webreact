import {
    FETCH_YOTI_DETAILS_STRAT,
    FETCH_YOTI_DETAILS_SUCCESS,
    FETCH_YOTI_DETAILS_FAILURE,
   
  } from "../actions/ActionConstant";
  

  const initialState = {
    yotiSession: {
        data: {},
        loading: true,
        error: false,
      },
   
  };
  
  const YotiReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_YOTI_DETAILS_STRAT:
        return {
            ...state,
            yotiSession: {
              data: {},
              loading: true,
              error: false,
            },
        };
      case FETCH_YOTI_DETAILS_SUCCESS:
          console.log('yoti:');
          console.log(action.data.data);
        return {
            ...state,
            yotiSession: {
              data: action.data.data,
              loading: false,
              error: false,
            },
        };
      case FETCH_YOTI_DETAILS_FAILURE:
        return {
            ...state,
            yotiSession: {
          data: {},
          loading: true,
          error: action.error,
        },
        };
       
  
      default:

        return state;

    }

  };
  
  export default YotiReducer;
  