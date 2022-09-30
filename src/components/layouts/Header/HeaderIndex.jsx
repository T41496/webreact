import React, { useEffect, useState, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { Container, Image, Media, Button, Badge } from "react-bootstrap";
import configuration from "react-global-configuration";
import VerifiedBadgeNoShadow from "../../Handlers/VerifiedBadgeNoShadow";
// import SideBarIndex from "../SideBar/SideBarIndex";
import io from "socket.io-client";

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from "react-bootstrap/DropdownButton";

import {
  updateNotificationCount,
} from "../../../store/actions/NotificationAction";
import Alert from 'react-bootstrap/Alert';
import { connect } from "react-redux";
import { withNamespaces } from "react-i18next";
import api from "../../../Environment";
import {
  fetchUserDetailsStart,
} from "../../../store/actions/UserAction";
let chatSocket;


const HeaderIndex = (props) => {
 
  const [chatCount, setChatCount] = useState(0);
  const [bellCount, setBellCount] = useState(0);
  

  useEffect(() => {
    let chatSocketUrl = configuration.get("configData.chat_socket_url");
    if (chatSocketUrl === "") {
      
      console.log('no keys configured');
    }
    if (configuration.get("configData.is_notification_count_enabled") == 0) {
      
      chatSocketConnect();
    }
    if (localStorage.getItem("userId")) {
      console.log("1***************",configuration.get("configData.is_notification_count_enabled"))
      props.dispatch(fetchUserDetailsStart());
    }
    setInterval(() => {
      if (localStorage.getItem("userId") && window.location.pathname != "/edit-profile") {
        props.dispatch(fetchUserDetailsStart());
      }
    }, 10000);
  }, []);

  const chatSocketConnect = () => {
    // check the socket url is configured
    let chatSocketUrl = configuration.get("configData.chat_socket_url");
    
    

    if (chatSocketUrl) {
      chatSocket = io(chatSocketUrl, {
        query:
          `commonid:'user_id_` +
          localStorage.getItem("userId") +
          `',myid:` +
          localStorage.getItem("userId"),
      });
      chatSocket.emit("notification update", {
        commonid:
          "user_id_" +
          localStorage.getItem("userId"),
        myid: localStorage.getItem("userId"),
      });
      if (localStorage.getItem("socket") == "true") {
        
        chatSocket.on("notification", (newData) => {
          console.log(" configuration ***&KJJ => ", configuration.get("configData.chat_socket_url"));
          console.log("hi*****************************KJJ", newData);
          setChatCount(newData.chat_notification);
          setBellCount(newData.bell_notification);
        });
      } else {
        console.log(false);
        chatSocket.disconnect();
      }
    }
  };

  const [isVisible, setIsVisible] = useState(false);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          // alert("You clicked outside of me!");
          setIsVisible(false);
        }
      }

      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  console.log("KJJ-Bellnotification => ", bellCount)

  const { t } = props;
  return (
    <>
      {localStorage.getItem("userId") ? (
        <header className="main-header">
          <Container>
            <nav className="main-header-menu">
              <Link
                to={"/home"}
                className="main-header-menu icon-with-round-hover m-current"
                onClick={() => setIsVisible(false)}
              >
                <Image
                  src={window.location.origin + "/assets/images/icons/home.svg"}
                />
              </Link>
              <Link
                to={"/notification"}
                className="main-header-menu icon-with-round-hover"
                active-classname="m-current"
                exact-active-classname=""
                onClick={() => setIsVisible(false)}
              >
                <Image
                  src={
                    window.location.origin +
                    "/assets/images/icons/notification.svg"
                  }
                />
                {(props.profile.data.bell_notification) > 0 ?
                  <Badge variant="light" className="badge-notify">{(props.profile.data.bell_notification)}</Badge>
                  :
                  ""
                }
              </Link>

              <Link
                to={"/liveStreamCreate"}
                className="main-header-menu icon-with-round-hover"
                onClick={() => setIsVisible(false)}
              >
                <Image
                  src={
                    window.location.origin +
                    "/assets/images/icons/video.svg"
                  }
                />
              </Link>

              <Link
                to={"/posts-create"}
                className="main-header-menu icon-with-round-hover"
                onClick={() => setIsVisible(false)}
              >
                <Image
                  src={
                    window.location.origin +
                    "/assets/images/icons/create-post.svg"
                  }
                />
              </Link>

              <Link
                to={"/user_map_view"}
                className="main-header-menu icon-with-round-hover"
                onClick={() => setIsVisible(false)}
              >
                <Image
                  src={
                    window.location.origin + "/assets/images/icons/map.svg"
                  }
                  style={{ "width": "26px" }}
                />
              </Link>

              <Link
                to={"/inbox"}
                className="main-header-menu icon-with-round-hover"
                onClick={() => setIsVisible(false)}
              >
                <Image
                  src={window.location.origin + "/assets/images/icons/chat.svg"}
                />
                  {props.profile.data.chat_notification > 0 ?
                  <Badge variant="light" className="badge-notify">{props.profile.data.chat_notification}</Badge>
                  :
                  ""
                }
              </Link>

              <Button
                type="button"
                className="main-header-menu icon-with-round-hover"
                to="#"
                data-drawer-trigger
                aria-controls="drawer-name"
                aria-expanded="false"
                onClick={() => setIsVisible(!isVisible)}
              >
                <Image
                  src={window.location.origin + "/assets/images/icons/user.svg"}
                />
              </Button>
            </nav>
          </Container>
        </header>
      ) : (
        <header className="main-header">
          <Container>
            <nav className="main-header-menu">
              <Link
                to={"/"}
                className="main-header-menu icon-with-round-hover m-current"
                onClick={() => setIsVisible(false)}
              >
                <Image
                  src={window.location.origin + "/assets/images/icons/home.svg"}
                />
              </Link>
            </nav>
          </Container>setIsVisible
        </header>
      )}
      {isVisible && localStorage.getItem("userId") ? (
        <div className="drawer" id="drawer-name" data-drawer-target>
          <div
            className="drawer__overlay"
            data-drawer-close
            tabindex="-1"
          ></div>
          <div className="drawer__wrapper" ref={wrapperRef}>
            <div className="drawer__header">
              <div className="drawer__title">
                <Link to="#" className="l-sidebar__avatar" data-name="Profile">
                  <span className="sidebar-hamburger-user-profile">
                    <Image
                      src={(localStorage.getItem("user_picture") != 'null') ? (api.serviceUrl() + '/' + localStorage.getItem("user_picture")) : (api.serviceUrl() + '/images/mysecrets_avatar_square_image.png')}
                      alt={localStorage.getItem("username")}
                    />
                  </span>
                  <span onClick={() => setIsVisible(!isVisible)}>
                    {" "}
                    <i className="material-icons add-icon">clear</i>
                  </span>
                </Link>
                <div className="pull-left side-user-head">
                  <Link
                    to={"/profile"}
                    onClick={() => setIsVisible(!isVisible)}
                  >
                    <h3 className="g-user-name">
                      {localStorage.getItem("name")} {"  "}
                      {localStorage.getItem("is_verified_badge") == 1 ? (
                        <div className="pl-2">
                          <VerifiedBadgeNoShadow />
                        </div>
                      ) : null}
                    </h3>
                    <span className="user-id">
                      @{localStorage.getItem("username")}
                    </span>
                  </Link>

                  <ul className="list-inline">
                    <Media as="li">
                      <Link to={"/fans"} onClick={() => setIsVisible(false)}>
                        <span className="fans-follow">
                          {localStorage.getItem("total_followers")
                            ? localStorage.getItem("total_followers")
                            : 0}
                        </span>{" "}
                        {t("fans")}
                      </Link>
                    </Media>
                    <Media as="li">
                      <Link
                        to={"/following"}
                        onClick={() => setIsVisible(false)}
                      >
                        <span className="fans-follow">
                          {localStorage.getItem("total_followings")
                            ? localStorage.getItem("total_followings")
                            : 0}
                        </span>{" "}
                        {t("following")}
                      </Link>
                    </Media>
                  </ul>
                </div>

                {/* <div className="pull-right">
                  <span className="m-arrow">
                    <Image
                      src={
                        window.location.origin +
                        "/assets/images/icons/arrow-down.svg"
                      }
                      alt={configuration.get("configData.site_name")}
                    />
                  </span>
                </div> */}
              </div>
              {/* <Button
              className="drawer__close"
              data-drawer-close
              aria-label="Close Drawer"
            ></Button> */}
            </div>
            <div className="drawer__content">
              <div className="right-sidebar-menu-item">
                <Link
                  to={"/profile"}
                  className="sidebar-menus-item"
                  data-name="Profile"
                  onClick={() => setIsVisible(!isVisible)}
                >
                  <Image
                    src={
                      window.location.origin + "/assets/images/icons/user.svg"
                    }
                    alt={configuration.get("configData.site_name")}
                  />{" "}
                  {t("my_profile")}
                </Link>

                <Link
                  to={"/bookmarks"}
                  className="sidebar-menus-item"
                  data-name="Profile"
                  onClick={() => setIsVisible(!isVisible)}
                >
                  <Image
                    src={
                      window.location.origin +
                      "/assets/images/icons/bookmarks.svg"
                    }
                    alt={configuration.get("configData.site_name")}
                  />{" "}
                  {t("bookmarks")}
                </Link>

                <Link
                  to={"/streamList"}
                  className="sidebar-menus-item"
                  data-name="Profile"
                  onClick={() => setIsVisible(!isVisible)}
                >
                  <Image
                    src={
                      window.location.origin + "/assets/images/icons/lists.svg"
                    }
                    alt={configuration.get("configData.site_name")}
                  />{" "}
                  {t("livestream_lists")}
                </Link>

                <Link
                  to={"/callRequest"}
                  className="sidebar-menus-item"
                  data-name="Profile"
                  onClick={() => setIsVisible(!isVisible)}
                >
                  <Image
                    src={
                      window.location.origin + "/assets/images/icons/lists.svg"
                    }
                    alt={configuration.get("configData.site_name")}
                  />{" "}
                  {(props.profile.data.videocall_notification) > 0 ?
                  <Badge variant="light" className="badge-notify">{(props.profile.data.videocall_notification)}</Badge>
                  :
                  ""
                }
                  
                  {t("call_list")}
                </Link>

                <Link
                  to={"/list"}
                  className="sidebar-menus-item"
                  data-name="Profile"
                  onClick={() => setIsVisible(!isVisible)}
                >
                  <Image
                    src={
                      window.location.origin + "/assets/images/icons/lists.svg"
                    }
                    alt={configuration.get("configData.site_name")}
                  />{" "}
                  {t("lists")}
                </Link>

                <Link
                  to={"/edit-profile"}
                  className="sidebar-menus-item"
                  data-name="Profile"
                  onClick={() => setIsVisible(!isVisible)}
                >
                  <Image
                    src={
                      window.location.origin +
                      "/assets/images/icons/settings.svg"
                    }
                    alt={configuration.get("configData.site_name")}
                  />{" "}
                  {t("settings")}
                </Link>

                <hr className="sidebar-menu-divider" />

                <Link
                  to={"/cards"}
                  className="sidebar-menus-item"
                  data-name="Profile"
                  onClick={() => setIsVisible(!isVisible)}
                >
                  <Image
                    src={
                      window.location.origin + "/assets/images/icons/card.svg"
                    }
                    alt="Your Cards"
                  />{" "}
                  {t("your_cards")} <span className="desc">({t("to_subscribe")})</span>
                </Link>

                <Link
                  to={"/add-bank"}
                  className="sidebar-menus-item"
                  data-name="Profile"
                  onClick={() => setIsVisible(!isVisible)}
                >
                  <Image
                    src={
                      window.location.origin + "/assets/images/icons/bank.svg"
                    }
                    alt={configuration.get("configData.site_name")}
                  />{" "}
                  {t("add_bank")} <span className="desc">({t("to_earn")})</span>
                </Link>
                <Link
                  to={"/wallet"}
                  className="sidebar-menus-item"
                  data-name="Wallet"
                  onClick={() => setIsVisible(!isVisible)}
                >
                  <Image
                    src={
                      window.location.origin + "/assets/images/icons/wallet.svg"
                    }
                    alt={configuration.get("configData.site_name")}
                  />{" "}
                  {t("wallet")} <span className="desc">({t("earnings_and_deposits")})</span>
                </Link>
                <Link
                  to={"/stripe-connect"}
                  className="sidebar-menus-item"
                  data-name="StripeConnect"
                  onClick={() => setIsVisible(!isVisible)}
                >
                  <Image
                    src={
                      window.location.origin + "/assets/images/icons/stripe-connect.png"
                    }
                    alt={configuration.get("configData.site_name")}
                  />{" "}
                  {t("stripe_connect")}
                </Link>

                <hr className="sidebar-menu-divider" />

                <Link
                  to={`/page/help`}
                  className="sidebar-menus-item"
                  data-name="Profile"
                  onClick={() => setIsVisible(!isVisible)}
                >
                  <Image
                    src={
                      window.location.origin + "/assets/images/icons/help.svg"
                    }
                    alt={configuration.get("configData.site_name")}
                  />{" "}
                  {t("help_and_support")}
                </Link>
                <Link
                  to=""
                  className="sidebar-menus-item"
                  data-name="Profile"
                  onClick={() => setIsVisible(!isVisible)}
                  style={{ display: "none" }}
                >
                  <Image
                    src={
                      window.location.origin + "/assets/images/icons/dark.svg"
                    }
                    alt={configuration.get("configData.site_name")}
                  />{" "}
                  {t("dark_mode")}
                </Link>
                <hr className="sidebar-menu-divider" />
                <Link
                  to={"/logout"}
                  className="sidebar-menus-item"
                  data-name="Profile"
                  onClick={() => setIsVisible(!isVisible)}
                >
                  <Image
                    src={
                      window.location.origin + "/assets/images/icons/logout.svg"
                    }
                    alt={configuration.get("configData.site_name")}
                  />{" "}
                  {t("logout")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

const mapStateToPros = (state) => ({
  notifications: state.notification.notifications,
  profile: state.users.profile,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(withNamespaces()(HeaderIndex));