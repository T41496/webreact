import React from "react";
import { Link } from "react-router-dom";
import { Image, Media } from "react-bootstrap";

import NoDataFound from "../NoDataFound/NoDataFound";
import { translate, t } from "react-multi-lang";
import api from "../../Environment";

const ModelProfilePhotoSec = (props) => {
  return (
    <div
      role="tabpanel"
      className={
        props.activeSec === "photo"
          ? "tab-pane fade in active"
          : "tab-pane fade"
      }
      id="Section2"
    >
      <ul className="box-container three-cols model-prof-photo-sec">
        {props.userPosts.loading ? (
          "Loading..."
        ) : props.userPosts.data.posts.length > 0 ? (
          props.userPosts.data.posts.map((post) =>
            post.postFiles.length > 0
              ? post.postFiles.map((p_file) => (
                  <Media as="li" className="box">
                    <div className="inner">
                      <Link to="#" className="glightbox">
                        <Image src={api.serviceUrl()+'/'+p_file.post_file} />
                      </Link>
                    </div>
                  </Media>
                ))
              : ""
          )
        ) : (
          <NoDataFound></NoDataFound>
        )}
        {props.noMoreData !== true ? (
          <>{props.isFetching && "Fetching more list items..."}</>
        ) : (
          t("no_more_data")
        )}
      </ul>
    </div>
  );
};

export default ModelProfilePhotoSec;
