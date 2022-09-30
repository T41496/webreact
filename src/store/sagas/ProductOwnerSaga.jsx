import React, { Component } from "react";
import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";
import {
  DELETE_PRO_IMAGE_PRO_OWNER_START,
  FETCH_PRODUCTS_PRO_OWNER_START,
  FETCH_PRO_CATE_PRO_OWNER_START,
  FETCH_PRO_IMAGE_PRO_OWNER_START,
  FETCH_PRO_SUBCATE_PRO_OWNER_START,
  FETCH_SINGLE_PRO_OWNER_START,
  PRO_SEARCH_PRO_OWNER_START,
  SAVE_PRO_IMAGE_PRO_OWNER_START,
  SAVE_PRO_OWNER_START,
  SET_VISIBILITY_PRO_OWNER_START,
  UPDATE_AVAILABILITY_PRO_OWNER_START,
} from "../actions/ActionConstant";

import { createNotification } from "react-redux-notify";

import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../../components/helper/NotificationMessage";
import {
  deleteProImageProOwnerFailure,
  deleteProImageProOwnerSuccess,
  fetchProCateProOwnerFailure,
  fetchProCateProOwnerSuccess,
  fetchProductsProOwnerFailure,
  fetchProductsProOwnerSuccess,
  fetchProImageProOwnerFailure,
  fetchProImageProOwnerSuccess,
  fetchProSubCateProOwnerFailure,
  fetchProSubCateProOwnerSuccess,
  fetchSingleProOwnerFailure,
  fetchSingleProOwnerSuccess,
  proSearchProOwnerFailure,
  proSearchProOwnerSuccess,
  saveProImageProOwnerFailure,
  saveProImageProOwnerSuccess,
  saveProOwnerFailure,
  saveProOwnerSuccess,
  setVisibilityProOwnerFailure,
  setVisibilityProOwnerSuccess,
  updateAvailabiltyProOwnerFailure,
  updateAvailabiltyProOwnerSuccess,
} from "../actions/ProductOwnerAction";

function* saveProOwnerAPI() {
  try {
    const inputData = yield select(
      (state) => state.proOwner.saveProduct.inputData
    );
    const response = yield api.postMethod("user_products_save", inputData);
    if (response.data.success) {
      yield put(saveProOwnerSuccess(response.data.data));
    } else {
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
      yield put(saveProOwnerFailure(response.data.error));
    }
  } catch (error) {
    yield put(saveProOwnerFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* fetchSingleProProOwnerAPI() {
  try {
    const inputData = yield select(
      (state) => state.proOwner.singlePro.inputData
    );
    const response = yield api.postMethod("user_products_view", inputData);
    if (response.data.success) {
      yield put(fetchSingleProOwnerSuccess(response.data.data));
    } else {
      yield put(fetchSingleProOwnerFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchSingleProOwnerFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* setVisibleAPI() {
  try {
    const inputData = yield select(
      (state) => state.proOwner.setVisible.inputData
    );
    const response = yield api.postMethod(
      "user_products_set_visibility",
      inputData
    );
    if (response.data.success) {
      yield put(setVisibilityProOwnerSuccess(response.data.data));
    } else {
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
      yield put(setVisibilityProOwnerFailure(response.data.error));
    }
  } catch (error) {
    yield put(setVisibilityProOwnerFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* updateAvailabiltyAPI() {
  try {
    const inputData = yield select(
      (state) => state.proOwner.updateAva.inputData
    );
    const response = yield api.postMethod(
      "user_products_update_availability",
      inputData
    );
    if (response.data.success) {
      yield put(updateAvailabiltyProOwnerSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(updateAvailabiltyProOwnerFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(updateAvailabiltyProOwnerFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* fetchProductsAPI() {
  try {
    const response = yield api.postMethod("user_products");

    if (response.data.success) {
      yield put(fetchProductsProOwnerSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(fetchProductsProOwnerFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchProductsProOwnerFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* fetchProCategoryAPI() {
  try {
    const response = yield api.postMethod("product_categories");

    if (response.data.success) {
      yield put(fetchProCateProOwnerSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(fetchProCateProOwnerFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchProCateProOwnerFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* fetchProSubCategoryAPI() {
  try {
    const inputData = yield select(
      (state) => state.proOwner.proSubCategory.inputData
    );
    const response = yield api.postMethod("product_sub_categories", inputData);
    if (response.data.success) {
      yield put(fetchProSubCateProOwnerSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(fetchProSubCateProOwnerFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchProSubCateProOwnerFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* proSearchAPI() {
  try {
    const inputData = yield select(
      (state) => state.proOwner.proSearch.inputData
    );
    const response = yield api.postMethod("user_products_search", inputData);
    if (response.data.success) {
      yield put(proSearchProOwnerSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(proSearchProOwnerFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(proSearchProOwnerFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* fetchProImageAPI() {
  try {
    const inputData = yield select(
      (state) => state.proOwner.proImage.inputData
    );
    const response = yield api.postMethod("user_product_pictures", inputData);
    if (response.data.success) {
      yield put(fetchProImageProOwnerSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(fetchProImageProOwnerFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchProImageProOwnerFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* saveProImageAPI() {
  try {
    const inputData = yield select(
      (state) => state.proOwner.saveProImage.inputData
    );
    const response = yield api.postMethod(
      "user_product_pictures_save",
      inputData
    );
    if (response.data.success) {
      yield put(saveProImageProOwnerSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(saveProImageProOwnerFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(saveProImageProOwnerFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* delProImageAPI() {
  try {
    const inputData = yield select(
      (state) => state.proOwner.delProImage.inputData
    );
    const response = yield api.postMethod(
      "user_product_pictures_delete",
      inputData
    );
    if (response.data.success) {
      yield put(deleteProImageProOwnerSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(deleteProImageProOwnerFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(deleteProImageProOwnerFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

export default function* pageSaga() {
  yield all([yield takeLatest(SAVE_PRO_OWNER_START, saveProOwnerAPI)]);
  yield all([
    yield takeLatest(FETCH_SINGLE_PRO_OWNER_START, fetchSingleProProOwnerAPI),
  ]);
  yield all([yield takeLatest(SET_VISIBILITY_PRO_OWNER_START, setVisibleAPI)]);
  yield all([
    yield takeLatest(UPDATE_AVAILABILITY_PRO_OWNER_START, updateAvailabiltyAPI),
  ]);
  yield all([
    yield takeLatest(FETCH_PRODUCTS_PRO_OWNER_START, fetchProductsAPI),
  ]);
  yield all([
    yield takeLatest(FETCH_PRO_CATE_PRO_OWNER_START, fetchProCategoryAPI),
  ]);
  yield all([
    yield takeLatest(FETCH_PRO_SUBCATE_PRO_OWNER_START, fetchProSubCategoryAPI),
  ]);
  yield all([yield takeLatest(PRO_SEARCH_PRO_OWNER_START, proSearchAPI)]);
  yield all([
    yield takeLatest(FETCH_PRO_IMAGE_PRO_OWNER_START, fetchProImageAPI),
  ]);
  yield all([
    yield takeLatest(SAVE_PRO_IMAGE_PRO_OWNER_START, saveProImageAPI),
  ]);
  yield all([
    yield takeLatest(DELETE_PRO_IMAGE_PRO_OWNER_START, delProImageAPI),
  ]);
}
