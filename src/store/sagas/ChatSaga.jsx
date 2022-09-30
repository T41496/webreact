import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";
import { createNotification } from "react-redux-notify";
import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../../components/helper/NotificationMessage";
import {
  fetchChatMessageFailure,
  fetchChatMessageStart,
  fetchChatMessageSuccess,
  fetchChatUsersFailure,
  fetchChatUsersSuccess,
  saveChatUserFailure,
  saveChatUserStart,
  saveChatUserSuccess,
} from "../actions/ChatAction";
import {
  FETCH_CHAT_MESSAGE_START,
  FETCH_CHAT_USERS_START,
  SAVE_CHAT_USERS_START,
} from "../actions/ActionConstant";

function* fetchChatUserAPI() {
  try {
    const response = yield api.postMethod("chat_users");
    if (response.data.success) {
      yield put(fetchChatUsersSuccess(response.data.data));
      if (response.data.data.users.length > 0)
        yield put(
          fetchChatMessageStart({
            to_user_id: response.data.data.users[0].to_user_id,
            from_user_id: response.data.data.users[0].from_user_id,
          })
        );
    } else {
      yield put(fetchChatUsersFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchChatUsersFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* fetchChatMessageAPI() {
  try {
    const inputData = yield select((state) => state.chat.messages.inputData);
    const response = yield api.postMethod("chat_messages", inputData);
    if (response.data.success) {
      localStorage.setItem("user_wallet_remaining", response.data.data.user_wallet.remaining);
      yield put(fetchChatMessageSuccess(response.data.data));
    } else {
      yield put(fetchChatMessageFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchChatMessageFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}
function* saveChatUserAPI() {
  try {
    const inputData = yield select(
      (state) => state.chat.saveChatUser.inputData
    );
    const response = yield api.postMethod("chat_users_save", inputData);
    if (response.data.success) {
      yield put(saveChatUserSuccess(response.data.data));
      window.location.assign("/inbox");

    } else {
      yield put(saveChatUserFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(saveChatUserFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

export default function* pageSaga() {
  yield all([yield takeLatest(FETCH_CHAT_USERS_START, fetchChatUserAPI)]);
  yield all([yield takeLatest(FETCH_CHAT_MESSAGE_START, fetchChatMessageAPI)]);
  yield all([yield takeLatest(SAVE_CHAT_USERS_START, saveChatUserAPI)]);
}
