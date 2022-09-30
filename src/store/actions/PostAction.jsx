import {
  SAVE_POST_START,
  SAVE_POST_SUCCESS,
  SAVE_POST_FAILURE,
  FETCH_POSTS_START,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
  FETCH_SINGLE_POST_START,
  FETCH_SINGLE_POST_SUCCESS,
  FETCH_SINGLE_POST_FAILURE,
  DELETE_POST_START,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
  CHANGE_POST_STATUS_START,
  CHANGE_POST_STATUS_SUCCESS,
  CHANGE_POST_STATUS_FAILURE,
  POST_FILE_UPLOAD_START,
  POST_FILE_UPLOAD_SUCCESS,
  POST_FILE_UPLOAD_FAILURE,
  PPV_PAYMENT_STRIPE_START,
  PPV_PAYMENT_STRIPE_SUCCESS,
  PPV_PAYMENT_STRIPE_FAILURE,
  PPV_PAYMENT_WALLET_START,
  PPV_PAYMENT_WALLET_SUCCESS,
  PPV_PAYMENT_WALLET_FAILURE,
  SAVE_REPORT_POST_START,
  SAVE_REPORT_POST_SUCCESS,
  SAVE_REPORT_POST_FAILURE,
  FETCH_REPORT_POSTS_START,
  FETCH_REPORT_POSTS_SUCCESS,
  FETCH_REPORT_POSTS_FAILURE,
  PPV_PAYMENT_PAYPAL_START,
  PPV_PAYMENT_PAYPAL_SUCCESS,
  PPV_PAYMENT_PAYPAL_FAILURE,
  POST_FILE_REMOVE_START,
  POST_FILE_REMOVE_SUCCESS,
  POST_FILE_REMOVE_FAILURE,
  SAVE_LIVESTREAM_START,
  SAVE_LIVESTREAM_SUCCESS,
  SAVE_LIVESTREAM_FAILURE,
  FETCH_SINGLE_STREAM_START,
  FETCH_SINGLE_STREAM_SUCCESS,
  FETCH_SINGLE_STREAM_FAILURE,
  FETCH_LIST_STREAM_START,
  FETCH_LIST_STREAM_SUCCESS,
  FETCH_LIST_STREAM_FAILURE,
  SAVE_LIVESTREAM_USERS_START,
  SAVE_LIVESTREAM_USERS_SUCCESS,
  SAVE_LIVESTREAM_USERS_FAILURE,
  LEAVE_LIVESTREAM_USER_START,
  LEAVE_LIVESTREAM_USER_SUCCESS,
  LEAVE_LIVESTREAM_USER_FAILURE,
  FETCH_SINGLE_CALL_START,
  FETCH_SINGLE_CALL_SUCCESS,
  FETCH_SINGLE_CALL_FAILURE,
  SAVE_SINGLE_CALL_START,
  SAVE_SINGLE_CALL_SUCCESS,
  SAVE_SINGLE_CALL_FAILURE,
  LEAVE_CALL_USER_START,
  LEAVE_CALL_USER_SUCCESS,
  LEAVE_CALL_USER_FAILURE,
  FETCH_LIST_VIDEO_START,
  FETCH_LIST_VIDEO_SUCCESS,
  FETCH_LIST_VIDEO_FAILURE,
  UPDATE_VIDEO_START,
  UPDATE_VIDEO_SUCCESS,
  UPDATE_VIDEO_FAILURE,
  STREAM_PAYMENT_START,
  STREAM_PAYMENT_FAILURE,
  STREAM_PAYMENT_SUCCESS,
} from "./ActionConstant";

export function savePostStart(data) {
  return {
    type: SAVE_POST_START,
    data,
  };
}

export function savePostSuccess(data) {
  return {
    type: SAVE_POST_SUCCESS,
    data,
  };
}

export function savePostFailure(error) {
  return {
    type: SAVE_POST_FAILURE,
    error,
  };
}
export function fetchPostsStart(data) {
  return {
    type: FETCH_POSTS_START,
    data,
  };
}

export function fetchPostsSuccess(data) {
  return {
    type: FETCH_POSTS_SUCCESS,
    data,
  };
}

export function fetchPostsFailure(error) {
  return {
    type: FETCH_POSTS_FAILURE,
    error,
  };
}

