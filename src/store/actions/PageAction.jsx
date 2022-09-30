import {
  FETCH_SINGLE_PAGE_START,
  FETCH_SINGLE_PAGE_SUCCESS,
  FETCH_SINGLE_PAGE_FAILURE,
} from "./ActionConstant";

export function fetchSinglePageStart(data) {
  return {
    type: FETCH_SINGLE_PAGE_START,
    data,
  };
}

export function fetchSinglePageSuccess(data) {
  return {
    type: FETCH_SINGLE_PAGE_SUCCESS,
    data,
  };
}

export function fetchSinglePageFailure(error) {
  return {
    type: FETCH_SINGLE_PAGE_FAILURE,
    error,
  };
}
