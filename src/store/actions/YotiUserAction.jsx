import {
    FETCH_YOTI_USER_DETAILS_STRAT,
    FETCH_YOTI_USER_DETAILS_SUCCESS,
    FETCH_YOTI_USER_DETAILS_FAILURE,
 
  } from "./ActionConstant";
  
  export function fetchYotiUserDetailsStart(data) {
    return {
      type: FETCH_YOTI_USER_DETAILS_STRAT,
      data,
    };
  }
  
  export function fetchYotiUserDetailsSuccess(data) {
    return {
      type: FETCH_YOTI_USER_DETAILS_SUCCESS,
      data,
    };
  }
  
  export function fetchYotiUserDetailsFailure(error) {
    return {
      type: FETCH_YOTI_USER_DETAILS_FAILURE,
      error,
    };
  }
  
  
  