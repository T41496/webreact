import React, { useRef, useState , useEffect} from "react";
import { Link } from "react-router-dom";
import { Button, Container, Row, Col, Image, Form , Media} from "react-bootstrap";
import { connect } from "react-redux";
import {
  postFileUploadStart,
  savePostStart,
  postFileRemoveStart,
} from "../../../store/actions/PostAction";

import {searchUserStart} from '../../../store/actions/HomeAction'

import { createNotification } from "react-redux-notify/lib/modules/Notifications";
import { getErrorNotificationMessage } from "../../helper/NotificationMessage";
import { withNamespaces } from "react-i18next";
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import moment from 'moment';
// import ContentEditable from 'react-contenteditable'
// import { set } from "date-fns/esm";
// import PostEditor from "../postMentions/PostEditor";
// import {stateToHTML} from 'draft-js-export-html';

const CreatePostIndex = (props) => {

  const { t } = props;
  const [inputData, setInputData] = useState({});

  const [image, setImage] = useState({ previewImage: "" });
  const [paidPost, setPaidPost] = useState(false);
  const [videoTitle, setVideoTitle] = useState("");

  const [fileUploadStatus, setFileUploadStatus] = useState(false);

  const [videoThumbnail, setVideoThumbnail] = useState(false);

  const mentionsRef = useRef();

  const [editorContentState, setEditorContentstate] = useState("");

  const [editorHtmlContent , setEditorHtmlContent] = useState("");

  const [selectedDate , setSelectedDate] = useState("");

  const inputProps = {placeholder: t('publish_time'), name: 'publish_time'};

  const yesterday = moment().subtract( 1, 'day' );

  const valid = (current) => {
    return current.isAfter(yesterday);
  };

  const handleChangeImage = (event, fileType) => {
    if (event.currentTarget.type === "file") {
      setFileUploadStatus(true);
      let reader = new FileReader();
      let file = event.currentTarget.files[0];
      reader.onloadend = () => {
        setImage({ ...image, previewImage: reader.result });
      };

      if (file) {
        reader.readAsDataURL(file);
      }
      props.dispatch(
        postFileUploadStart({
          file: event.currentTarget.files[0],
          file_type: fileType,
        })
      );
      setPaidPost(true);
    }
  };

  const handleChangeVideo = (event, fileType) => {
    setVideoTitle(event.currentTarget.files[0].name);
    if (event.currentTarget.type === "file") {
      setFileUploadStatus(true);
      let reader = new FileReader();
      let file = event.currentTarget.files[0];

      if (file) {
        reader.readAsDataURL(file);
      }
      props.dispatch(
        postFileUploadStart({
          file: event.currentTarget.files[0],
          file_type: fileType,
        })
      );
      setPaidPost(true);
      setVideoThumbnail(true);
    }
  };

  const imageClose = (event) => {
    event.preventDefault();
    setPaidPost(false);
    if (props.fileUpload.loadingButtonContent !== null) {
      const notificationMessage = getErrorNotificationMessage(
        "File is being uploaded.. Please wait"
      );
      props.dispatch(createNotification(notificationMessage));
    } else {
      props.dispatch(
        postFileRemoveStart({
          file: props.fileUpload.data.file,
          file_type: props.fileUpload.data.post_file.file_type,
          blur_file: props.fileUpload.data.post_file.blur_file,
          post_file_id: props.fileUpload.data.post_file.post_file_id,
        })
      );
      setImage({ previewImage: "" });
      setFileUploadStatus(false);
    }
  };

  const videoClose = (event) => {
    event.preventDefault();
    setPaidPost(false);
    if (props.fileUpload.loadingButtonContent !== null) {
      const notificationMessage = getErrorNotificationMessage(
        "File is being uploaded.. Please wait"
      );
      props.dispatch(createNotification(notificationMessage));
    } else {
      props.dispatch(
        postFileRemoveStart({
          file: props.fileUpload.data.file ?? "",
          file_type: props.fileUpload.data.post_file ? props.fileUpload.data.post_file.file_type : "",
          preview_file: props.fileUpload.data.post_file ? props.fileUpload.data.post_file.preview_file : "",
          post_file_id: props.fileUpload.data.post_file ? props.fileUpload.data.post_file.post_file_id : "",
        })
      );
      setFileUploadStatus(false);
      setVideoTitle("");
    }
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   if (fileUploadStatus) {
  //     props.dispatch(
  //       savePostStart({
  //         content: inputData.content ? inputData.content : "",
  //         amount: inputData.amount ? inputData.amount : "",
  //         post_files: props.fileUpload.data.post_file.post_file_id,
  //         preview_file: inputData.preview_file ? inputData.preview_file : "",
  //       })
  //     );
  //   } else {
  //     props.dispatch(
  //       savePostStart({
  //         content: inputData.content ? inputData.content : "",
  //         amount: inputData.amount ? inputData.amount : "",
  //       })
  //     );
  //   }
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (fileUploadStatus) {
      props.dispatch(
        savePostStart({
          content: inputData.content ? inputData.content : "",
          amount: inputData.amount ? inputData.amount : "",
          post_files: props.fileUpload.data.post_file.post_file_id,
          preview_file: inputData.preview_file ? inputData.preview_file : "",
          publish_time: inputData.publish_time ?? '',
        })
      );
    } else {
      props.dispatch(
        savePostStart({
          content: inputData.content ? inputData.content : "",
          amount: inputData.amount ? inputData.amount : "",
          publish_time: inputData.publish_time ?? '',
        })
      );
    }


  };

  const handleDate = (event) => {
    var newDate = new Date();
    if(event.year) {
      var hour = (((event.hour() < newDate.getHours()) && (event.date() == newDate.getDate()))) ? newDate.getHours() : event.hour();
      var minute = ((event.minute() < newDate.getMinutes()) && (event.date() == newDate.getDate())) ? newDate.getMinutes() : event.minute();
      let date = event.year()+'-'+(((event.month()+1) > 9) ? (event.month()+1) : ('0'+(event.month()+1)))+'-'+((event.date() > 9) ? event.date() : ('0'+event.date()))+' '+((hour > 9) ? hour : ('0'+hour))+':'+((minute > 9) ? minute : ('0'+minute));
      let SDate = event.year()+'-'+(((event.month()+1) > 9) ? (event.month()+1) : ('0'+(event.month()+1)))+'-'+((event.date() > 9) ? event.date() : ('0'+event.date()))+' '+((hour > 9) ? (hour > 12 ? ((hour - 12) > 9 ? (hour - 12) : (hour-12)) : hour) : ('0'+hour))+':'+((minute > 9) ? minute : ('0'+minute));
      setSelectedDate(SDate+' '+(hour > 12 ? 'PM' : 'AM'));
      setInputData({...inputData, publish_time: date});
    } else {
      setInputData({...inputData, publish_time: ''});
    }
  }

  return (   
    <div>
    {localStorage.getItem("is_face")  == 1 ? (
      <>
    <div className="notification-page create-post" id="tabs">
      <Container>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col sm={12} md={12}>
              <div className="post-create-header">
                <div className="pull-left">
                  <Link className="bookmarkes-list notify-title" to={"/home"}>
                    <Image
                      src="/assets/images/icons/back.svg"
                      className="svg-clone"
                    />
                    {t("new_post")}
                  </Link>
                </div>
                <div className="pull-right">
                  <Button
                    type="submit"
                    className="post-btn btn-primary"
                    onClick={handleSubmit}
                    disabled={
                      props.fileUpload.buttonDisable ||
                      props.savePost.buttonDisable
                    }
                  >
                    {props.fileUpload.loadingButtonContent !== null
                      ? props.fileUpload.loadingButtonContent
                      : props.savePost.loadingButtonContent !== null
                      ? props.savePost.loadingButtonContent
                      : t("post")}
                  </Button>
                </div>
              </div>
            </Col>

            <Col sm={12} md={12}>
            <div className="create-post-textarea">
                <Form.Group>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder={t("new_post_placeholder")}
                    name="content"
                    style={{ width: "100%", maxWidth: "100%" }}
                    value={inputData.content ? inputData.content : null}
                    onChange={(event) =>
                      setInputData({
                        ...inputData,
                        content: event.currentTarget.value,
                      })
                    }
                  />
                </Form.Group>
              </div>
              <Datetime inputProps={inputProps} onChange={(event) => handleDate(event)} isValidDate={valid} dateFormat="YYYY-MM-DD" closeOnSelect={true} value={selectedDate} />
              {/* <div className="searchMentions">

                <div className="PostEditor">
                  <PostEditor
                    className="PostEditor__input"
                    placeholder={"What are you thinking"}
                    ref={mentionsRef}
                    getEditorRawContent={setEditorContentstate}
                    getEditorHtmlContent = {setEditorHtmlContent}
                  />
                  </div>  
              </div> */}
              {localStorage.getItem("is_face")  == 1 ? (
                <>
              {/* {localStorage.getItem("is_document_verified") == 2 ? ( */}
                <div className="left-half post-write">
                  <Button>
                    <Form.Group className="mb-0">
                      <Form.Control
                        id="fileupload_photo"
                        type="file"
                        multiple="multiple"
                        accept=".gif,.jpg,.jpeg,.gif,.png,.jpg,.jpeg,.png"
                        onChange={(event) => handleChangeImage(event, "image")}
                        name="post_files"
                      />
                      <Form.Label
                        id="attach_file_photo"
                        for="fileupload_photo"
                        className="chat-attach_file"
                        data-original-title="null"
                      >
                        <Image
                          src="/assets/images/icons/gallery.svg"
                          className="svg-clone"
                        />
                      </Form.Label>
                    </Form.Group>
                  </Button>
                  <Button>
                    <Form.Group className="mb-0">
                      <Form.Control
                        id="fileupload_video"
                        type="file"
                        multiple="multiple"
                        accept="video/mp4,video/x-m4v,video/*"
                        onChange={(event) => handleChangeVideo(event, "video")}
                        name="post_files"
                      />
                      <Form.Label
                        id="attach_file_video"
                        for="fileupload_video"
                        className="chat-attach_file"
                        data-original-title="null"
                      >
                        <Image
                          src="/assets/images/icons/video.svg"
                          className="svg-clone"
                        />
                      </Form.Label>
                    </Form.Group>
                  </Button>
                  {videoTitle !== "" ? (
                    <div className="post-title-content">
                      <h4>{videoTitle}</h4>
                      <Link to="#" onClick={videoClose}>
                        <i className="far fa-window-close"></i>
                      </Link>
                    </div>
                  ) : null}
                </div>
              {/* ) : (
                ""
              )} */}
              </>
              ) : ''}
              {image.previewImage !== "" ? (
                <Row>
                  <Col sm={12} md={3}>
                    <div className="post-img-preview-sec">
                      <Link to="#" onClick={imageClose}>
                        <i className="far fa-times-circle"></i>
                      </Link>
                      <Image
                        alt="#"
                        src={image.previewImage}
                        className="post-video-preview"
                      />
                    </div>
                  </Col>
                </Row>
              ) : null}
            </Col>
            {paidPost == true ? (
              <Col sm={12} md={12}>
                <Form.Group className="md-mrg-btm">
                  <label className="text-muted m-1 h3">
                    {t("price")} ({t("optional")})
                  </label>
                  <Form.Control
                    type="number"
                    placeholder={t("price_placeholder")}
                    name="amount"
                    pattern="[0-9]*"
                    min="1"
                    inputmode="numeric"
                    value={inputData.amount}
                    width="50%"
                    onChange={(event) =>
                      setInputData({
                        ...inputData,
                        amount: event.currentTarget.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
            ) : (
              ""
            )}
            {videoThumbnail === true ? (
              <Col sm={12} md={12}>
                <Form.Group className="md-mrg-btm">
                  <label className="text-muted m-1 mt-3 f-12 text-uppercase">
                    {t("upload_video_thumbnail")}:({t("optional")})
                  </label>
                  <Form.Control
                    style={{ display: "block" }}
                    type="file"
                    placeholder={t("upload_video_thumbnail_placeholder")}
                    name="preview_file"
                    width="50%"
                    className="form-control"
                    accept=".gif,.jpg,.jpeg,.gif,.png,.jpg,.jpeg,.png"
                    onChange={(event) =>
                      setInputData({
                        ...inputData,
                        preview_file: event.currentTarget.files[0],
                      })
                    }
                  />
                </Form.Group>
              </Col>
            ) : (
              ""
            )}
          </Row>
        </Form>
      </Container>
    </div>   
    </>
    ) : <div className="alert-post-page"><h3 className="social-button" style={{ "color":"red" }}>{t("posts_create")}</h3></div>}
  </div>
  );
};

const mapStateToPros = (state) => ({
  savePost: state.post.savePost,
  fileUpload: state.post.fileUpload,
  searchUser: state.home.searchUser,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(withNamespaces()(CreatePostIndex));
