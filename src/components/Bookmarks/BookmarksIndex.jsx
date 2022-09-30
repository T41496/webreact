import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import BookmarkNav from "./BookmarkNav";
import { connect } from "react-redux";
import { fetchBookmarksStart } from "../../store/actions/BookmarkAction";
import PostDisplayCard from "../helper/PostDisplayCard";
import BookmarkNoDataFound from "../NoDataFound/BookmarkNoDataFound";
import BookmarkLoader from "../Loader/BookmarkLoader";
import useInfiniteScroll from "../helper/useInfiniteScroll";
import { withNamespaces } from "react-i18next";

const BookmarksIndex = (props) => {
  useEffect(() => {
    props.dispatch(
      fetchBookmarksStart({ type: "all", skip: props.bookmark.skip })
    );
  }, []);

  const [isFetching, setIsFetching] = useInfiniteScroll(fetchBookMarkData);

  const [noMoreData, setNoMoreData] = useState(false);

  function fetchBookMarkData() {
    setTimeout(() => {
      if (props.bookmark.length !== 0) {
        props.dispatch(
          fetchBookmarksStart({ type: "all", skip: props.bookmark.skip })
        );
        setIsFetching(false);
      } else {
        setNoMoreData(true);
      }
    }, 3000);
  }

  const { t } = props;

  return (
    <>
      <div className="edit-profile bookmark-sec">
        <Container>
          <Row>
            <BookmarkNav />
            <Col sm={12} xs={12} md={8}>
              <div className="profile-post-area">
                <div className="bookmarkes-list bookmarks-right-side">
                  <div className="pull-left">
                    <h3>{t("all_bookmarks")}</h3>
                  </div>
                </div>
              </div>
              {props.bookmark.loading ? (
                <BookmarkLoader />
              ) : props.bookmark.data.posts.length > 0 ? (
                props.bookmark.data.posts.map((post) => (
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
            t("no_more_data")
          )}
        </Container>
      </div>
    </>
  );
};

const mapStateToPros = (state) => ({
  bookmark: state.bookmark.bookmark,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(withNamespaces()(BookmarksIndex));
