import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";
import {
  FETCH_WITHDRAWALS_START,
  SEND_WITHDRAW_REQUEST_START,
  CANCEL_WITHDRAW_REQUEST_START,
  FETCH_SINGLE_WITHDRAWALS_START,
  SEND_WALLET_RECHARGE_START,
  SEARCH_WITHDRAWALS_START,
} from "../actions/ActionConstant";

import { createNotification } from "react-redux-notify";
import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../../components/helper/NotificationMessage";

import {
  fetchWithDrawalsSuccess,
  fetchWithDrawalsFailure,
  sendWithDrawRequestSuccess,
  sendWithDrawRequestFailure,
  cancelWithDrawRequestSuccess,
  cancelWithDrawRequestFailure,
  fetchSingleWithDrawalsSuccess,
  fetchSingleWithDrawalsFailure,
  searchWithDrawalsSuccess,
  searchWithDrawalsFailure,
  sendWalletRechargeSuccess,
  sendWalletRechargeFailure,
  fetchWithDrawalsStart,
} from "../actions/WithDrawAction";
import { fetchWalletDetailsStart } from "../actions/WalletAction";

function* fetchWithDrawAPI() {
  try {
    const response = yield api.postMethod("withdrawals_index");

    if (response.data.success) {
      yield put(fetchWithDrawalsSuccess(response.data.data));
    } else {
      yield put(fetchWithDrawalsFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchWithDrawalsFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* sendWithDrawRequestAPI() {
  try {
    const inputData = yield select(
      (state) => state.withDraw.sendWithDraw.inputData
    );
    const response = yield api.postMethod(
      "withdrawals_send_request",
      inputData
    );

    if (response.data.success) {
      yield put(sendWithDrawRequestSuccess(response.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      yield put(fetchWithDrawalsStart());
      yield put(fetchWalletDetailsStart());
    } else {
      yield put(sendWithDrawRequestFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(sendWithDrawRequestFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* cancelWithDrawRequestAPI() {
  try {
    const inputData = yield select(
      (state) => state.withDraw.cancelWithDraw.inputData
    );
    const response = yield api.postMethod(
      "withdrawals_cancel_request",
      inputData
    );

    if (response.data.success) {
      yield put(cancelWithDrawRequestSuccess(response.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      yield put(fetchWithDrawalsStart());
    } else {
      yield put(cancelWithDrawRequestFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(cancelWithDrawRequestFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* fetchSingleWithDrawAPI() {
  try {
    const inputData = yield select(
      (state) => state.withDraw.singleWithDraw.inputData
    );
    const response = yield api.postMethod("withdrawals_view", inputData);

    if (response.data.success) {
      yield put(fetchSingleWithDrawalsSuccess(response.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(fetchSingleWithDrawalsFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchSingleWithDrawalsFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* sendWalletRechargeAPI() {
  try {
    const inputData = yield select(
      (state) => state.withDraw.sendWalletRecharge.inputData
    );
    const response = yield api.postMethod("wallet_recharge_by_stripe", inputData);

    if (response.data.success) {
      yield put(sendWalletRechargeSuccess(response.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      setTimeout(function(){window.location.reload()},3000);
    } else {
      yield put(sendWalletRechargeFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
      setTimeout(function(){window.location.reload()},3000);
    }
  } catch (error) {
    yield put(sendWalletRechargeFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* searchWithDrawAPI() {
  try {
    const inputData = yield select(
      (state) => state.withDraw.searchWithDraw.inputData
    );
    const response = yield api.postMethod("withdrawals_search", inputData);

    if (response.data.success) {
      yield put(searchWithDrawalsSuccess(response.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(searchWithDrawalsFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(searchWithDrawalsFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

export default function* pageSaga() {
  yield all([yield takeLatest(FETCH_WITHDRAWALS_START, fetchWithDrawAPI)]);
  yield all([
    yield takeLatest(SEND_WITHDRAW_REQUEST_START, sendWithDrawRequestAPI),
  ]);
  yield all([
    yield takeLatest(CANCEL_WITHDRAW_REQUEST_START, cancelWithDrawRequestAPI),
  ]);
  yield all([
    yield takeLatest(FETCH_SINGLE_WITHDRAWALS_START, fetchSingleWithDrawAPI),
  ]);
  yield all([yield takeLatest(SEND_WALLET_RECHARGE_START, sendWalletRechargeAPI)]);
  yield all([yield takeLatest(SEARCH_WITHDRAWALS_START, searchWithDrawAPI)]);
}
