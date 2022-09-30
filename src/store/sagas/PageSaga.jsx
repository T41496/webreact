import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";
import { FETCH_SINGLE_PAGE_START } from "../actions/ActionConstant";
import { createNotification } from "react-redux-notify";
import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../../components/helper/NotificationMessage";
import {
  fetchSinglePageSuccess,
  fetchSinglePageFailure,
} from "../actions/PageAction";

function* fetchSinglePage() {
  try {
    const inputData = yield select((state) => state.page.pageData.inputData);
    const response = yield api.postMethod("static_pages", inputData);
    if (response.data.success) {
      yield put(fetchSinglePageSuccess(response.data.data));
    } else {
      yield put(fetchSinglePageFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchSinglePageFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

export default function* pageSaga() {
  yield all([yield takeLatest(FETCH_SINGLE_PAGE_START, fetchSinglePage)]);
}
