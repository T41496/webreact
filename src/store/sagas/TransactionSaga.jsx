import { call, select, put, takeLatest, all } from "redux-saga/effects";

import api from "../../Environment";
import {
  FETCH_ALL_TRANSACTION_START,
  FETCH_SENT_PAYMENT_TRANSACTION_START,
  FETCH_RECEIVED_PAYMENT_TRANSACTION_START,
  FETCH_DEPOSIT_TRANSACTION_START,
} from "../actions/ActionConstant";

import { createNotification } from "react-redux-notify";

import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../../components/helper/NotificationMessage";
import {
  fetchAllTransactionSuccess,
  fetchAllTransactionFailure,
  fetchSentPaymentTransactionSuccess,
  fetchSentPaymentTransactionFailure,
  fetchReceivedPaymentTransactionSuccess,
  fetchReceivedPaymentTransactionFailure,
  fetchDepositTransactionSuccess,
  fetchDepositTransactionFailure,
} from "../actions/TransactionAction";
import { checkLogoutStatus } from "../actions/ErrorAction";

function* fetchAllTransactionAPI() {
  try {
    const response = yield api.postMethod("wallets_history");
    if (response.data.success) {
      yield put(fetchAllTransactionSuccess(response.data.data));
      // Do nothing
    } else {
      yield put(checkLogoutStatus(response.data));
      yield put(fetchAllTransactionFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchAllTransactionFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* fetchSentPaymentTransAPI() {
  try {
    const response = yield api.postMethod("wallets_history_for_sent");
    if (response.data.success) {
      yield put(fetchSentPaymentTransactionSuccess(response.data.data));
      // Do nothing
    } else {
      yield put(checkLogoutStatus(response.data));
      yield put(fetchSentPaymentTransactionFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchSentPaymentTransactionFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* fetchReceivedPayTransAPI() {
  try {
    const response = yield api.postMethod("wallets_history_for_received");
    if (response.data.success) {
      yield put(fetchReceivedPaymentTransactionSuccess(response.data.data));
      // Do nothing
    } else {
      yield put(checkLogoutStatus(response.data));
      yield put(fetchReceivedPaymentTransactionFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchReceivedPaymentTransactionFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* fetchDepositTransactionAPI() {
  try {
    const response = yield api.postMethod("wallets_history_for_add");
    if (response.data.success) {
      yield put(fetchDepositTransactionSuccess(response.data.data));
      // Do nothing
    } else {
      yield put(checkLogoutStatus(response.data));
      yield put(fetchDepositTransactionFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchDepositTransactionFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

export default function* pageSaga() {
  yield all([
    yield takeLatest(FETCH_ALL_TRANSACTION_START, fetchAllTransactionAPI),
    yield takeLatest(
      FETCH_SENT_PAYMENT_TRANSACTION_START,
      fetchSentPaymentTransAPI
    ),
    yield takeLatest(
      FETCH_RECEIVED_PAYMENT_TRANSACTION_START,
      fetchReceivedPayTransAPI
    ),
    yield takeLatest(
      FETCH_DEPOSIT_TRANSACTION_START,
      fetchDepositTransactionAPI
    ),
  ]);
}
