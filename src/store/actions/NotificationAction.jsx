import {
  FETCH_NOTIFICATIONS_START,
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_NOTIFICATIONS_FAILURE,
} from "./ActionConstant";

export function fetchNotificationsStart(data) {
  return {
    type: FETCH_NOTIFICATIONS_START,
    data,
  };
}

export function fetchNotificationsSuccess(data) {
  return {
    type: FETCH_NOTIFICATIONS_SUCCESS,
    data,
  };
}

export function fetchNotificationsFailure(error) {
  return {
    type: FETCH_NOTIFICATIONS_FAILURE,
    error,
  };
}
