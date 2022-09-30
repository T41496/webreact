import React from "react";
import { Link } from "react-router-dom";
import {Container, Row, Col, Image} from "react-bootstrap";
import BookmarkNav from "./BookmarkNav";
import { withNamespaces } from "react-i18next";

const BookmarkAudio = () => {
  
  const { t } = this.props;

  return (
    <div className="edit-profile">
      <Container>
        <Row>
          <BookmarkNav />
          <Col xs={12} sm={12} md={8}>
            <div className="profile-post-area">
              <div className="bookmarkes-list bookmarks-right-side">
                <div className="pull-left">
                  <h3>{t("audio")}</h3>
                </div>
                <div className="pull-right">
                  <Link className="bookmarks-filter" href="#">
                    <Image
                      src="/assets/images/icons/sort.svg"
                      className="svg-clone"
                    />
                  </Link>
                </div>
              </div>

              <div className="bookmarks-videos">
                <div className="empty-message">
                  <span className="no-bookmarks">
                    <Image
                      src="/assets/images/icons/bookmark.svg"
                      className="svg-clone"
                      width="64"
                    />
                    <p> {t("no_bookmarks_yet")}</p>
                  </span>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default withNamespaces()(BookmarkAudio);
