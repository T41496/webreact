import React, { useState } from "react";
import SendTipModal from "../helper/SendTipModal";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";

const ModelProfileArchivedSec = (props) => {
  const [sendTip, setSendTip] = useState(false);

  const closeSendTipModal = () => {
    setSendTip(false);
  };

  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <>
      <div
        role="tabpanel"
        className={
          props.activeSec === "archive"
            ? "tab-pane fade in active"
            : "tab-pane fade"
        }
        id="Section4"
      >
        <div className="alignleft float-unset">
          <span className="post-number">4358 Post</span>
        </div>
        <div className="alignright">
          <div className="profile-search-post">
            <Form className="search-box">
              <input
                className="search-text"
                type="text"
                placeholder="Search Anything"
              />
              <Link to="#" className="search-btn">
                <i className="fas fa-search"></i>
              </Link>
            </Form>
          </div>
        </div>
      </div>
      <SendTipModal sendTip={sendTip} closeSendTipModal={closeSendTipModal} />
    </>
  );
};

export default ModelProfileArchivedSec;
