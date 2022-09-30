import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";
import { createNotification } from "react-redux-notify";
import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../../components/helper/NotificationMessage";

import {
  deleteBookmarkFailure,
  deleteBookmarkSuccess,
  fetchBookmarksFailure,
  fetchBookmarksPhotoFailure,
  fetchBookmarksPhotoSuccess,
  fetchBookmarksSuccess,
  fetchBookmarksVideoFailure,
  fetchBookmarksVideoSuccess,
  saveBookmarkFailure,
  saveBookmarkSuccess,
} from "../actions/BookmarkAction";
import {
  DELETE_BOOKMARK_START,
  FETCH_BOOKMARKS_PHOTO_START,
  FETCH_BOOKMARKS_START,
  FETCH_BOOKMARKS_VIDEO_START,
  SAVE_BOOKMARK_START,
} from "../actions/ActionConstant";

function* fetchBookmarkAPI() {
  try {
    const inputData = yield select(
      (state) => state.bookmark.bookmark.inputData
    );
    const response = yield api.postMethod("post_bookmarks", inputData);
    if (response.data.success) {
      yield put(fetchBookmarksSuccess(response.data.data));
    } else {
      yield put(fetchBookmarksFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchBookmarksFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* fetchBookmarkPhotoAPI() {
  try {
    const inputData = yield select(
      (state) => state.bookmark.bookmarkPhoto.inputData
    );
    const response = yield api.postMethod("post_bookmarks_photos", inputData);
    if (response.data.success) {
      yield put(fetchBookmarksPhotoSuccess(response.data.data));
    } else {
      yield put(fetchBookmarksPhotoFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchBookmarksPhotoFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* fetchBookmarkVideoAPI() {
  try {
    const inputData = yield select(
      (state) => state.bookmark.bookmarkVideo.inputData
    );
    const response = yield api.postMethod("post_bookmarks_videos", inputData);
    if (response.data.success) {
      yield put(fetchBookmarksVideoSuccess(response.data.data));
    } else {
      yield put(fetchBookmarksVideoFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchBookmarksVideoFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* saveBookmarkAPI() {
  try {
    const inputData = yield select(
      (state) => state.bookmark.saveBookmark.inputData
    );
    const response = yield api.postMethod("post_bookmarks_save", inputData);
    if (response.data.success) {
      yield put(saveBookmarkSuccess(response.data.data));
      if(response.data.code == 143) {
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
      yield put(saveBookmarkFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(saveBookmarkFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* deleteBookmarkAPI() {
  try {
    const inputData = yield select((state) => state.docs.delDocs.inputData);
    const response = yield api.postMethod("post_bookmarks_delete", inputData);
    if (response.data.success) {
      yield put(deleteBookmarkSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(deleteBookmarkFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(deleteBookmarkFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

export default function* pageSaga() {
  yield all([yield takeLatest(FETCH_BOOKMARKS_START, fetchBookmarkAPI)]);
  yield all([
    yield takeLatest(FETCH_BOOKMARKS_PHOTO_START, fetchBookmarkPhotoAPI),
  ]);
  yield all([
    yield takeLatest(FETCH_BOOKMARKS_VIDEO_START, fetchBookmarkVideoAPI),
  ]);
  yield all([yield takeLatest(SAVE_BOOKMARK_START, saveBookmarkAPI)]);
  yield all([yield takeLatest(DELETE_BOOKMARK_START, deleteBookmarkAPI)]);
}
