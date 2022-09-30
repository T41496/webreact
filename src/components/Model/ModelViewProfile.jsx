import React, { useState, useEffect } from "react";
import ModelProfilePostSec from "./ModelProfilePostSec";
import ModelProfileTabSec from "./ModelProfileTabSec";
import ModelProfilePhotoSec from "./ModelProfilePhotoSec";
import ModelProfileVideoSec from "./ModelProfileVideoSec";
import WalletBalanceAlertModal from "../helper/WalletBalanceAlertModal";
import SendTipModal from "../helper/SendTipModal";
import PaymentModal from "../helper/PaymentModal";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ModelProfileMapSec from "./ModelProfileMapSec";
import {
  Button,
  Container,
  Row,
  Col,
  Image,
  Modal,
  Media,
} from "react-bootstrap";
import {
  fetchSingleUserProfileStart,
  fetchSingleUserPostsStart,
} from "../../store/actions/OtherUserAction";
import { saveFavStart } from "../../store/actions/FavAction";
import { saveChatUserStart } from "../../store/actions/ChatAction";
import { subscriptionPaymentStripeStart } from "../../store/actions/SubscriptionAction";
import { unFollowUserStart } from "../../store/actions/FollowAction";
import { saveBlockUserStart } from "../../store/actions/UserAction";
import { getSuccessNotificationMessage,getErrorNotificationMessage } from "../helper/NotificationMessage";
import { createNotification } from "react-redux-notify/lib/modules/Notifications";
import { CopyToClipboard } from "react-copy-to-clipboard";
import VerifiedBadgeNoShadow from "../Handlers/VerifiedBadgeNoShadow";
import { withNamespaces } from "react-i18next";
import useInfiniteScroll from "../helper/useInfiniteScroll";
import api from "../../Environment";
import VideoScheduleModal from "../helper/VideoScheduleModal";

