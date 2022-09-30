import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Image } from "react-bootstrap";
import { connect } from "react-redux";
import { fetchListsDetailsStart } from "../../../store/actions/HomeAction";
import { withNamespaces } from 'react-i18next';

const ListIndex = (props) => {
  useEffect(() => {
    props.dispatch(fetchListsDetailsStart());
  }, []);

  const { t } = props;

  return (
    <div className="lists">
      <Container>
        <Row>
          <Col sm={12} md={12}>
            {props.lists.loading ? (
              t("loading")
            ) : (
              <div className="vertical-menu">
                <div className="bookmarkes-list bookmarks-right-side ">
                  <div className="pull-left">
                    <Link
                      className="bookmarkes-list"
                      to={"/home"}
                      // onClick={() => props.history.goBack()}
                    >
                      <Image
                        src="/assets/images/icons/back.svg"
                        className="svg-clone"
                      />
                      {t("lists")}
                    </Link>
                  </div>
                  {/* <div className="pull-right">
                  <Link className="bookmarks-filter" to="#">
                    <Image
                      src="/assets/images/icons/plus.svg"
                      className="svg-clone"
                      width=""
                    />
                  </Link>
                </div> */}
                </div>

                <div className="user-lists-heading">
                  <div className="pull-left">
                    <h3 className="mb-3 mt-3">{t("custom_order")}</h3>
                  </div>
                </div>

                <div className="user-lists">
                  <Link to={"/fans"}>
                    <div className="pull-left">
                      <h3>{t("fans")}</h3>
                      <span className="user-list-count">
                        {props.lists.data.total_followers} {t("people")}
                      </span>
                    </div>
                    <div className="pull-right"></div>
                  </Link>
                </div>

                <div className="user-lists">
                  <Link to={"/following"}>
                    <div className="pull-left">
                      <h3>{t("following")}</h3>
                      <span className="user-list-count">
                        {props.lists.data.total_followings} {t("people")}
                      </span>
                    </div>
                  </Link>
                </div>
                <div className="user-lists">
                  <Link to={"/favorites"}>
                    <div className="pull-left">
                      <h3>{t("favorites")}</h3>
                      <span className="user-list-count">
                        {props.lists.data.total_fav_users} {t("people")}
                      </span>
                    </div>
                    <div className="pull-right"></div>
                  </Link>
                </div>
                <div className="user-lists">
                  <Link to={"/bookmarks"}>
                    <div className="pull-left">
                      <h3>{t("bookmarks")}</h3>
                      <span className="user-list-count">
                        {props.lists.data.total_bookmarks} {t("bookmarks")}
                      </span>
                    </div>
                    <div className="pull-right"></div>
                  </Link>
                </div>
                <div className="user-lists">
                  <Link to={"/blocked"}>
                    <div className="pull-left">
                      <h3>{t("blocked_list")}</h3>
                      <span className="user-list-count">
                        {props.lists.data.total_blocked_users} {t("people")}
                      </span>
                    </div>
                    <div className="pull-right"></div>
                  </Link>
                </div>
                {/* <div className="user-lists">
                <Link to="#">
                  <div className="pull-left">
                    <h3>Close Friends</h3>
                    <span className="user-list-count">0 people</span>
                  </div>
                  <div className="pull-right"></div>
                </Link>
              </div> */}
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const mapStateToPros = (state) => ({
  lists: state.home.lists,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(withNamespaces()(ListIndex));
