import {
  FOLLOW_USER_START,
  FOLLOW_USER_SUCCESS,
  FOLLOW_USER_FAILURE,
  UNFOLLOW_USER_START,
  UNFOLLOW_USER_SUCCESS,
  UNFOLLOW_USER_FAILURE,
  FETCH_FOLLOWERS_START,
  FETCH_FOLLOWERS_SUCCESS,
  FETCH_FOLLOWERS_FAILURE,
  FETCH_ACTIVE_FOLLOWERS_START,
  FETCH_ACTIVE_FOLLOWERS_SUCCESS,
  FETCH_ACTIVE_FOLLOWERS_FAILURE,
  FETCH_EXPIRED_FOLLOWERS_START,
  FETCH_EXPIRED_FOLLOWERS_SUCCESS,
  FETCH_EXPIRED_FOLLOWERS_FAILURE,
  FETCH_FOLLOWING_START,
  FETCH_FOLLOWING_SUCCESS,
  FETCH_FOLLOWING_FAILURE,
  FETCH_ACTIVE_FOLLOWING_START,
  FETCH_ACTIVE_FOLLOWING_SUCCESS,
  FETCH_ACTIVE_FOLLOWING_FAILURE,
  FETCH_EXPIRED_FOLLOWING_START,
  FETCH_EXPIRED_FOLLOWING_SUCCESS,
  FETCH_EXPIRED_FOLLOWING_FAILURE,
} from "./ActionConstant";

export function followUserStart(data) {
  return {
    type: FOLLOW_USER_START,
    data,
  };
}

export function followUserSuccess(data) {
  return {
    type: FOLLOW_USER_SUCCESS,
    data,
  };
}

export function followUserFailure(error) {
  return {
    type: FOLLOW_USER_FAILURE,
    error,
  };
}

export function unFollowUserStart(data) {
  return {
    type: UNFOLLOW_USER_START,
    data,
  };
}

export function unFollowUserSuccess(data) {
  return {
    type: UNFOLLOW_USER_SUCCESS,
    data,
  };
}

export function unFollowUserFailure(error) {
  return {
    type: UNFOLLOW_USER_FAILURE,
    error,
  };
}

export function fetchFollowersStart(data) {
  return {
    type: FETCH_FOLLOWERS_START,
    data,
  };
}

export function fetchFollowersSuccess(data) {
  return {
    type: FETCH_FOLLOWERS_SUCCESS,
    data,
  };
}

export function fetchFollowersFailure(error) {
  return {
    type: FETCH_FOLLOWERS_FAILURE,
    error,
  };
}
export function fetchActiveFollowersStart(data) {
  return {
    type: FETCH_ACTIVE_FOLLOWERS_START,
    data,
  };
}

export function fetchActiveFollowersSuccess(data) {
  return {
    type: FETCH_ACTIVE_FOLLOWERS_SUCCESS,
    data,
  };
}

export function fetchActiveFollowersFailure(error) {
  return {
    type: FETCH_ACTIVE_FOLLOWERS_FAILURE,
    error,
  };
}

export function fetchExpiredFollowersStart(data) {
  return {
    type: FETCH_EXPIRED_FOLLOWERS_START,
    data,
  };
}

export function fetchExpiredFollowersSuccess(data) {
  return {
    type: FETCH_EXPIRED_FOLLOWERS_SUCCESS,
    data,
  };
}

export function fetchExpiredFollowersFailure(error) {
  return {
    type: FETCH_EXPIRED_FOLLOWERS_FAILURE,
    error,
  };
}

export function fetchFollowingStart(data) {
  return {
    type: FETCH_FOLLOWING_START,
    data,
  };
}

export function fetchFollowingSuccess(data) {
  return {
    type: FETCH_FOLLOWING_SUCCESS,
    data,
  };
}

export function fetchFollowingFailure(error) {
  return {
    type: FETCH_FOLLOWING_FAILURE,
    error,
  };
}

export function fetchActiveFollowingStart(data) {
  return {
    type: FETCH_ACTIVE_FOLLOWING_START,
    data,
  };
}

export function fetchActiveFollowingSuccess(data) {
  return {
    type: FETCH_ACTIVE_FOLLOWING_SUCCESS,
    data,
  };
}

export function fetchActiveFollowingFailure(error) {
  return {
    type: FETCH_ACTIVE_FOLLOWING_FAILURE,
    error,
  };
}

export function fetchExpiredFollowingStart(data) {
  return {
    type: FETCH_EXPIRED_FOLLOWING_START,
    data,
  };
}

export function fetchExpiredFollowingSuccess(data) {
  return {
    type: FETCH_EXPIRED_FOLLOWING_SUCCESS,
    data,
  };
}

export function fetchExpiredFollowingFailure(error) {
  return {
    type: FETCH_EXPIRED_FOLLOWING_FAILURE,
    error,
  };
}
