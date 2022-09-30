import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Col, Image } from "react-bootstrap";
import { connect } from "react-redux";
import { fetchBookmarksStart } from "../../store/actions/BookmarkAction";
import { withNamespaces } from "react-i18next";

const BookmarkNav = (props) => {

  const { t } = props;

  return (
    <Col xs={12} sm={12} md={4}>
      <div className="vertical-menu">
        <NavLink
          activeClassName="active"
          className="bookmarkes-list"
          to={"/list"}
        >
          <Link to={"/list"}>
            <Image src="/assets/images/icons/back.svg" className="svg-clone" />
          </Link>
          {t("bookmarks")}
        </NavLink>

        <NavLink
          activeClassName="active"
          className="bookmarkes-list"
          to={"/bookmarks"}
        >
          <Image
            src="/assets/images/icons/bookmark.svg"
            className="svg-clone my-p-icons"
          />
          {t("all_bookmarks")}
        </NavLink>

        <NavLink
          activeClassName="active"
          className="bookmarkes-list"
          to={"/bookmark-photo"}
        >
          <Image
            src="/assets/images/icons/gallery.svg"
            className="svg-clone my-p-icons"
          />
          {t("photos")}
        </NavLink>

        <NavLink
          activeClassName="active"
          className="bookmarkes-list"
          to={"/bookmark-video"}
        >
          <Image
            src="/assets/images/icons/video.svg"
            className="svg-clone my-p-icons"
          />
          {t("videos")}
        </NavLink>

        {/* <NavLink
          activeClassName="active"
          className="bookmarkes-list"
          to={"/bookmarks-audio"}
        >
          <Image
            src="/assets/images/icons/audio.svg"
            className="svg-clone my-p-icons"
          />
          Audio
        </NavLink>

        <NavLink
          activeClassName="active"
          className="bookmarkes-list"
          to={"/bookmarks"}
        >
          <Image
            src="/assets/images/icons/other.svg"
            className="svg-clone my-p-icons"
          />
          Other
        </NavLink>

        <NavLink
          activeClassName="active"
          className="bookmarkes-list"
          to={"/bookmarks"}
        >
          <Image
            src="/assets/images/icons/lock.svg"
            className="svg-clone my-p-icons"
          />
          Locked
        </NavLink> */}
      </div>
    </Col>
  );
};

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(null, mapDispatchToProps)(withNamespaces()(BookmarkNav));
