import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";
import {
  FETCH_POST_LIKED_START,
  SAVE_POST_LIKE_START,
} from "../actions/ActionConstant";
import { createNotification } from "react-redux-notify";
import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../../components/helper/NotificationMessage";
import {
  fetchPostLikedFailure,
  fetchPostLikedSuccess,
  savePostLikeFailure,
  savePostLikeSuccess,
} from "../actions/PostLikesAction";

function* savePostLikesAPI() {
  try {
    const inputData = yield select(
      (state) => state.postLike.saveLike.inputData
    );
    const response = yield api.postMethod("post_likes_save", inputData);
    if (response.data.success) {
      yield put(savePostLikeSuccess(response.data.data));
      if(response.data.code == 149) {
        const notificationMessage = getSuccessNotificationMessage(
          response.data.message
        );
        yield put(createNotification(notificationMessage));
      } else {
        const notificationMessage = getErrorNotificationMessage(
          response.data.message
        );
        yield put(createNotification(notificationMessage));
      }
    } else {
      yield put(savePostLikeFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(savePostLikeFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* fetchPostLikesAPI() {
  try {
    const inputData = yield select(
      (state) => state.postLike.saveLike.inputData
    );
    const response = yield api.postMethod("post_likes", inputData);
    if (response.data.success) {
      yield put(fetchPostLikedSuccess(response.data.data));
    } else {
      yield put(fetchPostLikedFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchPostLikedFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

export default function* pageSaga() {
  yield all([yield takeLatest(SAVE_POST_LIKE_START, savePostLikesAPI)]);
  yield all([yield takeLatest(FETCH_POST_LIKED_START, fetchPostLikesAPI)]);
}
