import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";
import { createNotification } from "react-redux-notify";
import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../../components/helper/NotificationMessage";
import {
  fetchSingleUserPostsFailure,
  fetchSingleUserPostsSuccess,
  fetchSingleUserProfileFailure,
  fetchSingleUserProfileSuccess,
  searchUserPostSuccess,
  searchUserPostFailure,
} from "../actions/OtherUserAction";
import {
  FETCH_SINGLE_USER_POSTS_START,
  FETCH_SINGLE_USER_PROFILE_START,
  SEARCH_USER_POST_START,
} from "../actions/ActionConstant";

function* fetchOtherUserProfileAPI() {
  try {
    const inputData = yield select(
      (state) => state.otherUser.userDetails.inputData
    );
    if (inputData.user_unique_id == localStorage.getItem("user_unique_id")) {
      window.location.assign("/profile");
    }
    const response = yield api.postMethod("other_profile", inputData);
    if (response.data.success) {
      localStorage.setItem("user_wallet_remaining", response.data.data.user_wallet.remaining);
      yield put(fetchSingleUserProfileSuccess(response.data.data));
    } else {
      yield put(fetchSingleUserProfileFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
      window.location.assign("/home");
    }
  } catch (error) {
    yield put(fetchSingleUserProfileFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* fetchOtherUserPostAPI() {
  try {
    const inputData = yield select(
      (state) => state.otherUser.userPosts.inputData
    );
    const skipCount = yield select((state) => state.otherUser.userPosts.skip);
    const response = yield api.postMethod("other_profile_posts", {
      ...inputData,
      skip: skipCount,
    });
    if (response.data.success) {
      localStorage.setItem("user_wallet_remaining", response.data.data.user_wallet.remaining);
      yield put(fetchSingleUserPostsSuccess(response.data.data));
    } else {
      yield put(fetchSingleUserPostsFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchSingleUserPostsFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* searchPostAPI() {
  try {
    const inputData = yield select(
      (state) => state.otherUser.searchPosts.inputData
    );
    const response = yield api.postMethod("posts_search", inputData);
    if (response.data.success) {
      yield put(fetchSingleUserPostsSuccess(response.data.data));
    } else {
      yield put(searchUserPostFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(searchUserPostFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

export default function* pageSaga() {
  yield all([
    yield takeLatest(FETCH_SINGLE_USER_PROFILE_START, fetchOtherUserProfileAPI),
  ]);
  yield all([
    yield takeLatest(FETCH_SINGLE_USER_POSTS_START, fetchOtherUserPostAPI),
  ]);

  yield all([yield takeLatest(SEARCH_USER_POST_START, searchPostAPI)]);
}
