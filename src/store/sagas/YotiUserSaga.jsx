import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";
import { createNotification } from "react-redux-notify";
import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../../components/helper/NotificationMessage";
import {
    fetchYotiUserDetailsSuccess,
    fetchYotiUserDetailsFailure,
 
} from "../actions/YotiUserAction";
import {
    FETCH_YOTI_USER_DETAILS_STRAT,
} from "../actions/ActionConstant";

function* fetchYotiUserDetailsStrat() {
        try {
          const inputData = yield select((state) => state.yotiUser.yotiUser.inputData);
          console.log(inputData);
          const response = yield api.postMethod("get_yoti_user_details",inputData);
          if (response.data.data.state == 'COMPLETED') {
            yield put(fetchYotiUserDetailsSuccess(response.data.message));
            window.location.assign("/document-upload");
          }else if(response.data.data.state == 'ONGOING'){
            yield put(fetchYotiUserDetailsSuccess(response.data.message));
            window.location.assign("/document-upload");
          } else {
            yield put(fetchYotiUserDetailsFailure(response.data.error));
            const notificationMessage = getErrorNotificationMessage(
              response.data.error
            );
            yield put(createNotification(notificationMessage));
          }
        } catch (error) {
          yield put(fetchYotiUserDetailsFailure(error));
          const notificationMessage = getErrorNotificationMessage(
            error.response.data.error
          );
          yield put(createNotification(notificationMessage));
        }
      }



export default function* pageSaga() {
  yield all([yield takeLatest(FETCH_YOTI_USER_DETAILS_STRAT, fetchYotiUserDetailsStrat)]);
  
}
