import React from "react";
import { Link } from "react-router-dom";
import { Image, Media } from "react-bootstrap";
import { withNamespaces } from 'react-i18next';

const FollowingTabSec = (props) => {

  const { t } = props;

  return (
    <ul className="nav nav-tabs following-tab-sec" role="tablist">
      <Media
        as="li"
        role="presentation"
        className={props.activeSec === "active-sec" ? "active" : ""}
      >
        <Link
          to="#active"
          aria-controls="home"
          role="tab"
          data-toggle="tab"
          onClick={(event) => props.changeSection(event, "active-sec")}
        >
          <Image
            src="/assets/images/icons/tick-circle.svg"
            className="svg-clone"
          />
          <span className="tab-nav-item"> {t("active")} </span>
        </Link>
      </Media>
      <Media
        as="li"
        role="presentation"
        className={props.activeSec === "expired-sec" ? "active" : ""}
      >
        <Link
          to="#expired"
          aria-controls="profile"
          role="tab"
          data-toggle="tab"
          onClick={(event) => props.changeSection(event, "expired-sec")}
        >
          <Image src="/assets/images/icons/warning.svg" className="svg-clone" />
          <span className="tab-nav-item"> {t("unsubscribed")} </span>
        </Link>
      </Media>
      <Media
        as="li"
        role="presentation"
        className={props.activeSec === "all-sec" ? "active" : ""}
      >
        <Link
          to="#all"
          aria-controls="messages"
          role="tab"
          data-toggle="tab"
          onClick={(event) => props.changeSection(event, "all-sec")}
        >
          <Image src="/assets/images/icons/all.svg" className="svg-clone" />
          <span className="tab-nav-item"> {t("all")} </span>
        </Link>
      </Media>
    </ul>
  );
};

export default withNamespaces()(FollowingTabSec);
