import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";
import {
  CHANGE_POST_STATUS_START,
  DELETE_POST_START,
  FETCH_POSTS_START,
  FETCH_SINGLE_POST_START,
  POST_FILE_UPLOAD_START,
  POST_FILE_REMOVE_START,
  SAVE_POST_START,
  PPV_PAYMENT_STRIPE_START,
  PPV_PAYMENT_WALLET_START,
  SAVE_REPORT_POST_START,
  FETCH_REPORT_POSTS_START,
  PPV_PAYMENT_PAYPAL_START,
  SAVE_LIVESTREAM_START,
  FETCH_SINGLE_STREAM_START,
  FETCH_LIST_STREAM_START,
  SAVE_LIVESTREAM_USERS_START,
  LEAVE_LIVESTREAM_USER_START,
  FETCH_SINGLE_CALL_START,
  SAVE_SINGLE_CALL_START,
  LEAVE_CALL_USER_START,
  FETCH_LIST_VIDEO_START,
  UPDATE_VIDEO_START,
  STREAM_PAYMENT_START,
} from "../actions/ActionConstant";
import { createNotification } from "react-redux-notify";
import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../../components/helper/NotificationMessage";
import {
  changePostStatusFailure,
  changePostStatusSuccess,
  deletePostFailure,
  deletePostSuccess,
  fetchPostsFailure,
  fetchPostsSuccess,
  fetchSinglePostFailure,
  fetchSinglePostSuccess,
  postFileUploadFailure,
  postFileUploadSuccess,
  savePostFailure,
  savePostSuccess,
  PPVPaymentStripeFailure,
  PPVPaymentStripeSuccess,
  PPVPaymentWalletSuccess,
  PPVPaymentWalletFailure,
  saveReportPostSuccess,
  saveReportPostFailure,
  fetchReportPostsSuccess,
  fetchReportPostsFailure,
  PPVPaymentPaypalFailure,
  PPVPaymentPaypalSuccess,
  postFileRemoveFailure,
  postFileRemoveSuccess,
  saveLiveStreamFailure,
  saveLiveStreamSuccess,
  fetchSingleStreamSuccess,
  fetchSingleStreamFailure,
  fetchStreamListsDetailsFailure,
  fetchStreamListsDetailsSuccess,
  saveLiveStreamUsersFailure,
  saveLiveStreamUsersSuccess,
  leaveLiveStreamUserSuccess,
  leaveLiveStreamUserFailure,
  fetchSingleCallSuccess,
  fetchSingleCallFailure,
  saveSingleCallSuccess,
  saveSingleCallFailure,
  leaveCallUserSuccess,
  leaveCallUserFailure,
  fetchVideoListsDetailsStart,
  fetchVideoListsDetailsFailure,
  fetchVideoListsDetailsSuccess,
  updateSingleCallFailure,
  updateSingleCallSuccess,
  streamPaymentFailure,
  streamPaymentSuccess,
} from "../actions/PostAction";

