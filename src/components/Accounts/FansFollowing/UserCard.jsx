import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Col, Dropdown, Image, Media } from "react-bootstrap";
import AddFavModal from "../../helper/AddFavModal";
import SendTipModal from "../../helper/SendTipModal";
import { deleteFavStart, saveFavStart } from "../../../store/actions/FavAction";
import { connect } from "react-redux";
import { getSuccessNotificationMessage } from "../../helper/NotificationMessage";
import { createNotification } from "react-redux-notify/lib/modules/Notifications";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { saveBlockUserStart } from "../../../store/actions/UserAction";
import { unFollowUserStart } from "../../../store/actions/FollowAction";
import VerifiedBadgeNoShadow from "../../Handlers/VerifiedBadgeNoShadow";
import { withNamespaces } from 'react-i18next';
import api from "../../../Environment";

const UserCard = (props) => {
  console.log(props.user);
  const [sendTip, setSendTip] = useState(false);

  const closeSendTipModal = () => {
    setSendTip(false);
  };

  const [addFav, setAddFav] = useState(false);
  const [favStatus, setFavStatus] = useState("");

  const [badgeStatus, setBadgeStatus] = useState(props.user.is_verified_badge);
  const [blockUserStatus, setBlockUserStatus] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState("");

  const closeAddFavModal = () => {
    setAddFav(false);
  };

  const removeFav = () => {
    props.dispatch(deleteFavStart({ user_id: props.user.user_id }));
  };

  const handleStar = (event, status) => {
    event.preventDefault();
    setFavStatus(status);
    props.dispatch(
      saveFavStart({
        user_id: props.user.user_id,
      })
    );
  };
  const handleBlockUser = (event, status) => {
    event.preventDefault();
    setBlockUserStatus(status);
    props.dispatch(
      saveBlockUserStart({
        user_id: props.user.user_id,
      })
    );
  };

  const handleUnfollowUser = (event, status) => {
    event.preventDefault();
    setSubscribeStatus(status);
    props.dispatch(
      unFollowUserStart({
        user_id: props.user.user_id,
      })
    );
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
      <Col sm={12} md={6} lg={4} xs={12}>
        <div className="follower-lists">
          <div className="follower-subscription-lists">
            <div className="follower-subscription-inner">
              <Link to={`/` + props.user.user_unique_id}>
                <div className="follower-wrapper">
                  <Image className="follower-cover" src={props.user.cover ? (api.serviceUrl()+'/'+props.user.cover) : (api.serviceUrl()+'/images/mysecrets_avatar_square_image.png')} />
                </div>
              </Link>
              <div className="follower-profile-header">
                <Link to={`/` + props.user.user_unique_id}>
                  <span className="follower-profile-avatar">
                    <Image src={props.user.picture ? (api.serviceUrl()+'/'+props.user.picture) : (api.serviceUrl()+'/images/mysecrets_avatar_square_image.png')} className="" />
                  </span>
                </Link>
                <div className="follower-info">
                  <div className="follower-profile-status">
                    <div
                      className="follower-status-text"
                      style={{ display: "none" }}
                    >
                      {t("last_seen")}
                      <span title="User Updated">{props.user.updated}</span>
                    </div>
                    <div className="follower-profile-toggle-dropdown">
                      {/* <Link to="#" className="btn dropdown-toggle btn-link">
                        <Image
                          src="/assets/images/icons/vertical-dots.svg"
                          className="svg-clone vertical-dots"
                        />
                      </Link> */}

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
                            text={window.location.origin+'/'+props.user.share_link}
                            onCopy={onCopy}
                          >
                            <Media as="li">
                              <Link to="#"> {t("copy_link_to_profile")} </Link>
                            </Media>
                          </CopyToClipboard>

                          {blockUserStatus != "" ? (
                            blockUserStatus == "unblocked" ? (
                              <Media as="li">
                                <Link
                                  to="#"
                                  onClick={(event) =>
                                    handleBlockUser(event, "blocked")
                                  }
                                >
                                  {t("block_the_user")}
                                </Link>
                              </Media>
                            ) : (
                              <Media as="li">
                                <Link
                                  to="#"
                                  onClick={(event) =>
                                    handleBlockUser(event, "unblocked")
                                  }
                                >
                                  {t("unblock_the_user")}
                                </Link>
                              </Media>
                            )
                          ) : props.user.is_block_user == 1 ? (
                            <Media as="li">
                              <Link
                                to="#"
                                onClick={(event) =>
                                  handleBlockUser(event, "unblocked")
                                }
                              >
                                {t("unblock_the_user")}
                              </Link>
                            </Media>
                          ) : (
                            <Media as="li">
                              <Link
                                to="#"
                                onClick={(event) =>
                                  handleBlockUser(event, "blocked")
                                }
                              >
                                {t("block_the_user")}
                              </Link>
                            </Media>
                          )}

                          {subscribeStatus != "" ? (
                            subscribeStatus == "unsubscribed" ? (
                              <Media as="li">
                                <Link to={`/` + props.user.user_unique_id}>
                                  {t("subscribe")}
                                </Link>
                              </Media>
                            ) : (
                              <Media as="li">
                                <Link
                                  to="#"
                                  onClick={(event) =>
                                    handleUnfollowUser(event, "unsubscribed")
                                  }
                                >
                                  {t("unsubscribe")}
                                </Link>
                              </Media>
                            )
                          ) : props.user.show_follow ? (
                            <Media as="li">
                              <Link to={`/` + props.user.user_unique_id}>
                                {t("subscribe")}
                              </Link>
                            </Media>
                          ) : (
                            <Media as="li">
                              <Link
                                to="#"
                                onClick={(event) =>
                                  handleUnfollowUser(event, "unsubscribed")
                                }
                              >
                                {t("unsubscribe")}
                              </Link>
                            </Media>
                          )}
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                  <div className="follower-wrapper-name">
                    <div className="follower-profile-names">
                      <div className="follower-name-row">
                        <Link to={props.user.user_unique_id}>
                          <div className="follower-user-name">
                            {props.user.name}{" "}
                            {badgeStatus == 1 ? (
                              <VerifiedBadgeNoShadow />
                            ) : null}
                          </div>
                        </Link>
                      </div>
                      <div className="follower-name-row">
                        <Link
                          to={`/` + props.user.user_unique_id}
                          className="g-user-realname__wrapper"
                        >
                          <div className="follower-user-id">
                            @{props.user.username}
                          </div>
                        </Link>
                      </div>
                    </div>

                    <div className="group-follower-btns">
                      <CopyToClipboard
                        text={window.location.origin+'/'+props.user.share_link}
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
              <div className="add-to-lists-button">
                <div className="swiper-favorite">
                  {favStatus !== "" ? (
                    <>
                      <>
                        {favStatus === "added" ? (
                          <Link
                            type="button"
                            className="swiper-btn-fav"
                            onClick={(event) => handleStar(event, "removed")}
                          >
                            <Image
                              src="/assets/images/icons/star.svg"
                              className="svg-clone my-p-icons"
                              width="12"
                            />
                            {t("remove_from_favorites")}
                          </Link>
                        ) : null}
                      </>
                      <>
                        {favStatus === "removed" ? (
                          <Link
                            type="button"
                            className="swiper-btn-fav"
                            onClick={(event) => handleStar(event, "added")}
                          >
                            <Image
                              src="/assets/images/icons/star.svg"
                              className="svg-clone my-p-icons"
                              width="12"
                            />
                            {t("add_to_favorites")}
                          </Link>
                        ) : null}
                      </>
                    </>
                  ) : props.user.is_fav_user == 1 ? (
                    <Link
                      type="button"
                      className="swiper-btn-fav"
                      onClick={(event) => handleStar(event, "removed")}
                    >
                      <Image
                        src="/assets/images/icons/star.svg"
                        className="svg-clone my-p-icons"
                        width="12"
                      />
                      {t("remove_from_favorites")}
                    </Link>
                  ) : (
                    <Link
                      type="button"
                      className="swiper-btn-fav"
                      onClick={(event) => handleStar(event, "added")}
                    >
                      <Image
                        src="/assets/images/icons/star.svg"
                        className="svg-clone my-p-icons"
                        width="12"
                      />
                      {t("add_to_favorites")}
                    </Link>
                  )}
                </div>
              </div>
              <div className="lists-button-group post-icons">
                <Button
                  type="button"
                  className="g-btn m-rounded m-border m-profile m-with-icon"
                  onClick={() => setSendTip(true)}
                >
                  <Image
                    src="/assets/images/icons/tip.svg"
                    className="svg-clone"
                  />
                  <span className="b-btn-text">{t("tip")}</span>
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
      </Col>
      <SendTipModal
        sendTip={sendTip}
        closeSendTipModal={closeSendTipModal}
        username={props.user.username}
        userPicture={props.user.picture}
        name={props.user.usernamee}
        post_id={null}
        user_id={props.user.user_id}
      />
    </>
  );
};

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(null, mapDispatchToProps)(withNamespaces()(UserCard));