export function fetchSinglePostStart(data) {
  return {
    type: FETCH_SINGLE_POST_START,
    data,
  };
}

export function fetchSinglePostSuccess(data) {
  return {
    type: FETCH_SINGLE_POST_SUCCESS,
    data,
  };
}

export function fetchSinglePostFailure(error) {
  return {
    type: FETCH_SINGLE_POST_FAILURE,
    error,
  };
}

export function deletePostStart(data) {
  return {
    type: DELETE_POST_START,
    data,
  };
}

export function deletePostSuccess(data) {
  return {
    type: DELETE_POST_SUCCESS,
    data,
  };
}

export function deletePostFailure(error) {
  return {
    type: DELETE_POST_FAILURE,
    error,
  };
}

export function changePostStatusStart(data) {
  return {
    type: CHANGE_POST_STATUS_START,
    data,
  };
}

export function changePostStatusSuccess(data) {
  return {
    type: CHANGE_POST_STATUS_SUCCESS,
    data,
  };
}

export function changePostStatusFailure(error) {
  return {
    type: CHANGE_POST_STATUS_FAILURE,
    error,
  };
}

export function postFileUploadStart(data) {
  return {
    type: POST_FILE_UPLOAD_START,
    data,
  };
}

export function postFileUploadSuccess(data) {
  return {
    type: POST_FILE_UPLOAD_SUCCESS,
    data,
  };
}

export function postFileUploadFailure(error) {
  return {
    type: POST_FILE_UPLOAD_FAILURE,
    error,
  };
}

export function PPVPaymentStripeStart(data) {
  return {
    type: PPV_PAYMENT_STRIPE_START,
    data,
  };
}

export function PPVPaymentStripeSuccess(data) {
  return {
    type: PPV_PAYMENT_STRIPE_SUCCESS,
    data,
  };
}

export function PPVPaymentStripeFailure(error) {
  return {
    type: PPV_PAYMENT_STRIPE_FAILURE,
    error,
  };
}

// Subscription Payment wallet actions.

export function PPVPaymentWalletStart(data) {
  return {
    type: PPV_PAYMENT_WALLET_START,
    data,
  };
}

export function PPVPaymentWalletSuccess(data) {
  return {
    type: PPV_PAYMENT_WALLET_SUCCESS,
    data,
  };
}

export function PPVPaymentWalletFailure(error) {
  return {
    type: PPV_PAYMENT_WALLET_FAILURE,
    error,
  };
}

export function saveReportPostStart(data) {
  return {
    type: SAVE_REPORT_POST_START,
    data,
  };
}

export function saveReportPostSuccess(data) {
  return {
    type: SAVE_REPORT_POST_SUCCESS,
    data,
  };
}

export function saveReportPostFailure(error) {
  return {
    type: SAVE_REPORT_POST_FAILURE,
    error,
  };
}

export function fetchReportPostsStart(data) {
  return {
    type: FETCH_REPORT_POSTS_START,
    data,
  };
}

export function fetchReportPostsSuccess(data) {
  return {
    type: FETCH_REPORT_POSTS_SUCCESS,
    data,
  };
}

export function fetchReportPostsFailure(error) {
  return {
    type: FETCH_REPORT_POSTS_FAILURE,
    error,
  };
}

export function PPVPaymentPaypalStart(data) {
  return {
    type: PPV_PAYMENT_PAYPAL_START,
    data,
  };
}

export function PPVPaymentPaypalSuccess(data) {
  return {
    type: PPV_PAYMENT_PAYPAL_SUCCESS,
    data,
  };
}

export function PPVPaymentPaypalFailure(error) {
  return {
    type: PPV_PAYMENT_PAYPAL_FAILURE,
    error,
  };
}

export function postFileRemoveStart(data) {
  return {
    type: POST_FILE_REMOVE_START,
    data,
  };
}

export function postFileRemoveSuccess(data) {
  return {
    type: POST_FILE_REMOVE_SUCCESS,
    data,
  };
}

export function postFileRemoveFailure(error) {
  return {
    type: POST_FILE_REMOVE_FAILURE,
    error,
  };
}

export function saveLiveStreamStart(data) {
  return {
    type: SAVE_LIVESTREAM_START,
    data,
  };
}

export function saveLiveStreamSuccess(data) {
  return {
    type: SAVE_LIVESTREAM_SUCCESS,
    data,
  };
}

