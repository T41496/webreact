import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";
import { FETCH_NOTIFICATIONS_START } from "../actions/ActionConstant";
import { createNotification } from "react-redux-notify";
import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../../components/helper/NotificationMessage";

import {
  fetchNotificationsFailure,
  fetchNotificationsSuccess,
} from "../actions/NotificationAction";

function* fetchNotificationAPI() {
  try {
    const inputData = yield select(
      (state) => state.notification.notification.inputData
    );
    const response = yield api.postMethod(
      "bell_notifications_index",
      inputData
    );
    if (response.data.success) {
      yield put(fetchNotificationsSuccess(response.data.data));
    } else {
      yield put(fetchNotificationsFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchNotificationsFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

export default function* pageSaga() {
  yield all([
    yield takeLatest(FETCH_NOTIFICATIONS_START, fetchNotificationAPI),
  ]);
}
