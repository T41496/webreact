import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";
import {
  ADD_BANK_ACCOUNT_START,
  GET_BANK_ACCOUNT_START,
  MAKE_DEFAULT_BANK_ACCOUNT_START,
  DELETE_BANK_ACCOUNT_START,
  FETCH_SINGLE_BANK_ACCOUNT_START,
} from "../actions/ActionConstant";
import { createNotification } from "react-redux-notify";
import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../../components/helper/NotificationMessage";
import {
  addBankAccountSuccess,
  addBankAccountFailure,
  getBankAccountSuccess,
  getBankAccountFailure,
  getBankAccountStart,
  makeDefaultBankAccountSuccess,
  makeDefaultBankAccountFailure,
  deleteBankAccountSuccess,
  deleteBankAccountFailure,
  fetchSingleBankAccountSuccess,
  fetchSingleBankAccountFailure,
} from "../actions/BankAccountAction";

function* addBankAccountAPI() {
  try {
    const inputData = yield select(
      (state) => state.bankAccount.addBankAccountInput.inputData
    );
    const response = yield api.postMethod("billing_accounts_save", inputData);

    if (response.data.success) {
      yield put(addBankAccountSuccess(response.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      window.location.assign("/billing-accounts");
    } else {
      yield put(addBankAccountFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(addBankAccountFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* getBankAccountAPI() {
  try {
    const response = yield api.postMethod("billing_accounts_list");

    if (response.data.success) {
      yield put(getBankAccountSuccess(response.data.data));
    } else {
      yield put(getBankAccountFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(getBankAccountFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* makeDefaultBankAccountAPI() {
  try {
    const inputData = yield select(
      (state) => state.bankAccount.makeDefault.inputData
    );
    const response = yield api.postMethod(
      "billing_accounts_default",
      inputData
    );

    if (response.data.success) {
      yield put(makeDefaultBankAccountSuccess(response.data));
      yield put(getBankAccountStart());
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(makeDefaultBankAccountFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(makeDefaultBankAccountFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* deleteAccountBankAccountAPI() {
  try {
    const inputData = yield select(
      (state) => state.bankAccount.deleteAccount.inputData
    );
    const response = yield api.postMethod("billing_accounts_delete", inputData);

    if (response.data.success) {
      yield put(deleteBankAccountSuccess(response.data));

      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      window.location.assign("/billing-accounts");
    } else {
      yield put(deleteBankAccountFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(deleteBankAccountFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* fetchSingleBankAccountAPI() {
  try {
    const inputData = yield select(
      (state) => state.bankAccount.singleAccount.inputData
    );
    const response = yield api.postMethod("users_accounts_save", inputData);

    if (response.data.success) {
      yield put(fetchSingleBankAccountSuccess(response.data));
      yield put(getBankAccountStart());
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(fetchSingleBankAccountFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchSingleBankAccountFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

export default function* pageSaga() {
  yield all([yield takeLatest(ADD_BANK_ACCOUNT_START, addBankAccountAPI)]);
  yield all([yield takeLatest(GET_BANK_ACCOUNT_START, getBankAccountAPI)]);
  yield all([
    yield takeLatest(
      MAKE_DEFAULT_BANK_ACCOUNT_START,
      makeDefaultBankAccountAPI
    ),
  ]);
  yield all([
    yield takeLatest(DELETE_BANK_ACCOUNT_START, deleteAccountBankAccountAPI),
  ]);
  yield all([
    yield takeLatest(
      FETCH_SINGLE_BANK_ACCOUNT_START,
      fetchSingleBankAccountAPI
    ),
  ]);
}
