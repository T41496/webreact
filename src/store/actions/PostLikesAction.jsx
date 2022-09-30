import {
  SAVE_POST_LIKE_START,
  SAVE_POST_LIKE_SUCCESS,
  SAVE_POST_LIKE_FAILURE,
  FETCH_POST_LIKED_START,
  FETCH_POST_LIKED_SUCCESS,
  FETCH_POST_LIKED_FAILURE,
} from "./ActionConstant";

export function savePostLikeStart(data) {
  return {
    type: SAVE_POST_LIKE_START,
    data,
  };
}

export function savePostLikeSuccess(data) {
  return {
    type: SAVE_POST_LIKE_SUCCESS,
    data,
  };
}

export function savePostLikeFailure(error) {
  return {
    type: SAVE_POST_LIKE_FAILURE,
    error,
  };
}
export function fetchPostLikedStart(data) {
  return {
    type: FETCH_POST_LIKED_START,
    data,
  };
}

export function fetchPostLikedSuccess(data) {
  return {
    type: FETCH_POST_LIKED_SUCCESS,
    data,
  };
}

export function fetchPostLikedFailure(error) {
  return {
    type: FETCH_POST_LIKED_FAILURE,
    error,
  };
}
