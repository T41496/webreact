import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Image, Media } from "react-bootstrap";
import BookmarkNav from "./BookmarkNav";
import { connect } from "react-redux";
import BookmarkPhotoLoader from "../Loader/BookmarkPhotoLoader";
import BookmarkNoDataFound from "../NoDataFound/BookmarkNoDataFound";
import { fetchBookmarksPhotoStart } from "../../store/actions/BookmarkAction";
import useInfiniteScroll from "../helper/useInfiniteScroll";
import { withNamespaces } from "react-i18next";
import api from "../../Environment";

const BookmarkPhoto = (props) => {
  useEffect(() => {
    props.dispatch(
      fetchBookmarksPhotoStart({
        type: "image",
        skip: props.bookmarkPhoto.skip,
      })
    );
  }, []);

  const [isFetching, setIsFetching] = useInfiniteScroll(fetchBookMarkPhotoData);

  const [noMoreData, setNoMoreData] = useState(false);

  function fetchBookMarkPhotoData() {
    setTimeout(() => {
      if (props.bookmarkPhoto.length !== 0) {
        props.dispatch(
          fetchBookmarksPhotoStart({
            type: "image",
            skip: props.bookmarkPhoto.skip,
          })
        );
        setIsFetching(false);
      } else {
        setNoMoreData(true);
      }
    }, 3000);
  }

  const { t } = props;

  return (
    <div className="edit-profile book-photo">
      <Container>
        <Row>
          <BookmarkNav />
          <Col xs={12} sm={12} md={8}>
            {props.bookmarkPhoto.loading ? (
              <BookmarkPhotoLoader />
            ) : props.bookmarkPhoto.data.posts.length > 0 ? (
              <div className="profile-post-area">
                <div className="bookmarkes-list bookmarks-right-side">
                  <div className="pull-left">
                    <h3>{t("photos")}</h3>
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

                <div className="bookmarks-photos">
                  <ul className="box-container three-cols">
                    {props.bookmarkPhoto.data.posts.map((post) =>
                      post.postFiles.length > 0
                        ? post.postFiles.map((post) => (
                            <Media as="li" className="box" key={post.post_id}>
                              <div className="inner">
                                <a
                                  href={api.serviceUrl()+'/'+post.post_file}
                                  target="_blank"
                                  className="glightbox"
                                >
                                  <Image src={api.serviceUrl()+'/'+post.post_file} />
                                </a>
                              </div>
                            </Media>
                          ))
                        : ""
                    )}
                  </ul>
                </div>
              </div>
            ) : (
              <BookmarkNoDataFound />
            )}
          </Col>
        </Row>
        {noMoreData !== true ? (
          <>{isFetching && "Fetching more list items..."}</>
        ) : (
          t("no_more_data")
        )}
      </Container>
    </div>
  );
};

const mapStateToPros = (state) => ({
  bookmarkPhoto: state.bookmark.bookmarkPhoto,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(withNamespaces()(BookmarkPhoto));
