import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";
import {
  FETCH_FOLLOWERS_START,
  FETCH_ACTIVE_FOLLOWERS_START,
  FETCH_EXPIRED_FOLLOWERS_START,
  FETCH_FOLLOWING_START,
  FOLLOW_USER_START,
  UNFOLLOW_USER_START,
  FETCH_ACTIVE_FOLLOWING_START,
  FETCH_EXPIRED_FOLLOWING_START,
} from "../actions/ActionConstant";
import { createNotification } from "react-redux-notify";
import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../../components/helper/NotificationMessage";
import {
  fetchFollowersFailure,
  fetchFollowersSuccess,
  fetchActiveFollowersFailure,
  fetchActiveFollowersSuccess,
  fetchExpiredFollowersFailure,
  fetchExpiredFollowersSuccess,
  fetchFollowingFailure,
  fetchFollowingSuccess,
  followUserFailure,
  followUserSuccess,
  unFollowUserFailure,
  unFollowUserSuccess,
  fetchActiveFollowingSuccess,
  fetchActiveFollowingFailure,
  fetchExpiredFollowingSuccess,
  fetchExpiredFollowingFailure,
} from "../actions/FollowAction";

function* followUserAPI() {
  try {
    const inputData = yield select(
      (state) => state.follow.followUser.inputData
    );
    const response = yield api.postMethod("follow_users", inputData);
    if (response.data.success) {
      yield put(followUserSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      localStorage.setItem(
        "total_followers",
        JSON.stringify(response.data.data.total_followers)
      );
      localStorage.setItem(
        "total_followings",
        JSON.stringify(response.data.data.total_followings)
      );
    } else {
      yield put(followUserFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(followUserFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* unFollowUserAPI() {
  try {
    const inputData = yield select(
      (state) => state.follow.unFollowUser.inputData
    );
    const response = yield api.postMethod("unfollow_users", inputData);
    if (response.data.success) {
      yield put(unFollowUserSuccess(response.data.data));
      const notificationMessage = getErrorNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      localStorage.setItem(
        "total_followers",
        JSON.stringify(response.data.data.total_followers)
      );
      localStorage.setItem(
        "total_followings",
        JSON.stringify(response.data.data.total_followings)
      );
      window.location.reload();
    } else {
      yield put(unFollowUserFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(unFollowUserFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* fetchFollowersAPI() {
  try {
    const response = yield api.postMethod("followers");
    if (response.data.success) {
      yield put(fetchFollowersSuccess(response.data.data));
    } else {
      yield put(fetchFollowersFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchFollowersFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* fetchActiveFollowersAPI() {
  try {
    const response = yield api.postMethod("active_followers");
    if (response.data.success) {
      yield put(fetchActiveFollowersSuccess(response.data.data));
    } else {
      yield put(fetchActiveFollowersFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchActiveFollowersFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* fetchExpiredFollowersAPI() {
  try {
    const response = yield api.postMethod("expired_followers");
    if (response.data.success) {
      yield put(fetchExpiredFollowersSuccess(response.data.data));
    } else {
      yield put(fetchExpiredFollowersFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchExpiredFollowersFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* fetchFollowingAPI() {
  try {
    const response = yield api.postMethod("followings");
    if (response.data.success) {
      yield put(fetchFollowingSuccess(response.data.data));
    } else {
      yield put(fetchFollowingFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchFollowingFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* fetchActiveFollowingAPI() {
  try {
    const response = yield api.postMethod("active_followings");
    if (response.data.success) {
      yield put(fetchActiveFollowingSuccess(response.data.data));
    } else {
      yield put(fetchActiveFollowingFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchActiveFollowingFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* fetchExpiredFollowingAPI() {
  try {
    const response = yield api.postMethod("expired_followings");
    if (response.data.success) {
      yield put(fetchExpiredFollowingSuccess(response.data.data));
    } else {
      yield put(fetchExpiredFollowingFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchExpiredFollowingFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

export default function* pageSaga() {
  yield all([yield takeLatest(FOLLOW_USER_START, followUserAPI)]);
  yield all([yield takeLatest(UNFOLLOW_USER_START, unFollowUserAPI)]);
  yield all([yield takeLatest(FETCH_FOLLOWERS_START, fetchFollowersAPI)]);
  yield all([
    yield takeLatest(FETCH_ACTIVE_FOLLOWERS_START, fetchActiveFollowersAPI),
  ]);
  yield all([
    yield takeLatest(FETCH_EXPIRED_FOLLOWERS_START, fetchExpiredFollowersAPI),
  ]);
  yield all([yield takeLatest(FETCH_FOLLOWING_START, fetchFollowingAPI)]);
  yield all([
    yield takeLatest(FETCH_ACTIVE_FOLLOWING_START, fetchActiveFollowingAPI),
  ]);
  yield all([
    yield takeLatest(FETCH_EXPIRED_FOLLOWING_START, fetchExpiredFollowingAPI),
  ]);
}
