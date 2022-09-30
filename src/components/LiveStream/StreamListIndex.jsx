import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Image } from "react-bootstrap";
import { connect } from "react-redux";
import { fetchStreamListsDetailsStart,streamPaymentStart } from "../../store/actions/PostAction";
import { withNamespaces } from "react-i18next";
import api from "../../Environment";
import "./LiveStream.css";

const StreamListIndex = (props) => {
  useEffect(() => {
    props.dispatch(fetchStreamListsDetailsStart());
  }, []);

  let handleStreamPayment = (event) => {
    let id = event.target.getAttribute('data-id');
    props.dispatch(streamPaymentStart({
      live_stream_id: id,
    }));

  };

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
                      onClick={() => props.history.goBack()}
                    >
                      <Image
                        src="assets/images/icons/back.svg"
                        className="svg-clone"
                      />
                      {t("stream_lists")}
                    </Link>
                  </div>
                </div>

                <div className="user-lists-heading">
                  <div className="pull-left">
                    <h3 className="mb-3 mt-3">{t("stream_lists")}</h3>
                  </div>
                </div>
                {props.lists.data.stream && props.lists.data.stream.length > 0 ? 
                  ( props.lists.data.stream.map((list) => (
                    <div>
                    {(list.payment==1 && list.user_payment.length==0)?

                      <div className="user-lists">
                        <div>
                          <span className="sidebar-hamburger-user-profile">
                            <Image
                              src={(list.user.picture != 'null') ? (api.serviceUrl()+'/'+list.user.picture) : (api.serviceUrl()+'/images/mysecrets_avatar_square_image.png')}
                              alt={list.user.first_name}
                            />
                          </span>
                        </div>
                        <div className="pull-left">          
                          <h3>{list.user.first_name+' '+list.user.last_name}</h3>
                          <span className="user-list-count">
                            {list.title}
                          </span>
                        </div>
                        <div className="pull-right left_margin">
                          <button className="btn btn-primary" onClick={handleStreamPayment} data-id={list.id}>{t("pay")} {list.currency_amount}</button>
                        </div>
                      </div>

                    :

                      <div className="user-lists">
                        <div>
                          <span className="sidebar-hamburger-user-profile">
                            <Image
                              src={(list.user.picture != 'null') ? (api.serviceUrl()+'/'+list.user.picture) : (api.serviceUrl()+'/images/mysecrets_avatar_square_image.png')}
                              alt={list.user.first_name}
                            />
                          </span>
                        </div>
                        <div className="pull-left">          
                          <h3>{list.user.first_name+' '+list.user.last_name}</h3>
                          <span className="user-list-count">
                            {list.title}
                          </span>
                        </div>
                        <div className="pull-right left_margin">
                          <Link to={"/liveStream/"+list.id}>
                            <button className="btn btn-primary">{t("stream")}</button>
                          </Link>
                        </div>
                      </div>
                    }
                    </div>
                ))) : (
                  <div className="">
                    <h3 className="text-center">{t("no_stream")}</h3>
                  </div>
                )}
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const mapStateToPros = (state) => ({
  lists: state.post.streamlists,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(withNamespaces()(StreamListIndex));
