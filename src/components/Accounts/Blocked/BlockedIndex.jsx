import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Image, Dropdown, Media, Button } from "react-bootstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";
import UserCard from "../FansFollowing/UserCard";
import { connect } from "react-redux";
import NoDataFound from "../../NoDataFound/NoDataFound";
import { fetchBlockUsersStart, saveBlockUserStart } from "../../../store/actions/UserAction";
import api from "../../../Environment";
import { getSuccessNotificationMessage } from "../../helper/NotificationMessage";
import { createNotification } from "react-redux-notify/lib/modules/Notifications";
import VerifiedBadgeNoShadow from "../../Handlers/VerifiedBadgeNoShadow";
import { withNamespaces } from 'react-i18next';

const BlockedIndex = (props) => {
  useEffect(() => {
    props.dispatch(fetchBlockUsersStart());
  }, []);

  const handleBlockUser = (event, user_id, status) => {
    event.preventDefault();
    props.dispatch(
      saveBlockUserStart({
        user_id: user_id,
      })
    );
    props.dispatch(fetchBlockUsersStart());
  };

  const onCopy = (event) => {
    const notificationMessage = getSuccessNotificationMessage(
      "Link to profile was copied to clipboard!"
    );
    props.dispatch(createNotification(notificationMessage));
  };

  const { t } = props;

  return (
    <>
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
                      {t("blocked_list")}
                    </Link>
                    
                  </h3>
                </div>
              </div>
            </div>
            <div className="listing-tab">
              <div className="tab" role="tabpanel">
                <div
                  role="tabpanel"
                  className={
                    props.activeSec === "active-sec"
                      ? "tab-pane fade in active"
                      : "tab-pane fade"
                  }
                  id="active"
                >
                  {props.blockedUser.loading ? (
                    t("loading")
                  ) : (
                    <>
                      <Row>
                        {props.blockedUser.data.block_users.length > 0 ? (
                          props.blockedUser.data.block_users.map((block) =>
                            block.blockeduser ? (
                              (<Col sm={12} md={6} lg={4} xs={12}>
                                <div className="follower-lists">
                                  <div className="follower-subscription-lists">
                                    <div className="follower-subscription-inner">
                                      <Link to={`/` + block.blockeduser.user_unique_id}>
                                        <div className="follower-wrapper">
                                          <Image className="follower-cover" src={block.blockeduser.cover ? (api.serviceUrl()+'/'+block.blockeduser.cover) : (api.serviceUrl()+'/images/mysecrets_avatar_square_image.png')} />
                                        </div>
                                      </Link>
                                      <div className="follower-profile-header">
                                        <Link to={`/` + block.blockeduser.user_unique_id}>
                                          <span className="follower-profile-avatar">
                                            <Image src={block.blockeduser.picture ? (api.serviceUrl()+'/'+block.blockeduser.picture) : (api.serviceUrl()+'/images/mysecrets_avatar_square_image.png')} className="" />
                                          </span>
                                        </Link>
                                        <div className="follower-info">
                                          <div className="follower-profile-status">
                                            <div
                                              className="follower-status-text"
                                              style={{ display: "none" }}
                                            >
                                              {t("last_seen")}
                                              <span title="User Updated">{block.blockeduser.updated}</span>
                                            </div>
                                            <div className="follower-profile-toggle-dropdown">
                                              <Dropdown className="btn dropdown-toggle btn-link">
                                                <Dropdown.Toggle
                                                  className="user-dropdown-dots dropdown-toggle"
                                                  type="button"
                                                  id="dropdown-basic"
                                                >
                                                  <Image
                                                    src={
                                                      window.location.origin +
                                                      "/assets/images/icons/vertical-dots-white.svg"
                                                    }
                                                    className="svg-clone vertical-dots"
                                                  />
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu className="dropdown-menu dropdown-menu-right">
                                                  <CopyToClipboard
                                                    text={window.location.origin+'/'+block.blockeduser.share_link}
                                                    onCopy={onCopy}
                                                  >
                                                    <Media as="li">
                                                      <Link to="#"> {t("copy_link_to_profile")} </Link>
                                                    </Media>
                                                  </CopyToClipboard>
                                                </Dropdown.Menu>
                                              </Dropdown>
                                            </div>
                                          </div>
                                          <div className="follower-wrapper-name">
                                            <div className="follower-profile-names">
                                              <div className="follower-name-row">
                                                <Link to={block.blockeduser.user_unique_id}>
                                                  <div className="follower-user-name">
                                                    {block.blockeduser.name}{" "}
                                                    {block.blockeduser.is_verified_badge == 1 ? (
                                                      <VerifiedBadgeNoShadow />
                                                    ) : null}
                                                  </div>
                                                </Link>
                                              </div>
                                              <div className="follower-name-row">
                                                <Link
                                                  to={`/` + block.blockeduser.user_unique_id}
                                                  className="g-user-realname__wrapper"
                                                >
                                                  <div className="follower-user-id">
                                                    @{block.blockeduser.username}
                                                  </div>
                                                </Link>
                                              </div>
                                            </div>

                                            <div className="group-follower-btns">
                                              <CopyToClipboard
                                                text={window.location.origin+'/'+block.blockeduser.share_link}
                                                onCopy={onCopy}
                                              >
                                                <Button
                                                  type="button"
                                                  className="g-btn m-rounded m-border m-icon m-icon-only m-colored has-tooltip"
                                                >
                                                  <Image
                                                    src="/assets/images/icons/share.svg"
                                                    className="svg-clone "
                                                  />
                                                </Button>
                                              </CopyToClipboard>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="lists-button-group post-icons">
                                        <Button
                                          type="button"
                                          className="g-btn m-rounded m-border m-profile m-with-icon"
                                          onClick={(event) => handleBlockUser(event, block.blockeduser.user_id, "unblocked")}
                                        >
                                          <span className="b-btn-text unblock-button">{t("unblock")}</span>
                                        </Button>
                                      </div>
                                      <div className="lists-button-group" style={{ display: "none" }}>
                                        <Link
                                          type="button"
                                          className="g-btn m-rounded m-border m-profile m-with-icon"
                                        >
                                          <Image
                                            src="/assets/images/icons/subscribe.svg"
                                            className="svg-clone"
                                          />
                                          <span className="b-btn-text">{t("subscribed_for_free")}</span>
                                        </Link>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Col>)
                            ) : (
                              ""
                            )
                          )
                        ) : (
                          <NoDataFound></NoDataFound>
                        )}
                      </Row>
                    </>
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
  blockedUser: state.users.blockUsers,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(withNamespaces()(BlockedIndex));
