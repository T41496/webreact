import React, { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Image } from "react-bootstrap";
import { connect } from "react-redux";
import { fetchVideoListsDetailsStart, updateSingleCallStart } from "../../store/actions/PostAction";
import { translate, t } from "react-multi-lang";
import api from "../../Environment";
import "./VideoList.css";
import { Media } from "react-bootstrap";
import { withNamespaces } from "react-i18next";

const VideoListIndex = (props) => {

  const { t } = props;
  // console.log("*************", props)

  useEffect(() => {
    props.dispatch(fetchVideoListsDetailsStart());
  }, []);

  const [videoListTab, setVideoListTab] = useState('called');

  const [currentTime, setCurrentTime] = useState(new Date());

  let handleVideoCallSchedule = (type,id,event) => {

    props.dispatch(updateSingleCallStart({
      status_type: type,
      video_id: id,
    }));

  };

  

  setInterval(() => {
    setCurrentTime(new Date());
  }, 1000);


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
                      {t("call_list")}
                    </Link>
                  </div>
                </div>

                <div className="user-lists-heading">
                  <div className="pull-left">
                    <h3 className="mb-3 mt-3">{t("call_list")}</h3>
                  </div>
                </div>

                <div className="listing-tab">
                  <div className="tab" role="tabpanel">
                    <ul className="nav nav-tabs following-tab-sec" role="tablist">
                      <Media
                        as="li"
                        role="presentation"
                        className={videoListTab == "called" ? "active" : ""}
                      >
                        <Link
                          to="#active"
                          aria-controls="home"
                          role="tab"
                          data-toggle="tab"
                          onClick={() => setVideoListTab("called")}
                        >
                          <Image
                            src="assets/images/icons/schedule_call.png"
                            className="svg-clone"
                          />
                          <span className="tab-nav-item"> {t("scheduled")} </span>
                        </Link>
                      </Media>
                      <Media
                        as="li"
                        role="presentation"
                        className={videoListTab == "scheduled" ? "active" : ""}
                      >
                        <Link
                          to="#expired"
                          aria-controls="profile"
                          role="tab"
                          data-toggle="tab"
                          onClick={() => setVideoListTab("scheduled")}
                        >
                          <Image src="assets/images/icons/incoming.png" className="svg-clone" />
                          <span className="tab-nav-item"> {t("incoming_call")} </span>
                        </Link>
                      </Media>
                    </ul>

                    <div role="tabpanel" className={videoListTab === "called" ? "tab-pane fade in active": "tab-pane fade d-none"} id="all" >
                      {props.lists.data.created_call && props.lists.data.created_call.length > 0 ? 
                        ( props.lists.data.created_call.map((list) => (
                        <div className="user-lists">
                          <div>
                            <span className="sidebar-hamburger-user-profile">
                              {(localStorage.getItem("userId")!=list.called_user_id)?
                                <Image
                                  src={(list.called_user.picture != 'null') ? (api.serviceUrl()+'/'+list.called_user.picture) : (api.serviceUrl()+'/images/mysecrets_avatar_square_image.png')}
                                  alt={list.user.first_name}
                                />
                              :
                                <Image
                                  src={(list.user.picture != 'null') ? (api.serviceUrl()+'/'+list.user.picture) : (api.serviceUrl()+'/images/mysecrets_avatar_square_image.png')}
                                  alt={list.user.first_name}
                                />
                              }
                            </span>
                          </div>
                          {(localStorage.getItem("userId")!=list.called_user_id)?
                            <div className="pull-left">          
                              <h3>{list.called_user.name}</h3>
                              <span className="user-list-count">
                                @{list.called_user.username} / {list.scheduled_at}
                              </span>
                            </div>
                          :
                            <div className="pull-left">          
                              <h3>{list.user.name}</h3>
                              <span className="user-list-count">
                                @{list.user.username} / {list.scheduled_at}
                              </span>
                            </div>
                          } 
                          <div className="pull-right left_margin">
                            { currentTime.getTime() >= (new Date(list.scheduled_at)).getTime() ?
                              <Link to={"/call/"+list.id}>
                                <button className="btn btn-primary">{t("call")}</button>
                              </Link>
                            :
                              <div>
                                <button className="btn btn-default">{t("call")}</button>
                              </div>
                            }
                          </div>
                        </div>
                      ))) : (
                        <div className="">
                          <h3 className="text-center">{t("no_call")}</h3>
                        </div>
                      )}
                    </div>

                    <div role="tabpanel" className={videoListTab === "scheduled" ? "tab-pane fade in active": "tab-pane fade d-none"} id="scheduled" >
                      {props.lists.data.scheduled_call && props.lists.data.scheduled_call.length > 0 ? 
                        ( props.lists.data.scheduled_call.map((list) => (
                        <div className="user-lists">
                          <div>
                            <span className="sidebar-hamburger-user-profile">
                              {(localStorage.getItem("userId")!=list.called_user_id)?
                                <Image
                                  src={(list.called_user.picture != 'null') ? (api.serviceUrl()+'/'+list.called_user.picture) : (api.serviceUrl()+'/images/mysecrets_avatar_square_image.png')}
                                  alt={list.called_user.first_name}
                                />
                              :
                                <Image
                                  src={(list.user.picture != 'null') ? (api.serviceUrl()+'/'+list.user.picture) : (api.serviceUrl()+'/images/mysecrets_avatar_square_image.png')}
                                  alt={list.user.first_name}
                                />
                              }
                            </span>
                          </div>
                          {(localStorage.getItem("userId")!=list.called_user_id)?
                            <div className="pull-left">          
                              <h3>{list.called_user.name}</h3>
                              <span className="user-list-count">
                                @{list.called_user.username} / {list.scheduled_at}
                              </span>
                            </div>
                          :
                            <div className="pull-left">          
                              <h3>{list.user.name}</h3>
                              <span className="user-list-count">
                                @{list.user.username} / {list.scheduled_at}
                              </span>
                            </div>
                          }
                          <div className="pull-right left_margin">
                            { currentTime.getTime() <= (new Date(list.scheduled_at)).getTime() ?
                              <button className="btn btn-primary" onClick={() => handleVideoCallSchedule("ACCEPTED",list.id)}>{t("accept")}</button>
                            :
                              <button className="btn btn-default">{t("accept")}</button>
                            }
                            &nbsp;&nbsp;
                            <button className="btn btn-primary" onClick={() => handleVideoCallSchedule("DECLINED",list.id)}>{t("decline")}</button>
                          </div>
                        </div>
                      ))) : (
                        <div className="">
                          <h3 className="text-center">{t("no_call")}</h3>
                        </div>
                      )}
                    </div>

                  </div>
                </div>                
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const mapStateToPros = (state) => ({
  lists: state.post.videoList,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(withNamespaces()(VideoListIndex));
