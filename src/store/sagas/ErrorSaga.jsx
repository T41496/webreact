import { call, select, put, takeLatest, all } from "redux-saga/effects";
import { ERROR_LOGOUT_CHECK } from "../actions/ActionConstant";
import { createNotification } from "react-redux-notify";
import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../../components/helper/NotificationMessage";

const erroCode = [1000, 1001, 1002, 1003, 1004, 1005, 1006, 1007];

function* logoutStatusCheck() {
  try {
    const inputData = yield select((state) => state.errorDetails.error);
    console.log("Error Check statrted", inputData);
    if (erroCode.indexOf(inputData.error_code) !== -1) {
      console.log("Error Check true");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("userLoginStatus");
      localStorage.removeItem("user_picture");
      localStorage.removeItem("username");
      const notificationMessage = getErrorNotificationMessage(inputData.error);
      yield put(createNotification(notificationMessage));
      window.location.assign("/");
    } else {
      console.log("Error Check false");
      //   const notificationMessage = getErrorNotificationMessage(
      //     response.data.error
      //   );
      //   yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    console.log("Error Check false", error);
    // const notificationMessage = getErrorNotificationMessage(error.message);
    // yield put(createNotification(notificationMessage));
  }
}

export default function* pageSaga() {
  yield all([yield takeLatest(ERROR_LOGOUT_CHECK, logoutStatusCheck)]);
}
