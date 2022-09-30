import {
  FETCH_CARD_DETAILS_START,
  FETCH_CARD_DETAILS_SUCCESS,
  FETCH_CARD_DETAILS_FAILURE,
  DELETE_CARD_START,
  DELETE_CARD_SUCCESS,
  DELETE_CARD_FAILURE,
  SELECT_DEFAULT_CARD_START,
  SELECT_DEFAULT_CARD_SUCCESS,
  SELECT_DEFAULT_CARD_FAILURE,
} from "./ActionConstant";

// Get Card Details actions.

export function fetchCardDetailsStart(data) {
  return {
    type: FETCH_CARD_DETAILS_START,
    data,
  };
}

export function fetchCardDetailsSuccess(data) {
  return {
    type: FETCH_CARD_DETAILS_SUCCESS,
    data,
  };
}

export function fetchCardDetailsFailure(error) {
  return {
    type: FETCH_CARD_DETAILS_FAILURE,
    error,
  };
}

//  Delete card actions.

export function deleteCardStart(data) {
  return {
    type: DELETE_CARD_START,
    data,
  };
}

export function deleteCardSuccess(data) {
  return {
    type: DELETE_CARD_SUCCESS,
    data,
  };
}

export function deleteCardFailure(error) {
  return {
    type: DELETE_CARD_FAILURE,
    error,
  };
}

// Make default card actions.

export function selectDefaultCardStart(data) {
  return {
    type: SELECT_DEFAULT_CARD_START,
    data,
  };
}

export function selectDefaultCardSuccess(data) {
  return {
    type: SELECT_DEFAULT_CARD_SUCCESS,
    data,
  };
}

export function selectDefaultCardFailure(error) {
  return {
    type: SELECT_DEFAULT_CARD_FAILURE,
    error,
  };
}
