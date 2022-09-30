import {
    FETCH_YOTI_DETAILS_STRAT,
    FETCH_YOTI_DETAILS_SUCCESS,
    FETCH_YOTI_DETAILS_FAILURE,
 
  } from "./ActionConstant";
  
  export function fetchYotiDetailsStart(data) {
    return {
      type: FETCH_YOTI_DETAILS_STRAT,
      data,
    };
  }
  
  export function fetchYotiDetailsSuccess(data) {
    return {
      type: FETCH_YOTI_DETAILS_SUCCESS,
      data,
    };
  }
  
  export function fetchYotiDetailsFailure(error) {
    return {
      type: FETCH_YOTI_DETAILS_FAILURE,
      error,
    };
  }
  
  
  