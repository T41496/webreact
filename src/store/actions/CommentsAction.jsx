import {
  FETCH_COMMENTS_START,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAILURE,
  SAVE_COMMENT_START,
  SAVE_COMMENT_SUCCESS,
  SAVE_COMMENT_FAILURE,
  DELETE_COMMENT_START,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,
} from "./ActionConstant";

export function fetchCommentsStart(data) {
  return {
    type: FETCH_COMMENTS_START,
    data,
  };
}

export function fetchCommentsSuccess(data) {
  return {
    type: FETCH_COMMENTS_SUCCESS,
    data,
  };
}

export function fetchCommentsFailure(error) {
  return {
    type: FETCH_COMMENTS_FAILURE,
    error,
  };
}

export function saveCommentStart(data) {
  return {
    type: SAVE_COMMENT_START,
    data,
  };
}

export function saveCommentSuccess(data) {
  return {
    type: SAVE_COMMENT_SUCCESS,
    data,
  };
}

export function saveCommentFailure(error) {
  return {
    type: SAVE_COMMENT_FAILURE,
    error,
  };
}

export function deleteCommentStart(data) {
  return {
    type: DELETE_COMMENT_START,
    data,
  };
}

export function deleteCommentSuccess(data) {
  return {
    type: DELETE_COMMENT_SUCCESS,
    data,
  };
}

export function deleteCommentFailure(error) {
  return {
    type: DELETE_COMMENT_FAILURE,
    error,
  };
}
