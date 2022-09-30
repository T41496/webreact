import React, { useState, useEffect } from "react";
import FollowingAllSec from "./FollowingAllSec";
import FollowingActiveSec from "./FollowingActiveSec";
import FollowingExpiredSec from "./FollowingExpiredSec";
import FollowingTabSec from "./FollowingTabSec";
import { Container, Row, Col, Image } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchActiveFollowingStart,
  fetchExpiredFollowingStart,
  fetchFollowingStart,
} from "../../../../store/actions/FollowAction";
import FollowingLoader from "../../../Loader/FollowingLoader";
import { withNamespaces } from 'react-i18next';

const FollowingIndex = (props) => {
  useEffect(() => {
    props.dispatch(fetchActiveFollowingStart());
  }, []);
  const [activeSec, setActiveSec] = useState("active-sec");

  const changeSection = (event, type) => {
    setActiveSec(type);
    if (type === "active-sec") props.dispatch(fetchActiveFollowingStart());
    if (type === "expired-sec") props.dispatch(fetchExpiredFollowingStart());
    if (type === "all-sec") props.dispatch(fetchFollowingStart());
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
                      {t("following")}
                    </Link>
                    
                  </h3>
                </div>
              </div>
            </div>
            <div className="listing-tab">
              <div className="tab" role="tabpanel">
                <FollowingTabSec
                  activeSec={activeSec}
                  setActiveSec={setActiveSec}
                  changeSection={changeSection}
                />
                <div className="tab-content tabs">
                  <FollowingActiveSec
                    activeSec={activeSec}
                    setActiveSec={setActiveSec}
                    following={props.activeFollowing}
                  />

                  <FollowingExpiredSec
                    activeSec={activeSec}
                    setActiveSec={setActiveSec}
                    following={props.expiredFollowing}
                  />

                  <FollowingAllSec
                    activeSec={activeSec}
                    setActiveSec={setActiveSec}
                    following={props.following}
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
  following: state.follow.following,
  activeFollowing: state.follow.activeFollowing,
  expiredFollowing: state.follow.expiredFollowing,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(withNamespaces()(FollowingIndex));
