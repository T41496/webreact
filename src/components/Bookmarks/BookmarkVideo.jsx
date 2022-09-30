import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Image, Media } from "react-bootstrap";
import BookmarkNav from "./BookmarkNav";
import { connect } from "react-redux";
import BookmarkVideoLoader from "../Loader/BookmarkVideoLoader";
import BookmarkNoDataFound from "../NoDataFound/BookmarkNoDataFound";
import { fetchBookmarksVideoStart } from "../../store/actions/BookmarkAction";
import useInfiniteScroll from "../helper/useInfiniteScroll";
import ReactPlayer from "react-player/lazy";
import BookmarkLoader from "../Loader/BookmarkLoader";
import PostDisplayCard from "../helper/PostDisplayCard";
import { withNamespaces } from "react-i18next";

const BookmarkVideo = (props) => {
  useEffect(() => {
    props.dispatch(
      fetchBookmarksVideoStart({
        type: "video",
        skip: props.bookmarkVideo.skip,
      })
    );
  }, []);

  const [isFetching, setIsFetching] = useInfiniteScroll(fetchBookMarkVideoData);

  const [noMoreData, setNoMoreData] = useState(false);

  function fetchBookMarkVideoData() {
    setTimeout(() => {
      if (props.bookmarkVideo.length !== 0) {
        props.dispatch(
          fetchBookmarksVideoStart({
            type: "video",
            skip: props.bookmarkVideo.skip,
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
          <Col sm={12} xs={12} md={8}>
            <div className="profile-post-area">
              <div className="bookmarkes-list bookmarks-right-side">
                <div className="pull-left">
                  <h3>{t("Videos")}</h3>
                </div>
              </div>
            </div>
            {props.bookmarkVideo.loading ? (
              <BookmarkLoader />
            ) : props.bookmarkVideo.data.posts.length > 0 ? (
              props.bookmarkVideo.data.posts.map((post) => (
                <PostDisplayCard post={post} key={post.post_id} />
              ))
            ) : (
              <BookmarkNoDataFound />
            )}
          </Col>
        </Row>
        {noMoreData !== true ? (
          <>{isFetching && "Fetching more list items..."}</>
        ) : (
          "No More Data"
        )}
      </Container>
    </div>
  );
};

const mapStateToPros = (state) => ({
  bookmarkVideo: state.bookmark.bookmarkVideo,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(withNamespaces()(BookmarkVideo));
