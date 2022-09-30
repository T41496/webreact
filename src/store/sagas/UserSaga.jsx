import React, { Component } from "react";
import { call, select, put, takeLatest, all } from "redux-saga/effects";
import {
  fetchUserDetailsSuccess,
  fetchUserDetailsFailure,
  updateUserDetailsSuccess,
  userLoginSuccess,
  userLoginFailure,
  userRegisterSuccess,
  userRegisterFailure,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  deleteAccountSuccess,
  deleteAccountFailure,
  updateUserDetailsFailure,
  registerVerifyFailure,
  registerVerifyResendFailure,
  registerVerifySuccess,
  registerVerifyResendSuccess,
  notificationStatusUpdateSuccess,
  notificationStatusUpdateFailure,
  fetchPaymentsSuccess,
  fetchPaymentsFailure,
  saveBlockUserSuccess,
  saveBlockUserFailure,
  fetchBlockUsersSuccess,
  fetchBlockUsersFailure,
  resetPasswordFailure,
  resetPasswordSuccess,
  usernameValidationSuccess,
  usernameValidationFailure,
  usernameValidationEmpty,
  userLogoutStart,
  fetchStripeConnectStart,
  fetchStripeConnectSuccess,
  fetchStripeConnectFailed,
} from "../actions/UserAction";

import api from "../../Environment";
import {
  FETCH_USER_DETAILS_START,
  UPDATE_USER_DETAILS_START,
  LOGIN_START,
  REGISTER_START,
  FORGOT_PASSWORD_START,
  DELETE_ACCOUNT_START,
  REGISTER_VERIFY_START,
  REGISTER_VERIFY_RESEND_START,
  NOTIFICATION_STATUS_UPDATE_START,
  FETCH_PAYMENTS_START,
  FETCH_BLOCK_USERS_START,
  SAVE_BLOCK_USER_START,
  USER_VERIFY_BADGE_STATUS_START,
  RESET_PASSWORD_START,
  USERNAME_VALIDATION_START,
  USERNAME_VALIDATION_EMPTY,
  LOGOUT_START,
  FETCH_STRIPE_CONNECT_START
} from "../actions/ActionConstant";

import { createNotification } from "react-redux-notify";

import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../../components/helper/NotificationMessage";
import { checkLogoutStatus } from "../actions/ErrorAction";
import { t } from "react-multi-lang";

function* getUserDetailsAPI() {
  try {
    const response = yield api.postMethod("profile");
    console.log("asdfasdf", response.data)

    if (response.data.success) {
      yield put(fetchUserDetailsSuccess(response.data));
      localStorage.setItem("user_picture", response.data.data.picture);
      localStorage.setItem("user_unique_id", response.data.data.user_unique_id);
      localStorage.setItem("user_cover", response.data.data.cover);
      localStorage.setItem("username", response.data.data.username);
      localStorage.setItem("userAddress", response.data.data.address);
      localStorage.setItem("name", response.data.data.name);
      localStorage.setItem("status", response.data.data.status);
      localStorage.setItem("notification_count", (response.data.data.bell_notification)?response.data.data.bell_notification:'0');
      localStorage.setItem(
        "total_followers",
        response.data.data.total_followers
      );
      localStorage.setItem(
        "total_followings",
        response.data.data.total_followings
      );
      localStorage.setItem(
        "is_subscription_enabled",
        response.data.data.is_subscription_enabled
      );
      localStorage.setItem("is_face", response.data.data.is_face);

      localStorage.setItem(
        "is_document_verified",
        response.data.data.is_document_verified
      );
      localStorage.setItem(
        "is_verified_badge",
        response.data.data.is_verified_badge
          ? response.data.data.is_verified_badge
          : 0
      );
    } else {
      yield put(fetchUserDetailsFailure(response.data.error));
      yield put(checkLogoutStatus(response.data));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchUserDetailsFailure(error));
    const notificationMessage = getErrorNotificationMessage(
      error.response.data.error
    );
    yield put(createNotification(notificationMessage));
  }
}

