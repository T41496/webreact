import {
  SEND_WITHDRAW_REQUEST_START,
  SEND_WITHDRAW_REQUEST_SUCCESS,
  SEND_WITHDRAW_REQUEST_FAILURE,
  FETCH_WITHDRAWALS_START,
  FETCH_WITHDRAWALS_SUCCESS,
  FETCH_WITHDRAWALS_FAILURE,
  CANCEL_WITHDRAW_REQUEST_START,
  CANCEL_WITHDRAW_REQUEST_SUCCESS,
  CANCEL_WITHDRAW_REQUEST_FAILURE,
  SEARCH_WITHDRAWALS_START,
  SEARCH_WITHDRAWALS_SUCCESS,
  SEARCH_WITHDRAWALS_FAILURE,
  SEND_WALLET_RECHARGE_START,
  SEND_WALLET_RECHARGE_SUCCESS,
  SEND_WALLET_RECHARGE_FAILURE,
  FETCH_SINGLE_WITHDRAWALS_START,
  FETCH_SINGLE_WITHDRAWALS_SUCCESS,
  FETCH_SINGLE_WITHDRAWALS_FAILURE,
} from "./ActionConstant";

// Send withdraw actions.

export function sendWithDrawRequestStart(data) {
  return {
    type: SEND_WITHDRAW_REQUEST_START,
    data,
  };
}

export function sendWithDrawRequestSuccess(data) {
  return {
    type: SEND_WITHDRAW_REQUEST_SUCCESS,
    data,
  };
}

export function sendWithDrawRequestFailure(error) {
  return {
    type: SEND_WITHDRAW_REQUEST_FAILURE,
    error,
  };
}

export function fetchWithDrawalsStart(data) {
  return {
    type: FETCH_WITHDRAWALS_START,
    data,
  };
}

export function fetchWithDrawalsSuccess(data) {
  return {
    type: FETCH_WITHDRAWALS_SUCCESS,
    data,
  };
}

export function fetchWithDrawalsFailure(error) {
  return {
    type: FETCH_WITHDRAWALS_FAILURE,
    error,
  };
}

export function cancelWithDrawRequestStart(data) {
  return {
    type: CANCEL_WITHDRAW_REQUEST_START,
    data,
  };
}

export function cancelWithDrawRequestSuccess(data) {
  return {
    type: CANCEL_WITHDRAW_REQUEST_SUCCESS,
    data,
  };
}

export function cancelWithDrawRequestFailure(error) {
  return {
    type: CANCEL_WITHDRAW_REQUEST_FAILURE,
    error,
  };
}

export function sendWalletRechargeStart(data) {
  return {
    type: SEND_WALLET_RECHARGE_START,
    data,
  };
}

export function sendWalletRechargeSuccess(data) {
  return {
    type: SEND_WALLET_RECHARGE_SUCCESS,
    data,
  };
}

export function sendWalletRechargeFailure(error) {
  return {
    type: SEND_WALLET_RECHARGE_FAILURE,
    error,
  };
}

export function searchWithDrawalsStart(data) {
  return {
    type: SEARCH_WITHDRAWALS_START,
    data,
  };
}

export function searchWithDrawalsSuccess(data) {
  return {
    type: SEARCH_WITHDRAWALS_SUCCESS,
    data,
  };
}

export function searchWithDrawalsFailure(error) {
  return {
    type: SEARCH_WITHDRAWALS_FAILURE,
    error,
  };
}

export function fetchSingleWithDrawalsStart(data) {
  return {
    type: FETCH_SINGLE_WITHDRAWALS_START,
    data,
  };
}

export function fetchSingleWithDrawalsSuccess(data) {
  return {
    type: FETCH_SINGLE_WITHDRAWALS_SUCCESS,
    data,
  };
}

export function fetchSingleWithDrawalsFailure(error) {
  return {
    type: FETCH_SINGLE_WITHDRAWALS_FAILURE,
    error,
  };
}
