import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PostDisplayCard from "../helper/PostDisplayCard";
import { fetchSinglePostStart } from "../../store/actions/PostAction";
import { Col, Container } from "react-bootstrap";

const PostView = (props) => {
  useEffect(() => {
    if (props.singlePost.loading)
      props.dispatch(
        fetchSinglePostStart({
          post_unique_id: props.match.params.post_unique_id,
        })
      );
  }, []);
  return (
    <div className="home-screen home-sec">
      <Container>
        <div className="padding-top-xl">
          <Col xl={9} offset={2} md={9} className="custom-padding">
            {props.singlePost.loading ? (
              ""
            ) : (
              <PostDisplayCard
                post={props.singlePost.data.post}
                key={props.singlePost.data.post.post_unique_id}
              />
            )}
          </Col>
        </div>
      </Container>
    </div>
  );
};

const mapStateToPros = (state) => ({
  singlePost: state.post.singlePost,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(PostView);
