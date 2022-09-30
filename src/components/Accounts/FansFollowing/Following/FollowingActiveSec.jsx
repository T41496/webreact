import React from "react";
import { Link } from "react-router-dom";
import { Row } from "react-bootstrap";
import UserCard from "../UserCard";
import { withNamespaces } from 'react-i18next';
import NoDataFound from "../../../NoDataFound/NoDataFound";

const FollowingActiveSec = (props) => {

  const { t } = props;

  return (
    <>
      <div
        role="tabpanel"
        className={
          props.activeSec === "active-sec"
            ? "tab-pane fade in active"
            : "tab-pane fade"
        }
        id="active"
      >
        {props.following.loading ? (
          t("loading")
        ) : (
          <>
            <div className="bookmarkes-list bookmarks-right-side">
              <div className="pull-left">
                <Link className="bookmarkes-list" to="#">
                  <span className="mr-2">
                    {props.following.data.total
                      ? props.following.data.total
                      : 0}{" "}
                  </span>{" "}
                  {t("active")}
                </Link>
              </div>
            </div>
            <Row>
              {props.following.data.followers.length > 0 ? (
                props.following.data.followers.map((follower) =>
                  follower.otherUser ? (
                    <UserCard user={follower.otherUser} />
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
    </>
  );
};

export default withNamespaces()(FollowingActiveSec);
