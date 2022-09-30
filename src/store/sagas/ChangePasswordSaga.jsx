import { call, select, put, takeLatest, all } from "redux-saga/effects";
import {
  changePasswordSuccess,
  changePasswordFailure,
} from "../actions/UserAction";
import api from "../../Environment";
import { CHANGE_PASSWORD_START } from "../actions/ActionConstant";
import { createNotification } from "react-redux-notify";
import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../../components/helper/NotificationMessage";

function* changePasswordAPI() {
  try {
    const inputData = yield select(
      (state) => state.changePassword.inputData.data
    );
    const response = yield api.postMethod("change_password", inputData);
    yield put(changePasswordSuccess(response.data.data));
    if (response.data.success) {
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(changePasswordFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

export default function* pageSaga() {
  yield all([yield takeLatest(CHANGE_PASSWORD_START, changePasswordAPI)]);
}