function* savePostAPI() {
  try {
    const inputData = yield select((state) => state.post.savePost.inputData);

    if (!inputData.content && !inputData.post_files) { // !!!!! Dont change this condition. If changing get confirmation vidhya
      yield put(savePostFailure("Please fill the content"));
      const notificationMessage = getErrorNotificationMessage(
        "Please fill the content"
      );
      yield put(createNotification(notificationMessage));
    } else {
      const response = yield api.postMethod("posts_save_for_owner", inputData);
      if (response.data.success) {
        yield put(savePostSuccess(response.data.data));
        const notificationMessage = getSuccessNotificationMessage(
          response.data.message
        );
        yield put(createNotification(notificationMessage));
        window.location.assign("/post/" + response.data.data.post_unique_id);
      } else {
        yield put(savePostFailure(response.data.error));
        const notificationMessage = getErrorNotificationMessage(
          response.data.error
        );
        yield put(createNotification(notificationMessage));
      }
    }
  } catch (error) {
    yield put(savePostFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* fetchPostsAPI() {
  try {
    const response = yield api.postMethod("posts_for_owner");
    if (response.data.success) {
      yield put(fetchPostsSuccess(response.data.data));
    } else {
      yield put(fetchPostsFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchPostsFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* fetchSinglePostAPI() {
  try {
    const inputData = yield select((state) => state.post.singlePost.inputData);
    const response = yield api.postMethod("posts_view_for_others", inputData);
    if (response.data.success) {
      yield put(fetchSinglePostSuccess(response.data.data));
    } else {
      yield put(fetchSinglePostFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchSinglePostFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* deletePostAPI() {
  try {
    const inputData = yield select((state) => state.post.delPost.inputData);
    const response = yield api.postMethod("posts_delete_for_owner", inputData);
    if (response.data.success) {
      yield put(deletePostSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      window.location.assign("/profile");
    } else {
      yield put(deletePostFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(deletePostFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* changePostStatusAPI() {
  try {
    const inputData = yield select(
      (state) => state.post.changePostStatus.inputData
    );
    const response = yield api.postMethod("posts_status", inputData);
    if (response.data.success) {
      yield put(changePostStatusSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(changePostStatusFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(changePostStatusFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* postFileUploadAPI() {
  try {
    const inputData = yield select((state) => state.post.fileUpload.inputData);
    const response = yield api.postMethod("post_files_upload", inputData);
    if (response.data.success) {
      yield put(postFileUploadSuccess(response.data.data));
    } else {
      yield put(postFileUploadFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(postFileUploadFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* PPVPaymentPaypalAPI() {
  try {
    const paymentInputData = yield select(
      (state) => state.post.ppvPayPal.inputData
    );
    const response = yield api.postMethod(
      "posts_payment_by_paypal",
      paymentInputData
    );
    if (response.data.success) {
      yield put(PPVPaymentPaypalSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      window.location.assign("/post/" + response.data.data.post.post_unique_id);
    } else {
      yield put(PPVPaymentPaypalFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(PPVPaymentPaypalFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* PPVPaymentStripeAPI() {
  try {
    const paymentInputData = yield select(
      (state) => state.post.ppvPayStripe.inputData
    );
    const response = yield api.postMethod(
      "posts_payment_by_stripe",
      paymentInputData
    );
    if (response.data.success) {
      yield put(PPVPaymentStripeSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      window.location.assign("/post/" + response.data.data.post.post_unique_id);
    } else {
      yield put(PPVPaymentStripeFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(PPVPaymentStripeFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* PPVPaymentWalletAPI() {
  try {
    const paymentInputData = yield select(
      (state) => state.post.ppvPayWallet.inputData
    );
    const response = yield api.postMethod(
      "posts_payment_by_wallet",
      paymentInputData
    );

    if (response.data.success) {
      yield put(PPVPaymentWalletSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      window.location.assign("/post/" + response.data.data.post.post_unique_id);
    } else {
      yield put(PPVPaymentWalletFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(PPVPaymentWalletFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* fetchReportPostsAPI() {
  try {
    const response = yield api.postMethod("report_posts");
    if (response.data.success) {
      yield put(fetchReportPostsSuccess(response.data.data));
    } else {
      yield put(fetchReportPostsFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchReportPostsFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* saveReportPostAPI() {
  try {
    const inputData = yield select(
      (state) => state.post.saveReportPost.inputData
    );
    const response = yield api.postMethod("report_posts_save", inputData);
    if (response.data.success) {
      yield put(saveReportPostSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(saveReportPostFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(saveReportPostFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* postFileRemoveAPI() {
  try {
    const inputData = yield select((state) => state.post.fileRemove.inputData);
    const response = yield api.postMethod("post_files_remove", inputData);
    if (response.data.success) {
      yield put(postFileRemoveSuccess(response.data.data));
    } else {
      yield put(postFileRemoveFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(postFileRemoveFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* saveLiveStreamAPI() {
  try {
    const inputData = yield select((state) => state.post.saveLiveStream.inputData);

    if (!inputData.title) { // !!!!! Dont change this condition. If changing get confirmation vidhya
      yield put(saveLiveStreamFailure("Please fill the channel name"));
      const notificationMessage = getErrorNotificationMessage(
        "Please fill the channel name"
      );
      yield put(createNotification(notificationMessage));
    }
    // else if (!inputData.coverImage) { // !!!!! Dont change this condition. If changing get confirmation vidhya
    //   yield put(saveLiveStreamFailure("Please select cover image"));
    //   const notificationMessage = getErrorNotificationMessage(
    //     "Please select cover image"
    //   );
    //   yield put(createNotification(notificationMessage));
    // } 
    else {
      const response = yield api.postMethod("live_videos_broadcast_start", inputData);
      if (response.data.success) {
        yield put(saveLiveStreamSuccess(response.data.data));
        const notificationMessage = getSuccessNotificationMessage(
          response.data.message
        );
        yield put(createNotification(notificationMessage));
        window.location.assign("/liveStream/"+response.data.data.stream.id);
      } else {
        yield put(saveLiveStreamFailure(response.data.error));
        const notificationMessage = getErrorNotificationMessage(
          response.data.error
        );
        yield put(createNotification(notificationMessage));
      }
    }
  } catch (error) {
    yield put(saveLiveStreamFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* fetchStreamAPI() {
  try {
    const inputData = yield select((state) => state.post.livestream.inputData);
    const response = yield api.postMethod("livestream",inputData);
    if (response.data.success) {
      yield put(fetchSingleStreamSuccess(response.data.data));
    } else {
      yield put(fetchSingleStreamFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchSingleStreamFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* fetchListStreamAPI() {
  try {
    const response = yield api.postMethod("live_videos");
    if (response.data.success) {
      yield put(fetchStreamListsDetailsSuccess(response.data.data));
    } else {
      yield put(fetchStreamListsDetailsFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchStreamListsDetailsFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* saveLiveStreamUsersAPI() {
  try {
    const inputData = yield select((state) => state.post.saveLiveStreamUsers.inputData);

    const response = yield api.postMethod("live_save_joined_user", inputData);
    if (response.data.success) {
      // yield put(saveLiveStreamUsersSuccess(response.data.data));
      // const notificationMessage = getSuccessNotificationMessage(
      //   response.data.message
      // );
      // yield put(createNotification(notificationMessage));
    } else {
      yield put(saveLiveStreamUsersFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(saveLiveStreamUsersFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* leaveLiveStreamUserAPI() {
  try {
    const inputData = yield select((state) => state.post.leaveLiveStreamUser.inputData);

    const response = yield api.postMethod("live_videos_broadcast_stop", inputData);
    if (response.data.success) {
      // yield put(leaveLiveStreamUserSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        'LiveStream Ended'
      );
      yield put(createNotification(notificationMessage));
      setTimeout(()=>{
        window.location.assign("/home");  
      },500);      
    } else {
      yield put(leaveLiveStreamUserFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(leaveLiveStreamUserFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* fetchCallAPI() {
  try {
    const inputData = yield select((state) => state.post.call.inputData);
    const response = yield api.postMethod("get_single_call",inputData);
    if (response.data.success) {
      yield put(fetchSingleCallSuccess(response.data.data));
    } else {
      yield put(fetchSingleCallFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchSingleCallFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* saveCallAPI() {
  try {
    const inputData = yield select((state) => state.post.saveCallUser.inputData);
    const response = yield api.postMethod("call",inputData);
    if (response.data.success) {
      yield put(saveSingleCallSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(saveSingleCallFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(saveSingleCallFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* leaveCallUserAPI() {
  try {
    const inputData = yield select((state) => state.post.leaveCallUser.inputData);

    const response = yield api.postMethod("call_stop", inputData);
    if (response.data.success) {
      // yield put(leaveCallUserSuccess(response.data.data));
      // const notificationMessage = getSuccessNotificationMessage(
      //   response.data.message
      // );
      // yield put(createNotification(notificationMessage));
      window.location.assign("/callRequest");
    } else {
      yield put(leaveCallUserFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(leaveCallUserFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* fetchListVideoAPI() {
  try {
    const response = yield api.postMethod("get_calls");
    if (response.data.success) {
      yield put(fetchVideoListsDetailsSuccess(response.data.data));
    } else {
      yield put(fetchVideoListsDetailsFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchVideoListsDetailsFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* updateCallAPI() {
  try {
    const inputData = yield select((state) => state.post.updateCallUser.inputData);
    const response = yield api.postMethod("update_call",inputData);
    if (response.data.success) {
      yield put(saveSingleCallSuccess(response.data.data));

      if(window.location.pathname=="/callRequest"){
        const notificationMessage = getSuccessNotificationMessage(
          response.data.message
        );
        yield put(createNotification(notificationMessage));
        
        yield put(fetchVideoListsDetailsStart());
      }
    } else {
      yield put(saveSingleCallFailure(response.data.error));
      if(window.location.pathname=="/callRequest"){
        const notificationMessage = getErrorNotificationMessage(
          response.data.error
        );
        yield put(createNotification(notificationMessage));
      }
    }
  } catch (error) {
    yield put(saveSingleCallFailure(error));
    if(window.location.pathname=="/callRequest"){
      const notificationMessage = getErrorNotificationMessage(error.message);
      yield put(createNotification(notificationMessage));
    }
  }
}

function* streamPaymentAPI() {
  try {
    const inputData = yield select((state) => state.post.streamPayment.inputData);
    const response = yield api.postMethod("user_live_stream_payment_by_stripe",inputData);
    if (response.data.success) {
      yield put(saveSingleCallSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      window.location.assign("/liveStream/"+response.data.data.stream.id);
    } else {
      yield put(saveSingleCallFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(saveSingleCallFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

export default function* pageSaga() {
  yield all([yield takeLatest(SAVE_POST_START, savePostAPI)]);
  yield all([yield takeLatest(FETCH_POSTS_START, fetchPostsAPI)]);
  yield all([yield takeLatest(FETCH_SINGLE_POST_START, fetchSinglePostAPI)]);
  yield all([yield takeLatest(DELETE_POST_START, deletePostAPI)]);
  yield all([yield takeLatest(CHANGE_POST_STATUS_START, changePostStatusAPI)]);
  yield all([yield takeLatest(POST_FILE_UPLOAD_START, postFileUploadAPI)]);
  yield all([yield takeLatest(POST_FILE_REMOVE_START, postFileRemoveAPI)]);

  yield all([yield takeLatest(PPV_PAYMENT_STRIPE_START, PPVPaymentStripeAPI)]);
  yield all([yield takeLatest(PPV_PAYMENT_WALLET_START, PPVPaymentWalletAPI)]);
  yield all([yield takeLatest(SAVE_REPORT_POST_START, saveReportPostAPI)]);
  yield all([yield takeLatest(FETCH_REPORT_POSTS_START, fetchPostsAPI)]);
  yield all([yield takeLatest(PPV_PAYMENT_PAYPAL_START, PPVPaymentPaypalAPI)]);

  yield all([yield takeLatest(SAVE_LIVESTREAM_START, saveLiveStreamAPI)]);
  yield all([yield takeLatest(FETCH_SINGLE_STREAM_START, fetchStreamAPI)]);
  yield all([yield takeLatest(FETCH_LIST_STREAM_START, fetchListStreamAPI)]);
  yield all([yield takeLatest(SAVE_LIVESTREAM_USERS_START, saveLiveStreamUsersAPI)]);
  yield all([yield takeLatest(LEAVE_LIVESTREAM_USER_START, leaveLiveStreamUserAPI)]);

  yield all([yield takeLatest(FETCH_SINGLE_CALL_START, fetchCallAPI)]);
  yield all([yield takeLatest(SAVE_SINGLE_CALL_START, saveCallAPI)]);
  yield all([yield takeLatest(LEAVE_CALL_USER_START, leaveCallUserAPI)]);
  yield all([yield takeLatest(FETCH_LIST_VIDEO_START, fetchListVideoAPI)]);
  yield all([yield takeLatest(UPDATE_VIDEO_START, updateCallAPI)]);
  yield all([yield takeLatest(STREAM_PAYMENT_START, streamPaymentAPI)]);
}