const ModelViewProfile = (props) => {
  const toggleVisibility = () => {};

  useEffect(() => {
    props.dispatch(
      fetchSingleUserProfileStart({
        user_unique_id: props.match.params.username,
      })
    );
    props.dispatch(
      fetchSingleUserPostsStart({
        user_unique_id: props.match.params.username,
        type: "all",
      })
    );

    window.addEventListener("scroll", toggleVisibility);
  }, []);

  const [activeSec, setActiveSec] = useState("post");
  const [sendTip, setSendTip] = useState(false);
  const [starStatus, setStarStatus] = useState("");
  const [showUnfollow, setShowUnfollow] = useState(false);
  const [walletAlert, setWalletAlert] = useState(false);
  const [blockUserStatus, setBlockUserStatus] = useState("");

  const [videoSchedule, setVideoSchedule] = useState(false);

  const closeWalletAlertModal = () => {
    setWalletAlert(false);
  };

  const closeVideoScheduleModal = () => {
    setTimeout(() => {
      setVideoSchedule(false);
    },300);
  };

  const [subscriptionData, setSubscriptionData] = useState({
    is_free: 0,
    plan_type: "months",
    amount: 0,
    amount_formatted: 0,
  });

  const [subscrptionPayment, setPaymentModal] = useState(false);

  const fetchData = () => {
    setTimeout(() => {
      if (props.userPosts.length !== 0) {
        setActiveSection("event", activeSec, "loadMore");
        setIsFetching(false);
      } else {
        setNoMoreData(true);
      }
    }, 3000);
  };

  const [isFetching, setIsFetching] = useInfiniteScroll(fetchData);

  const [noMoreData, setNoMoreData] = useState(false);

  const closeSendTipModal = () => {
    setSendTip(false);
  };

  const closePaymentModal = () => {
    setPaymentModal(false);
  };

  const handleWalletAlert = (event) => {
    event.preventDefault();
    setWalletAlert(true);
  };

  const blockStatusUpdate = () => {
    if (props.loading == false) {
      setBlockUserStatus(
        props.data.is_block_user == 1 ? "blocked" : "unblocked"
      );
    }
  };

  const handleBlockUser = (event, status, user_id) => {
    event.preventDefault();
    setBlockUserStatus(status);
    props.dispatch(
      saveBlockUserStart({
        user_id: user_id,
        is_other_profile: 1,
      })
    );
  };

  const setActiveSection = (event, key, loadMore) => {
    setActiveSec(key);
    if (key === "post")
      props.dispatch(
        fetchSingleUserPostsStart({
          user_unique_id: props.match.params.username,
          type: "all",
          loadMore: loadMore,
        })
      );
    else if (key === "photo")
      props.dispatch(
        fetchSingleUserPostsStart({
          user_unique_id: props.match.params.username,
          type: "image",
          loadMore: loadMore,
        })
      );
    else if (key === "video")
      props.dispatch(
        fetchSingleUserPostsStart({
          user_unique_id: props.match.params.username,
          type: "video",
          loadMore: loadMore,
        })
      );
  };

  const handleUnfollowModalClose = () => setShowUnfollow(false);
  const handleUnfollowModalShow = () => setShowUnfollow(true);

  const handleUnfollow = (event, user_id) => {
    event.preventDefault();
    props.dispatch(
      unFollowUserStart({
        user_id: user_id,
      })
    );
  };

  const handleStar = (event, user_id, status) => {
    event.preventDefault();
    setStarStatus(status);
    props.dispatch(
      saveFavStart({
        user_id: user_id,
      })
    );
  };

  const handleChatUser = (event, user_id) => {
    event.preventDefault();
    props.dispatch(
      saveChatUserStart({
        from_user_id: localStorage.getItem("userId"),
        to_user_id: user_id,
      })
    );
  };

  const subscriptionPayment = (
    event,
    plan_type,
    amount,
    amount_formatted,
    is_free = 0
  ) => {
    event.preventDefault();
    setSubscriptionData({
      ...subscriptionData,
      is_free: is_free,
      plan_type: plan_type,
      amount: amount,
      amount_formatted: amount_formatted,
    });
    setPaymentModal(true);
  };

  const onCopy = (event) => {
    const notificationMessage = getSuccessNotificationMessage(
      "Link to profile was copied to clipboard!"
    );
    props.dispatch(createNotification(notificationMessage));
  };

  const { userDetails } = props;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const paypalOnError = (err) => {
    const notificationMessage = getErrorNotificationMessage(err);
    this.props.dispatch(createNotification(notificationMessage));
  };

  const paypalOnCancel = (data) => {
    const notificationMessage = getErrorNotificationMessage(
      "Payment cancelled please try again.."
    );
    this.props.dispatch(createNotification(notificationMessage));
  };

  const { t } = props;

  return (
    <>
      <div className="my-profile user-profile-page model-view-profile-sec scroll-to-top">
        <Container>
          <Row>
            {userDetails.loading ? (
              t("loading")
            ) : (
              <Col sm={12} md={12}>
                <div className="cover-area">
                  <div className="profile-cover">
                    <Image
                      src={userDetails.data.user.cover ? (api.serviceUrl()+'/'+userDetails.data.user.cover) : (api.serviceUrl()+'/images/mysecrets_avatar_square_image.png')}
                      alt={userDetails.data.user.name}
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div className="top-left">
                    <Link to={"/home"} className="chat-header-back">
                      <Image
                        src={
                          window.location.origin +
                          "/assets/images/icons/back.svg"
                        }
                        className="svg-clone"
                      />
                    </Link>
                    <h1 className="chat-page-title">
                      {userDetails.data.user.name}
                      {"  "}
                      {userDetails.data.user.is_verified_badge == 1 ? (
                        <div className="pl-2">
                          <VerifiedBadgeNoShadow />
                        </div>
                      ) : null}
                    </h1>
                    <span className="post-count">
                      {userDetails.data.user.total_posts} {t("post")}
                    </span>
                  </div>
                </div>

                <VideoScheduleModal
                  videoSchedule={videoSchedule}
                  closeVideoScheduleModal={closeVideoScheduleModal}
                  userId = {userDetails.data.user.user_id}
                  price = {(userDetails.data.user.videocall_price)?userDetails.data.user.videocall_price:0}
                  paypalOnCancel={paypalOnCancel}
                  paypalOnError={paypalOnError}
                />

                <div className="profile--user">
                  <span className="my-profile-status">
                    <Image src={userDetails.data.user.picture ? (api.serviceUrl()+'/'+userDetails.data.user.picture) : (api.serviceUrl()+'/images/mysecrets_avatar_square_image.png')} />
                  </span>
                  <div className="profile-btn-group">

                    {(userDetails.data.call_enable)?
                      <Button
                        type="button"
                        className="g-btn m-rounded m-border m-icon m-icon-only m-colored has-tooltip"
                        onClick={() => setVideoSchedule(true)}
                      >
                        <Image
                          src="assets/images/icons/video.svg"
                          className="svg-clone"
                        />
                      </Button>
                    :
                      <div></div>
                    }
                    
                    <Button
                      type="button"
                      className="g-btn m-rounded m-border m-icon m-icon-only m-colored has-tooltip"
                      onClick={() => setSendTip(true)}
                    >
                      <Image
                        src={
                          window.location.origin +
                          "/assets/images/icons/tip.svg"
                        }
                        className="svg-clone"
                      />
                    </Button>
                    {localStorage.getItem("is_face")  == 1 ? (
                              <>
                    <Button
                      type="button"
                      className="g-btn m-rounded m-border m-icon m-icon-only m-colored has-tooltip"
                      onClick={(event) =>
                        handleChatUser(event, userDetails.data.user.user_id)
                      }
                    >
                      <Image
                        src={
                          window.location.origin +
                          "/assets/images/icons/message.svg"
                        }
                        className="svg-clone"
                      />
                    </Button>
                    </>) : ''}

                    {starStatus !== "" ? (
                      <>
                        <>
                          {starStatus === "added" ? (
                            <Button
                              type="button"
                              className="g-btn m-rounded m-border m-icon m-icon-only m-colored has-tooltip"
                              onClick={(event) =>
                                handleStar(
                                  event,
                                  userDetails.data.user.user_id,
                                  "removed"
                                )
                              }
                            >
                              <Image
                                src={
                                  window.location.origin +
                                  "/assets/images/icons/star-active.svg"
                                }
                                className="svg-clone"
                              />
                            </Button>
                          ) : null}
                        </>
                        <>
                          {starStatus === "removed" ? (
                            <Button
                              type="button"
                              className="g-btn m-rounded m-border m-icon m-icon-only m-colored has-tooltip"
                              onClick={(event) =>
                                handleStar(
                                  event,
                                  userDetails.data.user.user_id,
                                  "added"
                                )
                              }
                            >
                              <Image
                                src={
                                  window.location.origin +
                                  "/assets/images/icons/star.svg"
                                }
                                className="svg-clone"
                              />
                            </Button>
                          ) : null}
                        </>
                      </>
                    ) : userDetails.data.is_favuser == 1 ? (
                      <Button
                        type="button"
                        className="g-btn m-rounded m-border m-icon m-icon-only m-colored has-tooltip"
                        onClick={(event) =>
                          handleStar(
                            event,
                            userDetails.data.user.user_id,
                            "removed"
                          )
                        }
                      >
                        <Image
                          src={
                            window.location.origin +
                            "/assets/images/icons/star-active.svg"
                          }
                          className="svg-clone"
                        />
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        className="g-btn m-rounded m-border m-icon m-icon-only m-colored has-tooltip"
                        onClick={(event) =>
                          handleStar(
                            event,
                            userDetails.data.user.user_id,
                            "added"
                          )
                        }
                      >
                        <Image
                          src={
                            window.location.origin +
                            "/assets/images/icons/star.svg"
                          }
                          className="svg-clone"
                        />
                      </Button>
                    )}
                    <CopyToClipboard
                      text={window.location.origin+'/'+userDetails.data.user.share_link}
                      onCopy={onCopy}
                    >
                      <Button
                        type="button"
                        className="g-btn m-rounded m-border m-icon m-icon-only m-colored has-tooltip"
                      >
                        <Image
                          src={
                            window.location.origin +
                            "/assets/images/icons/share.svg"
                          }
                          className="svg-clone"
                        />
                      </Button>
                    </CopyToClipboard>
                  </div>
                  <div className="my-profile-names">
                    <div className="user-name-base-row">
                      <Link
                        to={`/` + userDetails.data.user.user_unique_id}
                        className="my-name-lg"
                      >
                        <div className="g-user--name">
                          {userDetails.data.user.name}{" "}
                          {userDetails.data.user.is_verified_badge == 1 ? (
                            <div className="pl-2">
                              <VerifiedBadgeNoShadow />
                            </div>
                          ) : null}
                        </div>
                      </Link>
                    </div>
                    <div className="user-id-row-base">
                      <Link
                        to={`/` + userDetails.data.user.user_unique_id}
                        className="user-my-id-text"
                      >
                        <div className="current-user--name">
                          @{userDetails.data.user.username}
                        </div>
                      </Link>
                      <div className="user-profile -active-status mt-1">
                        <span>{userDetails.data.user.updated_formatted}</span>
                      </div>
                    </div>
                  </div>
                </div>
                {userDetails.data.user.website ||
                userDetails.data.user.address ||
                userDetails.data.user.amazon_wishlist ||
                userDetails.data.user.about != "null" ? (
                  <div className="profile-about-content">
                    <p className="my-profile-about">
                      {userDetails.data.user.about != "null" ? (
                        <div className="ml-1">
                          {userDetails.data.user.about}
                        </div>
                      ) : (
                        ""
                      )}

                      <p className="">
                        <div className="profile-links">
                          {userDetails.data.user.address ? (
                            <span>
                              <i className="fas fa-map-marker-alt"></i>{" "}
                              {userDetails.data.user.address}
                            </span>
                          ) : null}
                        </div>

                        <div className="profile-links">
                          {userDetails.data.user.website ? (
                            <span>
                              <i className="fa fa-link"></i>{" "}
                              <a
                                href={userDetails.data.user.website}
                                rel="noopener noreferrer"
                                target="_blank"
                                className="profile-a"
                              >
                                {userDetails.data.user.website.replace(
                                  /(^\w+:|^)\/\//,
                                  ""
                                )}
                              </a>
                            </span>
                          ) : null}
                        </div>
                        <div className="profile-links">
                          {userDetails.data.user.amazon_wishlist ? (
                            <span>
                              <i className="fa fa-gift"></i>{" "}
                              <a
                                href={userDetails.data.user.amazon_wishlist}
                                rel="nofollow"
                                target="_blank"
                                className="profile-a"
                              >
                                {userDetails.data.user.amazon_wishlist.replace(
                                  /(^\w+:|^)\/\//,
                                  ""
                                )}
                              </a>
                            </span>
                          ) : null}
                        </div>
                        <div className="profile-links">
                          {userDetails.data.user.instagram_link ? (
                            <span className="s-icon">
                              <a
                                href={userDetails.data.user.instagram_link}
                                rel="nofollow"
                                target="_blank"
                                className="profile-a"
                              >
                                <img
                                  src={
                                    window.location.origin +
                                    "/assets/social/instagram.svg"
                                  }
                                  className="s_icon_16"
                                />
                                {/* {userDetails.data.user.instagram_link} */}
                              </a>
                            </span>
                          ) : null}

                          {userDetails.data.user.facebook_link ? (
                            <span className="s-icon">
                              <a
                                href={userDetails.data.user.facebook_link}
                                rel="nofollow"
                                target="_blank"
                                className="profile-a"
                              >
                                <img
                                  src={
                                    window.location.origin +
                                    "/assets/social/facebook.svg"
                                  }
                                  className="s_icon_16"
                                />{" "}
                                {/* {userDetails.data.user.facebook_link} */}
                              </a>
                            </span>
                          ) : null}

                          {userDetails.data.user.twitter_link ? (
                            <span className="s-icon">
                              <a
                                href={userDetails.data.user.twitter_link}
                                rel="nofollow"
                                target="_blank"
                                className="profile-a"
                              >
                                <img
                                  src={
                                    window.location.origin +
                                    "/assets/social/twitter.svg"
                                  }
                                  className="s_icon_16"
                                />{" "}
                                {/* {userDetails.data.user.twitter_link} */}
                              </a>
                            </span>
                          ) : null}
                          {userDetails.data.user.snapchat_link ? (
                            <span className="s-icon">
                              <a
                                href={userDetails.data.user.snapchat_link}
                                rel="nofollow"
                                target="_blank"
                                className="profile-a"
                              >
                                <img
                                  src={
                                    window.location.origin +
                                    "/assets/social/snapchat.svg"
                                  }
                                  className="s_icon_16"
                                />{" "}
                                {/* {userDetails.data.user.twitter_link} */}
                              </a>
                            </span>
                          ) : null}
                          {userDetails.data.user.youtube_link ? (
                            <span className="s-icon">
                              <a
                                href={userDetails.data.user.youtube_link}
                                rel="nofollow"
                                target="_blank"
                                className="profile-a"
                              >
                                <img
                                  src={
                                    window.location.origin +
                                    "/assets/social/youtube.svg"
                                  }
                                  className="s_icon_16"
                                />{" "}
                                {/* {userDetails.data.user.youtube_link} */}
                              </a>
                            </span>
                          ) : null}
                          {userDetails.data.user.linkedin_link ? (
                            <span className="s-icon">
                              <a
                                href={userDetails.data.user.linkedin_link}
                                rel="nofollow"
                                target="_blank"
                                className="profile-a"
                              >
                                <img
                                  src={
                                    window.location.origin +
                                    "/assets/social/linkedin.svg"
                                  }
                                  className="s_icon_16"
                                />{" "}
                                {/* {userDetails.data.user.linkedin_link} */}
                              </a>
                            </span>
                          ) : null}
                          {userDetails.data.user.pinterest_link ? (
                            <span className="s-icon">
                              <a
                                href={userDetails.data.user.pinterest_link}
                                rel="nofollow"
                                target="_blank"
                                className="profile-a"
                              >
                                <img
                                  src={
                                    window.location.origin +
                                    "/assets/social/pinterest.svg"
                                  }
                                  className="s_icon_16"
                                />{" "}
                                {/* {userDetails.data.user.pinterest_link} */}
                              </a>
                            </span>
                          ) : null}

                          {userDetails.data.user.twitch_link ? (
                            <span className="s-icon">
                              <a
                                href={userDetails.data.user.twitch_link}
                                rel="nofollow"
                                target="_blank"
                                className="profile-a"
                              >
                                <img
                                  src={
                                    window.location.origin +
                                    "/assets/social/twitch.svg"
                                  }
                                  className="s_icon_16"
                                />{" "}
                                {/* {userDetails.data.user.twitch_link} */}
                              </a>
                            </span>
                          ) : null}
                        </div>
                      </p>
                    </p>
                  </div>
                ) : null}

                {userDetails.data.is_block_user == 0 ? (
                  <>
                    {userDetails.data.payment_info.is_user_needs_pay == 1 &&
                    userDetails.data.payment_info.unsubscribe_btn_status ==
                      0 ? (
                      userDetails.data.payment_info.is_free_account == 0 ? (
                        <>
                          <div className="subscription-section">
                            <span className="subscribe-title">
                              {t("monthly_subscription")}{" "}
                            </span>
                            {localStorage.getItem("is_face")  == 1 ? (
                              <>
                            {localStorage.getItem("user_wallet_remaining") < userDetails.data.payment_info.subscription_info.monthly_amount ? (
                                <Button
                                  to=""
                                  className="g-btn m-rounded m-border m-uppercase m-flex m-fluid-width m-profile user-follow"
                                  onClick={(event) =>
                                    handleWalletAlert(event)
                                  }
                                >
                                  {(userDetails.data.payment_info.subscription_info.monthly_amount > 0) ? (t("subscribe_for") + " " + userDetails.data.payment_info.subscription_info.monthly_amount_formatted) : (t("subscribe_for_free"))}
                                </Button>
                              ) : (
                                <Button
                                  to=""
                                  className="g-btn m-rounded m-border m-uppercase m-flex m-fluid-width m-profile user-follow"
                                  onClick={(event) => ((userDetails.data.payment_info.subscription_info.monthly_amount > 0) ?
                                    subscriptionPayment(
                                      event,
                                      "months",
                                      userDetails.data.payment_info
                                        .subscription_info.monthly_amount,
                                      userDetails.data.payment_info
                                        .subscription_info.monthly_amount_formatted
                                    ) : props.dispatch(
                                      subscriptionPaymentStripeStart({
                                        user_unique_id:
                                          userDetails.data.user.user_unique_id,
                                        plan_type: "months",
                                        is_free: 0,
                                      })
                                    )
                                  )}
                                >
                                  {(userDetails.data.payment_info.subscription_info.monthly_amount > 0) ? (t("subscribe_for") + " " + userDetails.data.payment_info.subscription_info.monthly_amount_formatted) : (t("subscribe_for_free"))}
                                </Button>
                              )
                            }
                            </>
                            ) : ''}
                          </div>
                          <div className="subscription-section">
                            <span className="subscribe-title">
                              {t("yearly_subscription")}{" "}
                            </span>
                            {localStorage.getItem("is_face")  == 1 ? (
                              <>
                            { localStorage.getItem("user_wallet_remaining") < userDetails.data.payment_info.subscription_info.yearly_amount ? (
                                <Button
                                  to=""
                                  className="g-btn m-rounded m-border m-uppercase m-flex m-fluid-width m-profile user-follow"
                                  onClick={(event) =>
                                    handleWalletAlert(event)
                                  }
                                >
                                  {(userDetails.data.payment_info.subscription_info.yearly_amount > 0) ? (t("subscribe_for") + " " + userDetails.data.payment_info.subscription_info.yearly_amount_formatted) : (t("subscribe_for_free"))}
                                </Button>
                              ) : (
                                <Button
                                  to=""
                                  className="g-btn m-rounded m-border m-uppercase m-flex m-fluid-width m-profile user-follow"
                                  onClick={(event) => ((userDetails.data.payment_info.subscription_info.yearly_amount > 0) ?
                                    subscriptionPayment(
                                      event,
                                      "years",
                                      userDetails.data.payment_info
                                        .subscription_info.yearly_amount,
                                      userDetails.data.payment_info
                                        .subscription_info.yearly_amount_formatted
                                    ) : props.dispatch(
                                      subscriptionPaymentStripeStart({
                                        user_unique_id:
                                          userDetails.data.user.user_unique_id,
                                        plan_type: "years",
                                        is_free: 0,
                                      })
                                    )
                                  )}
                                >
                                  {(userDetails.data.payment_info.subscription_info.yearly_amount > 0) ? (t("subscribe_for") + " " + userDetails.data.payment_info.subscription_info.yearly_amount_formatted) : (t("subscribe_for_free"))}
                                </Button>
                              )
                            }
                             </>
                            ) : ''}
                          </div>
                        </>
                      ) : (
                        <div className="subscription-section">
                          <Button
                            to=""
                            className="g-btn m-rounded m-border m-uppercase m-flex m-fluid-width m-profile user-follow"
                            onClick={(event) =>
                              props.dispatch(
                                subscriptionPaymentStripeStart({
                                  user_unique_id:
                                    userDetails.data.user.user_unique_id,
                                  plan_type: "months",
                                  is_free: 0,
                                })
                              )
                            }
                            // onClick={(event) =>
                            //   subscriptionPayment(
                            //     event,
                            //     "month",
                            //     userDetails.data.payment_info.subscription_info
                            //       .monthly_amount,
                            //     userDetails.data.payment_info.subscription_info
                            //       .monthly_amount_formatted,
                            //     1
                            //   )
                            // }
                          >
                            {userDetails.data.payment_info.payment_text}
                          </Button>
                        </div>
                      )
                    ) : (
                      ""
                    )}

                    {userDetails.data.payment_info.unsubscribe_btn_status ==
                    1 ? (
                      <>
                        <div className="subscription-section">
                          <Button
                            className="g-btn m-rounded m-border m-uppercase m-flex m-fluid-width m-profile user-follow"
                            onClick={handleUnfollowModalShow}
                          >
                            {t("following")}
                          </Button>
                        </div>

                        <Modal
                          show={showUnfollow}
                          onHide={handleUnfollowModalClose}
                          backdrop="static"
                          keyboard={false}
                          centered
                        >
                          <Modal.Header closeButton>
                            <Modal.Title>{t("unsubscribe")}</Modal.Title>
                          </Modal.Header>
                          <Modal.Body className="">
                            {t("cancel_subscription_conformation")}
                          </Modal.Body>
                          <Modal.Footer>
                            <Button
                              variant="secondary"
                              size="lg"
                              onClick={handleUnfollowModalClose}
                            >
                              {t("close")}
                            </Button>
                            <Button
                              variant="primary"
                              size="lg"
                              onClick={(event) =>
                                handleUnfollow(
                                  event,
                                  userDetails.data.user.user_id
                                )
                              }
                            >
                              {t("yes")}
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </>
                    ) : null}
                  </>
                ) : (
                  <div className="subscription-section">
                    <Link
                      to=""
                      className="g-btn m-rounded m-border m-uppercase m-flex m-fluid-width m-profile user-follow"
                      onClick={(event) =>
                        handleBlockUser(
                          event,
                          "unblocked",
                          userDetails.data.user.user_id
                        )
                      }
                    >
                      {t("unblock_user")}
                    </Link>
                  </div>
                )}

                <div className="tab" role="tabpanel">
                  <ModelProfileTabSec
                    activeSec={activeSec}
                    setActiveSec={setActiveSec}
                    setActiveSection={setActiveSection}
                    userDetails={props.userDetails}
                  />

                  <div className="tab-content tabs">
                    <ModelProfilePostSec
                      activeSec={activeSec}
                      setActiveSec={setActiveSec}
                      userPosts={props.userPosts}
                      scrollToTop={scrollToTop}
                      otherUserUniquId={props.match.params.username}
                      noMoreData={noMoreData}
                      isFetching={isFetching}
                    />

                    <ModelProfilePhotoSec
                      activeSec={activeSec}
                      setActiveSec={setActiveSec}
                      userPosts={props.userPosts}
                      otherUserUniquId={props.match.params.username}
                      noMoreData={noMoreData}
                      isFetching={isFetching}
                    />

                    <ModelProfileVideoSec
                      activeSec={activeSec}
                      setActiveSec={setActiveSec}
                      userPosts={props.userPosts}
                      otherUserUniquId={props.match.params.username}
                      noMoreData={noMoreData}
                      isFetching={isFetching}
                    />
                  {(props.userDetails.loading)?
                    ""
                  :
                    (props.userDetails.data.user.show_address==1 && props.userDetails.data.user.latitude && props.userDetails.data.user.longitude) ?
                      <ModelProfileMapSec
                        activeSec={activeSec}
                        setActiveSec={setActiveSec}
                        userDetails={props.userDetails}
                        otherUserUniquId={props.match.params.username}
                        noMoreData={noMoreData}
                        isFetching={isFetching}
                      />
                    :
                      ""
                  }
                  </div>
                </div>
              </Col>
            )}
          </Row>
        </Container>
      </div>
      {userDetails.loading ? (
        t("loading")
      ) : (
        <WalletBalanceAlertModal
          walletAlert={walletAlert}
          closeWalletAlertModal={closeWalletAlertModal}
        />
      )}

      {userDetails.loading ? (
        t("loading")
      ) : (
        <SendTipModal
          sendTip={sendTip}
          closeSendTipModal={closeSendTipModal}
          username={props.userDetails.data.user.username}
          userPicture={props.userDetails.data.user.picture}
          name={props.userDetails.data.user.name}
          post_id={null}
          user_id={props.userDetails.data.user.user_id}
        />
      )}

      {userDetails.loading ? (
        t("loading")
      ) : (
        <PaymentModal
          subscrptionPayment={subscrptionPayment}
          closePaymentModal={closePaymentModal}
          userPicture={props.userDetails.data.user.picture}
          name={props.userDetails.data.user.name}
          user_unique_id={props.userDetails.data.user.user_unique_id}
          subscriptionData={subscriptionData}
          username={props.userDetails.data.user.username}
        />
      )}
    </>
  );
};

const mapStateToPros = (state) => ({
  comments: state.comment.comments,
  chat: state.chat,
  userDetails: state.otherUser.userDetails,
  userPosts: state.otherUser.userPosts,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(withNamespaces()(ModelViewProfile));
