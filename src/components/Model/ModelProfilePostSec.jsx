import React from "react";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import PostDisplayCard from "../helper/PostDisplayCard";
import NoDataFound from "../NoDataFound/NoDataFound";
import { searchUserPostStart } from "../../store/actions/OtherUserAction";
import { connect } from "react-redux";
import { translate, t } from "react-multi-lang";

const ModelProfilePostSec = (props) => {
  const handleSearch = (event) => {
    props.dispatch(
      searchUserPostStart({
        user_unique_id: props.otherUserUniquId,
        search_key: event.currentTarget.value,
      })
    );
  };

  return (
    <>
      <div
        role="tabpanel"
        className={
          props.activeSec === "post"
            ? "tab-pane fade in active"
            : "tab-pane fade"
        }
        id="Section1"
      >
        <div className="profile-post-area">
          <div className="alignleft float-unset">
            <span className="post-number">
              {props.userPosts.loading ? (
                "Loading..."
              ) : (
                <span>{props.userPosts.data.total} Posts</span>
              )}
            </span>
          </div>
          <div className="alignright">
            <div className="profile-search-post">
              <Form className="search-box">
                <input
                  className="search-text"
                  type="text"
                  placeholder="Search Anything"
                  onChange={handleSearch}
                />
                <Link to="#" className="search-btn">
                  <i className="fas fa-search"></i>
                </Link>
              </Form>
            </div>
          </div>
        </div>

        {props.userPosts.loading ? (
          "Loading..."
        ) : props.userPosts.data.posts.length > 0 ? (
          props.userPosts.data.posts.map((post) => (
            <PostDisplayCard
              post={post}
              key={post.post_id}
              scrollToTop={props.scrollToTop}
            />
          ))
        ) : (
          <NoDataFound />
        )}
        {props.noMoreData !== true ? (
          <>{props.isFetching && "Fetching more list items..."}</>
        ) : (
          t("no_more_data")
        )}
      </div>
    </>
  );
};

const mapStateToPros = (state) => ({});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(ModelProfilePostSec);
