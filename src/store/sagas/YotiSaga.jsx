import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";
import { createNotification } from "react-redux-notify";
import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../../components/helper/NotificationMessage";
import {
    fetchYotiDetailsSuccess,
    fetchYotiDetailsFailure,
 
} from "../actions/YotiAction";
import {
    FETCH_YOTI_DETAILS_STRAT,
} from "../actions/ActionConstant";

function* fetchYotiDetailsStrat() {
        try {
          const response = yield api.postMethod("get_yoti_token");
          if (response.data.success) {
            yield put(fetchYotiDetailsSuccess(response.data));
          
          } else {
            yield put(fetchYotiDetailsFailure(response.data.error));
            const notificationMessage = getErrorNotificationMessage(
              response.data.error
            );
            yield put(createNotification(notificationMessage));
          }
        } catch (error) {
          yield put(fetchYotiDetailsFailure(error));
          const notificationMessage = getErrorNotificationMessage(
            error.response.data.error
          );
          yield put(createNotification(notificationMessage));
        }
      }



export default function* pageSaga() {
  yield all([yield takeLatest(FETCH_YOTI_DETAILS_STRAT, fetchYotiDetailsStrat)]);
  
}
