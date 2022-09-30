import React, { useState, useEffect } from "react";
import NotificationAllSec from "./NotificationAllSec";
import { Link } from "react-router-dom";
import { Container, Row, Col, Image } from "react-bootstrap";
import { fetchNotificationsStart } from "../../store/actions/NotificationAction";
import { connect } from "react-redux";
import NotificationLoader from "../Loader/NotificationLoader";
import { withNamespaces } from "react-i18next";

const NotificationIndex = (props) => {
  const [activeSec, setActiveSec] = useState("notify-all-sec");

  useEffect(() => {
    props.dispatch(fetchNotificationsStart());
  }, []);

  const { t } = props;

  return (
    <>
      <div className="notification-page">
        <Container>
          <Row>
            <Col sm={12} md={12} xs={12}>
              <div className="profile-post-area">
                <div className="bookmarkes-list bookmarks-right-side resp-sapce-center">
                  <div className="pull-left">
                    <Link className="bookmarkes-list notify-title" to={`/home`}>
                      <Image
                        src="/assets/images/icons/back.svg"
                        className="svg-clone"
                      />
                      {t("notifications")}
                    </Link>
                  </div>
                </div>
              </div>
              <div className="tabbable-panel">
                <div className="tab" role="tabpanel">
                  <div className="tab-content tabs padding-top-md">
                    {props.notification.loading ? (
                      <NotificationLoader></NotificationLoader>
                    ) : (
                      <NotificationAllSec
                        activeSec={activeSec}
                        setActiveSec={setActiveSec}
                        notifications={props.notification.data.notifications}
                        totalNotifications={props.notification.data.total}
                      />
                    )}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

const mapStateToPros = (state) => ({
  notification: state.notification.notification,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(withNamespaces()(NotificationIndex));
