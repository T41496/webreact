import {
  FETCH_ALL_TRANSACTION_START,
  FETCH_ALL_TRANSACTION_SUCCESS,
  FETCH_ALL_TRANSACTION_FAILURE,
  FETCH_SENT_PAYMENT_TRANSACTION_START,
  FETCH_SENT_PAYMENT_TRANSACTION_SUCCESS,
  FETCH_SENT_PAYMENT_TRANSACTION_FAILURE,
  FETCH_RECEIVED_PAYMENT_TRANSACTION_START,
  FETCH_RECEIVED_PAYMENT_TRANSACTION_SUCCESS,
  FETCH_RECEIVED_PAYMENT_TRANSACTION_FAILURE,
  FETCH_DEPOSIT_TRANSACTION_START,
  FETCH_DEPOSIT_TRANSACTION_SUCCESS,
  FETCH_DEPOSIT_TRANSACTION_FAILURE,
} from "./ActionConstant";

// Get all transaction actions.

export function fetchAllTransactionStart(data) {
  return {
    type: FETCH_ALL_TRANSACTION_START,
    data,
  };
}

export function fetchAllTransactionSuccess(data) {
  return {
    type: FETCH_ALL_TRANSACTION_SUCCESS,
    data,
  };
}

export function fetchAllTransactionFailure(error) {
  return {
    type: FETCH_ALL_TRANSACTION_FAILURE,
    error,
  };
}

// Get sent payment transaction actions.

export function fetchSentPaymentTransactionStart(data) {
  return {
    type: FETCH_SENT_PAYMENT_TRANSACTION_START,
    data,
  };
}

export function fetchSentPaymentTransactionSuccess(data) {
  return {
    type: FETCH_SENT_PAYMENT_TRANSACTION_SUCCESS,
    data,
  };
}

export function fetchSentPaymentTransactionFailure(error) {
  return {
    type: FETCH_SENT_PAYMENT_TRANSACTION_FAILURE,
    error,
  };
}

// Get received payment transaction actions.

export function fetchReceivedPaymentTransactionStart(data) {
  return {
    type: FETCH_RECEIVED_PAYMENT_TRANSACTION_START,
    data,
  };
}

export function fetchReceivedPaymentTransactionSuccess(data) {
  return {
    type: FETCH_RECEIVED_PAYMENT_TRANSACTION_SUCCESS,
    data,
  };
}

export function fetchReceivedPaymentTransactionFailure(error) {
  return {
    type: FETCH_RECEIVED_PAYMENT_TRANSACTION_FAILURE,
    error,
  };
}

// Get deposit transaction actions.

export function fetchDepositTransactionStart(data) {
  return {
    type: FETCH_DEPOSIT_TRANSACTION_START,
    data,
  };
}

export function fetchDepositTransactionSuccess(data) {
  return {
    type: FETCH_DEPOSIT_TRANSACTION_SUCCESS,
    data,
  };
}

export function fetchDepositTransactionFailure(error) {
  return {
    type: FETCH_DEPOSIT_TRANSACTION_FAILURE,
    error,
  };
}
