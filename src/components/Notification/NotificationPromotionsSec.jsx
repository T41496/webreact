import React from "react";
import { Link } from "react-router-dom";
import {Image} from "react-bootstrap";

const NotificationPromotionsSec = (props) => {

    return (
        <>
            <div
                role="tabpanel"
                className={
                    props.activeSec === "promotions-sec" ? "tab-pane fade in active" : "tab-pane fade"
                }
                id="Section6"
            >
                <h3 className="notify-title">Promotions</h3>
                <div className="notification-list">
                    <div className="notify-item">
                        <div className="post-header">
                            <div className="alignleft">
                                <Link className="title-container" to="#">
                                    <Image src="/assets/images/avatar/user.jpg" className="user-image img-responsive" />
                                    <div className="user-name">
                                        <span className="post-user-name">
                                            Lexy can i?
                                            <span className="user-id">@lexycani</span>
                                        </span>
                                        <span className="post-user-notify">
                                            Mentioned you in a post
                                        </span>
                                        <span className="post-user-notify-date">
                                            Aug 30
                                        </span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NotificationPromotionsSec;
