import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";
import configuration from "react-global-configuration";
import { withNamespaces } from "react-i18next";
import { connect } from "react-redux";
import api from "../../Environment";
import AgoraRTC from 'agora-rtc-sdk'
import "./VideoCall.css";
import { fetchSingleCallStart,leaveCallUserStart,updateSingleCallStart } from "../../store/actions/PostAction";
import AgoraVideoCall from "../../components/VideoCall/AgoraVideoCall";

const VideoCall = (props) => {

  const { t } = props;

  let client,config,localCall;
  // config = {mode: "live", codec: "vp8", appId:"da75b8bffca24d9b8f7050f35c451600", token:"006da75b8bffca24d9b8f7050f35c451600IAAcD1V7hmciswveC18Vo9QLRlB+EGaIkaFQtkiTakjJPtnqyOa379yDIgAIzAAAWxE3YQQAAQBbETdhAwBbETdhAgBbETdhBABbETdh",channel:"testagorademo3"};
  // config = {mode: "live", codec: "vp8", appId:"da75b8bffca24d9b8f7050f35c451600", token:"006da75b8bffca24d9b8f7050f35c451600IACbfzOL5dl8JF5Ib60xUx5rUZz2ZDDS9p9WShmk6VXh6z2lYfG379yDIgAlOAEAYak0YQQAAQBhqTRhAwBhqTRhAgBhqTRhBABhqTRh",channel:"test_new_maci1"};
  // config = {mode: "live", codec: "vp8", appId:"01cd8d6aa7744fa28cdf9f4808f0ab65", token:"00601cd8d6aa7744fa28cdf9f4808f0ab65IAAhX9fZAVA6B8AJBpZawmmTCd6LUZennphnDLpFMYqyjxd3pTMAAAAAEAC26B3+K3g0YQEAAQAqeDRh",channel:"new_mas"};
  useEffect(() => {
    props.dispatch(fetchSingleCallStart({
      video_id: props.match.params.user_id,
    }));
  }, []);

  if(!props.videoCall.loading){
    config = {
      mode: props.videoCall.data.mode, 
      codec: props.videoCall.data.codec, 
      appId:props.videoCall.data.appId, 
      token:props.videoCall.data.token,
      channel:props.videoCall.data.channel,
      transcode:props.videoCall.data.transcode,
      videoProfile:props.videoCall.data.videoProfile,
      baseMode:props.videoCall.data.baseMode,
      uid:props.videoCall.data.user_id
    };
  }

  let handleUserLeave = (id,event) => {
    props.dispatch(leaveCallUserStart({
      call_id: props.videoCall.data.call_id,
      user_id: id,
    }));
  };

  let handleUserUpdate = (id,event) => {
    props.dispatch(updateSingleCallStart({
      video_id: props.videoCall.data.call_id,
      status_type: id,
    }));
  };

  return (
      <div className="wrapper meeting">
        <div className="ag-header">
          {(!props.videoCall.loading)?
            <div className="ag-header-msg">
              Room:&nbsp;<span id="room-name">{props.videoCall.data.channel}</span>
            </div>
          :
            <div></div>
          }
        </div>
        <div className="ag-main">
          <div className="ag-container">
            {(props.videoCall.loading)?
              <div></div>
            :
              <AgoraVideoCall
                videoProfile={props.videoCall.data.videoProfile}
                channel={props.videoCall.data.channel}
                transcode={props.videoCall.data.transcode}
                attendeeMode={props.videoCall.data.mode}
                baseMode={props.videoCall.data.baseMode}
                appId={props.videoCall.data.appId}
                uid={props.videoCall.data.user_id}
                host_id={props.videoCall.data.caller_id}
                call_id={props.videoCall.data.call_id}
                call_user_id={props.videoCall.data.called_user_id}
                user_leave ={handleUserLeave}
                user_update = {handleUserUpdate}
              />
            }
          </div>
        </div>
        <div className="ag-footer">
          
        </div>
      </div>
    );
};

const mapStateToPros = (state) => ({
  videoCall: state.post.call,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(withNamespaces()(VideoCall));
