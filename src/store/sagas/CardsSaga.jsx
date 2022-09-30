import React, { Component } from "react";
import { call, select, put, takeLatest, all } from "redux-saga/effects";
import {
  fetchCardDetailsSuccess,
  fetchCardDetailsFailure,
  deleteCardSuccess,
  deleteCardFailure,
  selectDefaultCardSuccess,
  selectDefaultCardFailure,
  fetchCardDetailsStart,
} from "../actions/CardsAction";

import api from "../../Environment";
import {
  FETCH_CARD_DETAILS_START,
  DELETE_CARD_START,
  SELECT_DEFAULT_CARD_START,
} from "../actions/ActionConstant";

import { createNotification } from "react-redux-notify";

import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../../components/helper/NotificationMessage";

function* getCardDetailsAPI() {
  try {
    const response = yield api.postMethod("cards_list");

    if (response.data.success) {
      yield put(fetchCardDetailsSuccess(response.data.data));
    } else {
      yield put(fetchCardDetailsFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchCardDetailsFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* deleteCardAPI() {
  try {
    const deleteCard = yield select((state) => state.cards.deleteCard.data);
    const response = yield api.postMethod("cards_delete", deleteCard);
    yield put(deleteCardSuccess(response.data.data));
    if (response.data.success) {
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      yield put(fetchCardDetailsStart());
    } else {
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(deleteCardFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* selectDefaultCardAPI() {
  try {
    const selectDefaultCard = yield select(
      (state) => state.cards.selectDefaultCard.inputData
    );
    const response = yield api.postMethod("cards_default", selectDefaultCard);
    yield put(selectDefaultCardSuccess(response.data.data));
    if (response.data.success) {
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      yield put(fetchCardDetailsStart());
    } else {
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(selectDefaultCardFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

export default function* pageSaga() {
  yield all([yield takeLatest(FETCH_CARD_DETAILS_START, getCardDetailsAPI)]);
  yield all([yield takeLatest(DELETE_CARD_START, deleteCardAPI)]);
  yield all([
    yield takeLatest(SELECT_DEFAULT_CARD_START, selectDefaultCardAPI),
  ]);
}
