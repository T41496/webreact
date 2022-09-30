import React from "react";
import { Link } from "react-router-dom";
import {Image, Media} from "react-bootstrap";
import { withNamespaces } from "react-i18next";

const NotificationTabSec = (props) => {
    const { t } = props;
  return (
    <div className="tabbable-line notify-sec">
        <ul className="nav nav-tabs" role="tablist">
        <Media as="li"
            role="presentation"
            className={props.activeSec === "notify-all-sec" ? "active" : ""}
        >
            <Link
            to="#Section1"
            aria-controls="home"
            role="tab"
            data-toggle="tab"
            onClick={() => props.setActiveSec("notify-all-sec")}
            >
                <span>
                    <Image src="/assets/images/icons/all.svg" className="svg-clone" />
                </span>
                {t("all")}
            </Link>
        </Media>
        <Media as="li"
            role="presentation"
            className={props.activeSec === "interactions-sec" ? "active" : ""}
        >
            <Link
            to="#Section2"
            aria-controls="profile"
            role="tab"
            data-toggle="tab"
            onClick={() => props.setActiveSec("interactions-sec")}
            >
               <span>
                    <Image src="/assets/images/icons/comment.svg" className="svg-clone" />
                </span>
                {t("interactions")}
            </Link>
        </Media>
        <Media as="li"
            role="presentation"
            className={props.activeSec === "liked-sec" ? "active" : ""}
        >
            <Link
            to="#Section3"
            aria-controls="messages"
            role="tab"
            data-toggle="tab"
            onClick={() => props.setActiveSec("liked-sec")}
            >
                <span>
                    <Image src="/assets/images/icons/heart.svg" className="svg-clone" />
                </span>
                {t("liked")}
            </Link>
        </Media>
        <Media as="li"
            role="presentation"
            className={props.activeSec === "subscribed-sec" ? "active" : ""}
        >
            <Link
            to="#Section4"
            aria-controls="messages"
            role="tab"
            data-toggle="tab"
            onClick={() => props.setActiveSec("subscribed-sec")}
            >
                <span>
                    <Image src="/assets/images/icons/unlock.svg" className="svg-clone" />
                </span>
                {t("subscribed")}
            </Link>
        </Media>
        <Media as="li"
            role="presentation"
            className={props.activeSec === "tipped-sec" ? "active" : ""}
        >
            <Link
            to="#Section5"
            aria-controls="messages"
            role="tab"
            data-toggle="tab"
            onClick={() => props.setActiveSec("tipped-sec")}
            >
                <span>
                    <Image src="/assets/images/icons/tip.svg" className="svg-clone" />
                </span>
                {t("tipped")}
            </Link>
        </Media>
        <Media as="li"
            role="presentation"
            className={props.activeSec === "promotions-sec" ? "active" : ""}
        >
            <Link
            to="#Section6"
            aria-controls="messages"
            role="tab"
            data-toggle="tab"
            onClick={() => props.setActiveSec("promotions-sec")}
            >
                <span>
                    <img src="/assets/images/icons/warning.svg" className="svg-clone" />
                </span>
                {t("promotions")}
            </Link>
        </Media>
        </ul>
    </div>
  );
};

export default withNamespaces()(NotificationTabSec);
