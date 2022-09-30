import React, { useState, useEffect } from "react";
import FanAllSec from "./FanAllSec";
import { Link } from "react-router-dom";
import FanActiveSec from "./FanActiveSec";
import FanExpiredSec from "./FanExpiredSec";
import FanTabSec from "./FanTabSec";
import { Container, Row, Col, Image } from "react-bootstrap";
import { connect } from "react-redux";
import {
  fetchActiveFollowersStart,
  fetchExpiredFollowersStart,
  fetchFollowersStart,
} from "../../../../store/actions/FollowAction";
import FollowingLoader from "../../../Loader/FollowingLoader";
import { withNamespaces } from 'react-i18next';

const FanIndex = (props) => {
  useEffect(() => {
    props.dispatch(fetchActiveFollowersStart());
  }, []);
  const [activeSec, setActiveSec] = useState("active-sec");

  const changeSection = (event, type) => {
    setActiveSec(type);
    if (type === "active-sec") props.dispatch(fetchActiveFollowersStart());
    if (type === "expired-sec") props.dispatch(fetchExpiredFollowersStart());
    if (type === "all-sec") props.dispatch(fetchFollowersStart());
  };

  const { t } = props;

  return (
    <div className="lists">
      <Container>
        <Row>
          <Col sm={12} md={12} xs={12}>
            <div className="profile-post-area">
              <div className="bookmarkes-list bookmarks-right-side">
                <div className="pull-left">
                  <h3>
                    <Link
                      className="bookmarkes-list"
                      to={"/home"}
                      onClick={() => props.history.goBack()}
                    >
                      <Image
                        src="/assets/images/icons/back.svg"
                        className="svg-clone"
                      />
                      {t("fans")}
                    </Link>
                  </h3>
                </div>
              </div>
            </div>
            <div className="listing-tab">
              <div className="tab" role="tabpanel">
                <FanTabSec
                  activeSec={activeSec}
                  setActiveSec={setActiveSec}
                  changeSection={changeSection}
                />
                <div className="tab-content tabs">
                  <FanActiveSec
                    activeSec={activeSec}
                    setActiveSec={setActiveSec}
                    followers={props.activeFollowers}
                  />

                  <FanExpiredSec
                    activeSec={activeSec}
                    setActiveSec={setActiveSec}
                    followers={props.expiredFollowers}
                  />

                  <FanAllSec
                    activeSec={activeSec}
                    setActiveSec={setActiveSec}
                    followers={props.followers}
                  />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const mapStateToPros = (state) => ({
  followers: state.follow.followers,
  activeFollowers: state.follow.activeFollowers,
  expiredFollowers: state.follow.expiredFollowers,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(withNamespaces()(FanIndex));