export function saveLiveStreamFailure(error) {
  return {
    type: SAVE_LIVESTREAM_FAILURE,
    error,
  };
}

export function fetchSingleStreamStart(data) {
  return {
    type: FETCH_SINGLE_STREAM_START,
    data,
  };
}

export function fetchSingleStreamFailure(error) {
  return {
    type: FETCH_SINGLE_STREAM_FAILURE,
    error,
  };
}

export function fetchSingleStreamSuccess(data) {
  return {
    type: FETCH_SINGLE_STREAM_SUCCESS,
    data,
  };
}

export function fetchStreamListsDetailsStart(data) {
  return {
    type: FETCH_LIST_STREAM_START,
    data,
  };
}

export function fetchStreamListsDetailsFailure(error) {
  return {
    type: FETCH_LIST_STREAM_FAILURE,
    error,
  };
}

export function fetchStreamListsDetailsSuccess(data) {
  return {
    type: FETCH_LIST_STREAM_SUCCESS,
    data,
  };
}

export function saveLiveStreamUsersStart(data) {
  return {
    type: SAVE_LIVESTREAM_USERS_START,
    data,
  };
}

export function saveLiveStreamUsersSuccess(data) {
  return {
    type: SAVE_LIVESTREAM_USERS_SUCCESS,
    data,
  };
}

export function saveLiveStreamUsersFailure(error) {
  return {
    type: SAVE_LIVESTREAM_USERS_FAILURE,
    error,
  };
}

export function leaveLiveStreamUserStart(data) {
  return {
    type: LEAVE_LIVESTREAM_USER_START,
    data,
  };
}

export function leaveLiveStreamUserSuccess(data) {
  return {
    type: LEAVE_LIVESTREAM_USER_SUCCESS,
    data,
  };
}

export function leaveLiveStreamUserFailure(error) {
  return {
    type: LEAVE_LIVESTREAM_USER_FAILURE,
    error,
  };
}

export function fetchSingleCallStart(data) {
  return {
    type: FETCH_SINGLE_CALL_START,
    data,
  };
}

export function fetchSingleCallFailure(error) {
  return {
    type: FETCH_SINGLE_CALL_FAILURE,
    error,
  };
}

export function saveSingleCallSuccess(data) {
  return {
    type: SAVE_SINGLE_CALL_SUCCESS,
    data,
  };
}

export function saveSingleCallStart(data) {
  return {
    type: SAVE_SINGLE_CALL_START,
    data,
  };
}

export function saveSingleCallFailure(error) {
  return {
    type: SAVE_SINGLE_CALL_FAILURE,
    error,
  };
}

export function fetchSingleCallSuccess(data) {
  return {
    type: FETCH_SINGLE_CALL_SUCCESS,
    data,
  };
}

export function leaveCallUserStart(data) {
  return {
    type: LEAVE_CALL_USER_START,
    data,
  };
}

export function leaveCallUserSuccess(data) {
  return {
    type: LEAVE_CALL_USER_SUCCESS,
    data,
  };
}

export function leaveCallUserFailure(error) {
  return {
    type: LEAVE_CALL_USER_FAILURE,
    error,
  };
}

export function fetchVideoListsDetailsStart(data) {
  return {
    type: FETCH_LIST_VIDEO_START,
    data,
  };
}

export function fetchVideoListsDetailsFailure(error) {
  return {
    type: FETCH_LIST_VIDEO_FAILURE,
    error,
  };
}

export function fetchVideoListsDetailsSuccess(data) {
  return {
    type: FETCH_LIST_VIDEO_SUCCESS,
    data,
  };
}

export function updateSingleCallStart(data) {
  return {
    type: UPDATE_VIDEO_START,
    data,
  };
}

export function updateSingleCallFailure(error) {
  return {
    type: UPDATE_VIDEO_FAILURE,
    error,
  };
}

export function updateSingleCallSuccess(data) {
  return {
    type: UPDATE_VIDEO_SUCCESS,
    data,
  };
}

export function streamPaymentStart(data) {
  return {
    type: STREAM_PAYMENT_START,
    data,
  };
}

export function streamPaymentFailure(error) {
  return {
    type: STREAM_PAYMENT_FAILURE,
    error,
  };
}

export function streamPaymentSuccess(data) {
  return {
    type: STREAM_PAYMENT_SUCCESS,
    data,
  };
}