import React from "react";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import NoDataFound from "../NoDataFound/NoDataFound";
import VerifiedBadgeNoShadow from "../Handlers/VerifiedBadgeNoShadow";
import { withNamespaces } from "react-i18next";
import api from "../../Environment";

const NotificationAllSec = (props) => {
  const { notifications } = props;
  const { t } = props;

  return (
    <>
      <div
        role="tabpanel"
        className={
          props.activeSec === "notify-all-sec"
            ? "tab-pane fade in active"
            : "tab-pane fade"
        }
        id="Section1"
      >
        <h3 className="notify-title">{t("all")}</h3>
        <div className="notification-list">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div className="notify-item">
                <div className="post-header">
                  <div className="alignleft">
                    <a
                      className="title-container"
                      href={notification.action_url}
                      target="_blank"
                    >
                      <Image
                        src={notification.from_userpicture ? (api.serviceUrl()+'/'+notification.from_userpicture) : (api.serviceUrl()+'/images/mysecrets_avatar_square_image.png')}
                        className="user-image img-responsive notification-user-img "
                      />
                      <div className="user-name">
                        <span className="post-user-name">
                          {notification.from_displayname}{" "}
                          {notification.from_user.is_verified_badge == 1 ? (
                            <div className="pl-2">
                            <VerifiedBadgeNoShadow/>
                          </div>
                          ) : null}
                          <span className="user-id">
                            <Link
                              target="_blank"
                              to={(notification.from_user_id==notification.to_user_id)?'/profile':notification.from_username}
                            >
                              @{notification.from_username}
                            </Link>
                          </span>
                        </span>
                        <span className="post-user-notify">
                          {notification.message}
                        </span>
                        <span className="post-user-notify-date">
                          {notification.updated_formatted}
                        </span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <NoDataFound></NoDataFound>
          )}
        </div>
      </div>
    </>
  );
};

export default withNamespaces()(NotificationAllSec);
