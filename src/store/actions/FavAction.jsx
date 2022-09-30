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
} from "./ActionConstant";

export function fetchFavStart(data) {
  return {
    type: FETCH_FAV_START,
    data,
  };
}

export function fetchFavSuccess(data) {
  return {
    type: FETCH_FAV_SUCCESS,
    data,
  };
}

export function fetchFavFailure(error) {
  return {
    type: FETCH_FAV_FAILURE,
    error,
  };
}

export function saveFavStart(data) {
  return {
    type: SAVE_FAV_START,
    data,
  };
}

export function saveFavSuccess(data) {
  return {
    type: SAVE_FAV_SUCCESS,
    data,
  };
}

export function saveFavFailure(error) {
  return {
    type: SAVE_FAV_FAILURE,
    error,
  };
}

export function deleteFavStart(data) {
  return {
    type: DELETE_FAV_START,
    data,
  };
}

export function deleteFavSuccess(data) {
  return {
    type: DELETE_FAV_SUCCESS,
    data,
  };
}

export function deleteFavFailure(error) {
  return {
    type: DELETE_FAV_FAILURE,
    error,
  };
}