function* updateUserDetailsAPI() {
  try {
    const userData = yield select((state) => state.users.profileInputData.data);
    // console.log(userData);
    const response = yield api.postMethod("update_profile", userData);
    if (response.data.success) {
      yield put(updateUserDetailsSuccess(response.data));
      localStorage.setItem("user_picture", response.data.data.picture);
      localStorage.setItem("user_unique_id", response.data.data.user_unique_id);
      localStorage.setItem("user_cover", response.data.data.cover);
      localStorage.setItem("name", response.data.data.name);
      localStorage.setItem("username", response.data.data.username);
      localStorage.setItem("user_unique_id", response.data.data.user_unique_id);
      localStorage.setItem("status", response.data.data.status);
      localStorage.setItem("is_face", response.data.data.is_face);

      localStorage.setItem(
        "is_document_verified",
        response.data.data.is_document_verified
      );
      localStorage.setItem(
        "is_verified_badge",
        response.data.data.is_verified_badge
          ? response.data.data.is_verified_badge
          : 0
      );
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      window.location.assign("/profile");
    } else {
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
      yield put(updateUserDetailsFailure(response.data.error));
    }
  } catch (error) {
    yield put(updateUserDetailsFailure(error));
    const notificationMessage = getErrorNotificationMessage(
      error.response.data.error
    );
    yield put(createNotification(notificationMessage));
  }
}

