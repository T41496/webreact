import {
  ADD_BANK_ACCOUNT_START,
  ADD_BANK_ACCOUNT_SUCCESS,
  ADD_BANK_ACCOUNT_FAILURE,
  DELETE_BANK_ACCOUNT_START,
  DELETE_BANK_ACCOUNT_SUCCESS,
  DELETE_BANK_ACCOUNT_FAILURE,
  GET_BANK_ACCOUNT_START,
  GET_BANK_ACCOUNT_SUCCESS,
  GET_BANK_ACCOUNT_FAILURE,
  MAKE_DEFAULT_BANK_ACCOUNT_START,
  MAKE_DEFAULT_BANK_ACCOUNT_SUCCESS,
  MAKE_DEFAULT_BANK_ACCOUNT_FAILURE,
  FETCH_SINGLE_BANK_ACCOUNT_START,
  FETCH_SINGLE_BANK_ACCOUNT_SUCCESS,
  FETCH_SINGLE_BANK_ACCOUNT_FAILURE,
  ADD_BANK_ACCOUNT_DATA,
} from "./ActionConstant";

// Add bank account actions.

export function getBankAccountData(name, value) {
  return {
    type: ADD_BANK_ACCOUNT_DATA,
    name,
    value,
  };
}

export function addBankAccountStart(data) {
  return {
    type: ADD_BANK_ACCOUNT_START,
    data,
  };
}

export function addBankAccountSuccess(data) {
  return {
    type: ADD_BANK_ACCOUNT_SUCCESS,
    data,
  };
}

export function addBankAccountFailure(error) {
  return {
    type: ADD_BANK_ACCOUNT_FAILURE,
    error,
  };
}

// Delete bank account actions.

export function deleteBankAccountStart(data) {
  return {
    type: DELETE_BANK_ACCOUNT_START,
    data,
  };
}

export function deleteBankAccountSuccess(data) {
  return {
    type: DELETE_BANK_ACCOUNT_SUCCESS,
    data,
  };
}

export function deleteBankAccountFailure(error) {
  return {
    type: DELETE_BANK_ACCOUNT_FAILURE,
    error,
  };
}

// Get bank account actions.

export function getBankAccountStart(data) {
  return {
    type: GET_BANK_ACCOUNT_START,
    data,
  };
}

export function getBankAccountSuccess(data) {
  return {
    type: GET_BANK_ACCOUNT_SUCCESS,
    data,
  };
}

export function getBankAccountFailure(error) {
  return {
    type: GET_BANK_ACCOUNT_FAILURE,
    error,
  };
}

// Get bank account actions.

export function fetchSingleBankAccountStart(data) {
  return {
    type: FETCH_SINGLE_BANK_ACCOUNT_START,
    data,
  };
}

export function fetchSingleBankAccountSuccess(data) {
  return {
    type: FETCH_SINGLE_BANK_ACCOUNT_SUCCESS,
    data,
  };
}

export function fetchSingleBankAccountFailure(error) {
  return {
    type: FETCH_SINGLE_BANK_ACCOUNT_FAILURE,
    error,
  };
}

// Get bank account actions.

export function makeDefaultBankAccountStart(data) {
  return {
    type: MAKE_DEFAULT_BANK_ACCOUNT_START,
    data,
  };
}

export function makeDefaultBankAccountSuccess(data) {
  return {
    type: MAKE_DEFAULT_BANK_ACCOUNT_SUCCESS,
    data,
  };
}

export function makeDefaultBankAccountFailure(error) {
  return {
    type: MAKE_DEFAULT_BANK_ACCOUNT_FAILURE,
    error,
  };
}
