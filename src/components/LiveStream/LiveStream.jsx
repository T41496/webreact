import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";
import configuration from "react-global-configuration";
import { withNamespaces } from "react-i18next";
import { connect } from "react-redux";
import api from "../../Environment";
import AgoraRTC from 'agora-rtc-sdk'
import "./LiveStream.css";
import { fetchSingleStreamStart,saveLiveStreamUsersStart,leaveLiveStreamUserStart } from "../../store/actions/PostAction";
import AgoraVideoCall from "../../components/LiveStream/AgoraVideoCall";

const LiveStream = (props) => {

  let client,config,localStream;
  // config = {mode: "live", codec: "vp8", appId:"da75b8bffca24d9b8f7050f35c451600", token:"006da75b8bffca24d9b8f7050f35c451600IAAcD1V7hmciswveC18Vo9QLRlB+EGaIkaFQtkiTakjJPtnqyOa379yDIgAIzAAAWxE3YQQAAQBbETdhAwBbETdhAgBbETdhBABbETdh",channel:"testagorademo3"};
  // config = {mode: "live", codec: "vp8", appId:"da75b8bffca24d9b8f7050f35c451600", token:"006da75b8bffca24d9b8f7050f35c451600IACbfzOL5dl8JF5Ib60xUx5rUZz2ZDDS9p9WShmk6VXh6z2lYfG379yDIgAlOAEAYak0YQQAAQBhqTRhAwBhqTRhAgBhqTRhBABhqTRh",channel:"test_new_maci1"};
  // config = {mode: "live", codec: "vp8", appId:"01cd8d6aa7744fa28cdf9f4808f0ab65", token:"00601cd8d6aa7744fa28cdf9f4808f0ab65IAAhX9fZAVA6B8AJBpZawmmTCd6LUZennphnDLpFMYqyjxd3pTMAAAAAEAC26B3+K3g0YQEAAQAqeDRh",channel:"new_mas"};
  useEffect(() => {
    props.dispatch(fetchSingleStreamStart({
      stream_id: props.match.params.stream_id,
    }));
  }, []);

  if(!props.livestream.loading){
    config = {
      mode: props.livestream.data.mode, 
      codec: props.livestream.data.codec, 
      appId:props.livestream.data.appId, 
      token:props.livestream.data.token,
      channel:props.livestream.data.channel,
      transcode:props.livestream.data.transcode,
      videoProfile:props.livestream.data.videoProfile,
      baseMode:props.livestream.data.baseMode,
      uid:props.livestream.data.user_id
    };
  }

  let handleUserUpdate = (ids,event) => {
    props.dispatch(saveLiveStreamUsersStart({
      live_stream_id: props.livestream.data.stream_id,
      user_id: ids,
    }));
  };

  let handleUserLeave = (id,event) => {
    props.dispatch(leaveLiveStreamUserStart({
      live_stream_id: props.livestream.data.stream_id,
      user_id: id,
    }));
  };

  const { t } = props;

  return (
      <div className="wrapper meeting">
        <div className="ag-header">
          {(!props.livestream.loading)?
            <div className="ag-header-msg">
              Room:&nbsp;<span id="room-name">{props.livestream.data.channel}</span>
            </div>
          :
            <div></div>
          }
        </div>
        <div className="ag-main">
          <div className="ag-container">
            {(props.livestream.loading)?
              <div></div>
            :
              <AgoraVideoCall
                videoProfile={props.livestream.data.videoProfile}
                channel={props.livestream.data.channel}
                transcode={props.livestream.data.transcode}
                attendeeMode={props.livestream.data.mode}
                baseMode={props.livestream.data.baseMode}
                appId={props.livestream.data.appId}
                uid={props.livestream.data.user_id}
                host_id={props.livestream.data.host_id}
                stream_id={props.livestream.data.stream_id}
                user_update ={handleUserUpdate}
                user_leave ={handleUserLeave}
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
  livestream: state.post.livestream,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(withNamespaces()(LiveStream));