function* userLoginAPI() {
  try {
    const userData = yield select((state) => state.users.loginInputData.data);

    const response = yield api.postMethod("login", userData);
    yield put(userLoginSuccess(response.data));
    if (response.data.success) {
      // if (response.data.code == 1001)
      //   window.location.assign("/register/verify");
      // else {
        localStorage.setItem("userLoginStatus", true);
        localStorage.setItem("user_picture", response.data.data.picture);
        localStorage.setItem("user_cover", response.data.data.cover);
        localStorage.setItem("name", response.data.data.name);
        localStorage.setItem("username", response.data.data.username);
        localStorage.setItem("login_by", response.data.data.login_by);
        localStorage.setItem("status", response.data.data.status);
        localStorage.setItem("userAddress", response.data.data.address);
        localStorage.setItem("socket", true);
        localStorage.setItem("is_face", response.data.data.is_face);

        localStorage.setItem(
          "user_unique_id",
          response.data.data.user_unique_id
        );
        localStorage.setItem(
          "is_document_verified",
          response.data.data.is_document_verified
        );
        localStorage.setItem(
          "is_verified_badge",
          response.data.data.is_verified_badge
            ? response.data.data.is_verified_badge
            : 0
        );
        const notificationMessage = getSuccessNotificationMessage(
          response.data.message
        );
        yield put(createNotification(notificationMessage));
        window.location.assign("/home");
      // }
      localStorage.setItem("userId", response.data.data.user_id);
      localStorage.setItem("accessToken", response.data.data.token);
    } else {
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(userLoginFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* userRegisterAPI() {
  try {
    const userData = yield select(
      (state) => state.users.registerInputData.data
    );
    const response = yield api.postMethod("register", userData);
    yield put(userRegisterSuccess(response.data));

    if (response.data.success) {
      // if (response.data.code == 1001)
      //   window.location.assign("/register/verify");
      // else {
        localStorage.setItem("userLoginStatus", true);
        localStorage.setItem("user_picture", response.data.data.picture);
        localStorage.setItem("user_cover", response.data.data.cover);
        localStorage.setItem("username", response.data.data.username);
        localStorage.setItem("name", response.data.data.name);
        localStorage.setItem("login_by", response.data.data.login_by);
        localStorage.setItem("status", response.data.data.status);
        localStorage.setItem("socket", true);
        localStorage.setItem("is_face", response.data.data.is_face);

        localStorage.setItem(
          "user_unique_id",
          response.data.data.user_unique_id
        );
        localStorage.setItem(
          "is_document_verified",
          response.data.data.is_document_verified
        );
        localStorage.setItem(
          "is_verified_badge",
          response.data.data.is_verified_badge
            ? response.data.data.is_verified_badge
            : 0
        );
        const notificationMessage = getSuccessNotificationMessage(
          response.data.message
        );
        yield put(createNotification(notificationMessage));
        if (response.data.data.is_welcome_steps == 1) {
          window.location.assign("/upload-profile-picture");
        } else {
          window.location.assign("/home");
        }
      // }
      localStorage.setItem("userId", response.data.data.user_id);
      localStorage.setItem("accessToken", response.data.data.token);
    } else {
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(userRegisterFailure(error));
    const notificationMessage = getErrorNotificationMessage(
      error.response.data.error
    );
    yield put(createNotification(notificationMessage));
  }
}

function* forgotPasswordAPI() {
  try {
    const userData = yield select(
      (state) => state.users.forgotPasswordInputData.data
    );

    if (
      !userData.email ||
      userData.email == undefined ||
      userData.email == null
    ) {
      const notificationMessage = getErrorNotificationMessage(
        "Please enter the email address"
      );
      yield put(createNotification(notificationMessage));
    } else {
      const response = yield api.postMethod("forgot_password", userData);
      yield put(forgotPasswordSuccess(response.data));
      if (response.data.success) {
        const notificationMessage = getSuccessNotificationMessage(
          response.data.message
        );
        yield put(createNotification(notificationMessage));
        window.location.assign("/");
      } else {
        const notificationMessage = getErrorNotificationMessage(
          response.data.error
        );
        yield put(createNotification(notificationMessage));
      }
    }
  } catch (error) {
    yield put(forgotPasswordFailure(error));
    const notificationMessage = getErrorNotificationMessage(
      error.response.data.error
    );
    yield put(createNotification(notificationMessage));
  }
}

function* deleteAccountAPI() {
  try {
    const userData = yield select(
      (state) => state.users.deleteAccount.inputData
    );
    const response = yield api.postMethod("delete_account", userData);
    yield put(deleteAccountSuccess(response.data));
    if (response.data.success) {
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      window.location.assign("/");
    } else {
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(deleteAccountFailure(error));
    const notificationMessage = getErrorNotificationMessage(
      error.response.data.error
    );
    yield put(createNotification(notificationMessage));
  }
}

function* registerVerify() {
  try {
    const inputData = yield select(
      (state) => state.users.registerVerify.inputData
    );

    const response = yield api.postMethod("verify_email", inputData);

    if (response.data.success) {
      yield put(registerVerifySuccess(response.data));
      localStorage.setItem("userId", response.data.data.user_id);
      localStorage.setItem("user_unique_id", response.data.data.user_unique_id);
      localStorage.setItem("accessToken", response.data.data.token);
      localStorage.setItem("userLoginStatus", true);
      localStorage.setItem("user_picture", response.data.data.picture);
      localStorage.setItem("username", response.data.data.first_name);
      localStorage.setItem("status", response.data.data.status);
      localStorage.setItem(
        "is_verified_badge",
        response.data.data.is_verified_badge
          ? response.data.data.is_verified_badge
          : 0
      );
      localStorage.setItem("socket", true);
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      window.location.assign("/welcome");
    } else {
      yield put(registerVerifyFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(registerVerifyFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* registerVerifyResend() {
  try {
    const response = yield api.postMethod("regenerate_email_verification_code");

    if (response.data.success) {
      yield put(registerVerifyResendSuccess(response.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(registerVerifyResendFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(registerVerifyResendFailure(error));
    const notificationMessage = getErrorNotificationMessage(
      error.response.data.error
    );
    yield put(createNotification(notificationMessage));
  }
}

function* notificationStatusUpdateAPI() {
  try {
    const userData = yield select(
      (state) => state.users.notificationUpdate.inputData
    );
    const response = yield api.postMethod(
      "notifications_status_update",
      userData
    );
    if (response.data.success) {
      yield put(notificationStatusUpdateSuccess(response.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
      yield put(notificationStatusUpdateFailure(response.data.error));
    }
  } catch (error) {
    yield put(notificationStatusUpdateFailure(error));
    const notificationMessage = getErrorNotificationMessage(
      error.response.data.error
    );
    yield put(createNotification(notificationMessage));
  }
}

function* verificationBadgeStatusUpdateAPI() {
  try {
    const userData = yield select(
      (state) => state.users.verifyBadgeUpdate.inputData
    );
    const response = yield api.postMethod("verified_badge_status", userData);
    if (response.data.success) {
      yield put(notificationStatusUpdateSuccess(response.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      localStorage.setItem(
        "is_verified_badge",
        response.data.data.is_verified_badge
          ? response.data.data.is_verified_badge
          : 0
      );
      yield put(createNotification(notificationMessage));
    } else {
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
      yield put(notificationStatusUpdateFailure(response.data.error));
    }
  } catch (error) {
    yield put(notificationStatusUpdateFailure(error));
    const notificationMessage = getErrorNotificationMessage(
      error.response.data.error
    );
    yield put(createNotification(notificationMessage));
  }
}

function* getPaymentsAPI() {
  try {
    const response = yield api.postMethod("payments_index");

    if (response.data.success) {
      yield put(fetchPaymentsSuccess(response.data));
    } else {
      yield put(fetchPaymentsFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchPaymentsFailure(error));
    const notificationMessage = getErrorNotificationMessage(
      error.response.data.error
    );
    yield put(createNotification(notificationMessage));
  }
}

function* fetchBlockUsersAPI() {
  try {
    const response = yield api.postMethod("block_users");
    if (response.data.success) {
      yield put(fetchBlockUsersSuccess(response.data.data));
    } else {
      yield put(fetchBlockUsersFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchBlockUsersFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* saveBlockUserAPI() {
  try {
    const inputData = yield select(
      (state) => state.users.saveBlockUser.inputData
    );
    const response = yield api.postMethod("block_users_save", inputData);
    if (response.data.success) {
      yield put(saveBlockUserSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));

      localStorage.setItem(
        "total_followers",
        response.data.data.total_followers
      );
      localStorage.setItem(
        "total_followings",
        response.data.data.total_followings
      );

      if (inputData.is_other_profile == 1) {
        window.location.reload();
      }
    } else {
      yield put(saveBlockUserFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(saveBlockUserFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* resetPasswordAPI() {
  try {
    const inputData = yield select(
      (state) => state.users.resetPasswordInputData.inputData
    );
    const response = yield api.postMethod("reset_password", inputData);
    yield put(resetPasswordSuccess(response.data));
    if (response.data.success) {
      localStorage.setItem("userLoginStatus", true);
      localStorage.setItem("user_picture", response.data.data.picture);
      localStorage.setItem("user_cover", response.data.data.cover);
      localStorage.setItem("name", response.data.data.name);
      localStorage.setItem("username", response.data.data.username);
      localStorage.setItem("socket", true);
      localStorage.setItem("user_unique_id", response.data.data.user_unique_id);
      localStorage.setItem("status", response.data.data.status);
      localStorage.setItem("is_face", response.data.data.is_face);

      localStorage.setItem(
        "is_document_verified",
        response.data.data.is_document_verified
      );
      localStorage.setItem(
        "is_verified_badge",
        response.data.data.is_verified_badge
          ? response.data.data.is_verified_badge
          : 0
      );
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      localStorage.setItem("userId", response.data.data.user_id);
      localStorage.setItem("accessToken", response.data.data.token);
      yield put(createNotification(notificationMessage));
      window.location.assign("/home");
    } else {
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(resetPasswordFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* usernameValidationAPI() {
  try {
    const inputData = yield select(
      (state) => state.users.validationInputData.data
    );
    if(inputData.username.length > 3) {
      const response = yield api.postMethod("username_validation", inputData);
      yield put(usernameValidationSuccess(response.data));
      if (response.data.success) {
      } else {
        yield put(usernameValidationFailure(response));
        // const notificationMessage = getErrorNotificationMessage(
        //   response.data.error
        // );
        // yield put(createNotification(notificationMessage));
      }
    } else {
      yield put(usernameValidationEmpty(inputData));
    }
  } catch (error) {
    yield put(usernameValidationFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* userLogoutAPI() {
  try {
    const response = yield api.postMethod("logout");
    if(response.data.success) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("userLoginStatus");
      localStorage.removeItem("user_picture");
      localStorage.removeItem("username");
      localStorage.removeItem("socket");
      localStorage.removeItem("status");
      const notificationMessage = getSuccessNotificationMessage(t('logout_success'));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }

}

function* stripeConnectAPI() {
  try {
    const userData = yield select(
      (state) => state.users.stripeConnect.inputData
    );
    const response = yield api.postMethod("stripe_account", userData);
    yield put(fetchStripeConnectSuccess(response.data));
    if (response.data.success) {
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      window.location.assign("/stripe-connect");
    } else {
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchStripeConnectFailed(error));
    const notificationMessage = getErrorNotificationMessage(
      error.response.data.error
    );
    yield put(createNotification(notificationMessage));
  }
}

export default function* pageSaga() {
  yield all([
    yield takeLatest(FETCH_USER_DETAILS_START, getUserDetailsAPI),
    yield takeLatest(UPDATE_USER_DETAILS_START, updateUserDetailsAPI),
    yield takeLatest(LOGIN_START, userLoginAPI),
    yield takeLatest(REGISTER_START, userRegisterAPI),
    yield takeLatest(FORGOT_PASSWORD_START, forgotPasswordAPI),
    yield takeLatest(DELETE_ACCOUNT_START, deleteAccountAPI),
    yield takeLatest(REGISTER_VERIFY_START, registerVerify),
    yield takeLatest(REGISTER_VERIFY_RESEND_START, registerVerifyResend),
    yield takeLatest(
      NOTIFICATION_STATUS_UPDATE_START,
      notificationStatusUpdateAPI
    ),
    yield takeLatest(FETCH_PAYMENTS_START, getPaymentsAPI),
    yield takeLatest(FETCH_BLOCK_USERS_START, fetchBlockUsersAPI),
    yield takeLatest(SAVE_BLOCK_USER_START, saveBlockUserAPI),
    yield takeLatest(
      USER_VERIFY_BADGE_STATUS_START,
      verificationBadgeStatusUpdateAPI
    ),
    yield takeLatest(RESET_PASSWORD_START, resetPasswordAPI),
    yield takeLatest(USERNAME_VALIDATION_START, usernameValidationAPI),
    yield takeLatest(LOGOUT_START, userLogoutAPI),
    yield takeLatest(FETCH_STRIPE_CONNECT_START, stripeConnectAPI),
  ]);
}
