import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";

import { createNotification } from "react-redux-notify";
import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../../components/helper/NotificationMessage";
import {
  saveVeriDocFailure,
  saveVeriDocSuccess,
  fetchVeriDocumentsSuccess,
  fetchVeriDocumentsFailure,
  delVeriDocSuccess,
  delVeriDocFailure,
  verificationStatusCheckSuccess,
  verificationStatusCheckFailure,
} from "../actions/VerificationDocumentAction";
import {
  DEL_VERI_DOC_START,
  FETCH_VERI_DOCUMENT_START,
  SAVE_VERI_DOC_START,
  VERI_STATUS_CHECK_START,
} from "../actions/ActionConstant";

function* fetchVeriDocsAPI() {
  try {
    const response = yield api.postMethod("documents_list");
    if (response.data.success) {
      yield put(fetchVeriDocumentsSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(fetchVeriDocumentsFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchVeriDocumentsFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* saveVeriDocsAPI() {
  try {
    const inputData = yield select((state) => state.docs.saveDocs.inputData);
    const response = yield api.postMethod("documents_save", inputData);
    if (response.data.success) {
      yield put(saveVeriDocSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(saveVeriDocFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(saveVeriDocFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* delVeriDocsAPI() {
  try {
    const inputData = yield select((state) => state.docs.delDocs.inputData);
    const response = yield api.postMethod("documents_delete", inputData);
    if (response.data.success) {
      yield put(delVeriDocSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(delVeriDocFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(delVeriDocFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* checkVeriDocStatusAPI() {
  try {
    const inputData = yield select((state) => state.docs.docStatus.inputData);
    const response = yield api.postMethod("user_documents_status", inputData);
    if (response.data.success) {
      yield put(verificationStatusCheckSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(verificationStatusCheckFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(verificationStatusCheckFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

export default function* pageSaga() {
  yield all([yield takeLatest(FETCH_VERI_DOCUMENT_START, fetchVeriDocsAPI)]);
  yield all([yield takeLatest(SAVE_VERI_DOC_START, saveVeriDocsAPI)]);
  yield all([yield takeLatest(DEL_VERI_DOC_START, delVeriDocsAPI)]);
  yield all([yield takeLatest(VERI_STATUS_CHECK_START, checkVeriDocStatusAPI)]);
}
