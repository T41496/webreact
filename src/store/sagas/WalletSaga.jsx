import { call, select, put, takeLatest, all } from "redux-saga/effects";

import api from "../../Environment";
import {
  FETCH_WALLET_DETAILS_START,
  ADD_MONEY_VIA_BANK_START,
  ADD_MONEY_VIA_CARD_START,
} from "../actions/ActionConstant";

import { createNotification } from "react-redux-notify";

import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../../components/helper/NotificationMessage";
import {
  fetchWalletDetailsSuccess,
  fetchWalletDetailsFailure,
  addMoneyViaCardSuccess,
  addMoneyViaCardFailure,
  addMoneyViaBankSuccess,
  addMoneyViaBankFailure,
} from "../actions/WalletAction";
import { checkLogoutStatus } from "../actions/ErrorAction";

function* fetchWalletDetailsAPI() {
  try {
    const response = yield api.postMethod("wallets_index");
    if (response.data.success) {
      yield put(fetchWalletDetailsSuccess(response.data.data));
      // Do nothing
    } else {
      yield put(checkLogoutStatus(response.data));
      yield put(fetchWalletDetailsFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchWalletDetailsFailure(error));
    const notificationMessage = getErrorNotificationMessage(
      error.response.data.error
    );
    yield put(createNotification(notificationMessage));
  }
}

function* addMoneyViaCardAPI() {
  try {
    const inputData = yield select((state) => state.wallet.addMoneyInput.data);
    const response = yield api.postMethod(
      "wallets_add_money_by_stripe",
      inputData
    );
    if (response.data.success) {
      yield put(addMoneyViaCardSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      window.location.assign("/wallet");
    } else {
      yield put(addMoneyViaCardFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(addMoneyViaCardFailure(error));
    const notificationMessage = getErrorNotificationMessage(
      error.response.data.error
    );
    yield put(createNotification(notificationMessage));
  }
}

function* addMoneyViaBankAPI() {
  try {
    const inputData = yield select((state) => state.wallet.addMoneyInput.data);
    const response = yield api.postMethod(
      "wallets_add_money_by_bank_account",
      inputData
    );
    if (response.data.success) {
      yield put(addMoneyViaBankSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      window.location.assign("/wallet");
    } else {
      yield put(addMoneyViaBankFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(addMoneyViaBankFailure(error));
    const notificationMessage = getErrorNotificationMessage(
      error.response.data.error
    );
    yield put(createNotification(notificationMessage));
  }
}

export default function* pageSaga() {
  yield all([
    yield takeLatest(FETCH_WALLET_DETAILS_START, fetchWalletDetailsAPI),
    yield takeLatest(ADD_MONEY_VIA_BANK_START, addMoneyViaBankAPI),
    yield takeLatest(ADD_MONEY_VIA_CARD_START, addMoneyViaCardAPI),
  ]);
}
