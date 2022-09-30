import React from "react";
import { Button, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { withNamespaces } from "react-i18next";
import api from "../../Environment";
import moment from 'moment';

const ChatUserList = (props) => {
  const { chatUsers } = props;
  const { t } = props;
  return (
    <Col sm={12} md={12} lg={5} xl={4} className="padding-msg resp-mrg-btn-xs">
      <div className="chat-content">
        <div className="chat-header">
          <Link className="chat-header-back" to={`/home`}>
            <Image src="/assets/images/icons/back.svg" className="svg-clone" />
          </Link>
          <h1 className="chat-page-title">{t("messages")}</h1>

          <Link type="button" className="search-btn-1 hidden">
            <Image src="/assets/images/icons/search.svg" className="svg-clone" />
          </Link>

          <Link to="#" className="add-icon hidden">
            <Image src="/assets/images/icons/plus.svg" className="svg-clone" />
          </Link>
        </div>

        <div className="scrollbar">
          <div className="friend-chat-list-scroll overflow">
            <div className="recent-chat">
              <div className="alignleft">
                <h2 className="chat-section-title">{t("recent")}</h2>
              </div>
            </div>

            {chatUsers.users.map((chatUser, index) => (
              <div key={index}>
                <div
                  className={
                    props.activeChat === index
                      ? "chat-item active"
                      : "chat-item"
                  }
                >
                  <Button type="button" className="chat-btn-one">
                    <Image
                      src={chatUser.to_userpicture ? (api.serviceUrl()+'/'+chatUser.to_userpicture) : (api.serviceUrl()+'/images/mysecrets_avatar_square_image.png')}
                      className="svg-clone chat-close"
                    />
                  </Button>
                  <Link to={"/"+chatUser.to_displayname} className="friend-profile">
                    <Image
                      src={chatUser.to_userpicture ? (api.serviceUrl()+'/'+chatUser.to_userpicture) : (api.serviceUrl()+'/images/mysecrets_avatar_square_image.png')}
                      alt={chatUser.to_displayname}
                    />
                  </Link>
                  <Link
                    to="#"
                    className="chat-msg"
                    onClick={(event) =>
                      props.changeUser(event, chatUser, index)
                    }
                  >
                    <div className="friend-name-row">
                      <div className="friend">
                        <span className="friend-name">
                          {chatUser.to_displayname}
                        </span>
                        <span className="friend-username">
                          @{chatUser.to_username}
                        </span>
                      </div>
                    </div>
                    <div className="chat-body">
                      <div className="chat-last-message">
                        <span className="chat-last-message-text">
                          {chatUser.message}
                        </span>
                        <span className="emoji-outer emoji-sizer"></span>
                      </div>
                      <div className="chat-time">
                        <span title={chatUser.time_formatted}>
                          joined at: {moment(chatUser.time_formatted).fromNow()}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
                <hr className="solid" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Col>
  );
};

export default withNamespaces()(ChatUserList);
