import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Dropdown,
  Image,
  Media,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { connect } from "react-redux";
import {
  addMessageContent,
  fetchChatMessageStart,
  fetchChatUsersStart,
} from "../../store/actions/ChatAction";
import ChatUserList from "./ChatUserList";
import InboxNoDataFound from "../NoDataFound/InboxNoDataFound";
import io from "socket.io-client";
import configuration from "react-global-configuration";
import { withNamespaces } from "react-i18next";
import SendTipModal from "../helper/SendTipModal";
import ReactPlayer from "react-player/lazy";
import InboxLoader from "../Loader/InboxLoader";
import { getErrorNotificationMessage } from "../helper/NotificationMessage";
import { createNotification } from "react-redux-notify/lib/modules/Notifications";
import VerifiedBadgeNoShadow from "../Handlers/VerifiedBadgeNoShadow";
import api from "../../Environment";
import UploadMediaModal from "../helper/UploadMediaModal";
import { minutesToHours } from "date-fns";
import Compress from "react-image-file-resizer";
import moment from 'moment';

const $ = window.$;

let chatSocket;

let mediaRecorder;

const MessageIndex = (props) => {
  const [activeChat, setActiveChat] = useState(0);
  const [toUserId, setToUserId] = useState(0);

  const [toName, setToName] = useState("");
  const [toUserName, setToUserName] = useState("");
  const [toUserPicture, setToUserPicture] = useState("");

  const [inputMessage, setInputMessage] = useState("");
  const [inputFile, setInputFile] = useState("");
  const [inputType, setInputType] = useState("");
  const [initialHeight, setInitialHeight] = useState(0);
  const [sendTip, setSendTip] = useState(false);
  const [uploadMedia, setUploadMedia] = useState(false);
  const messageRef = useRef();
  const [startRecordStatus, setstartRecordStatus] = useState(true);



  useEffect(() => {
    props.dispatch(fetchChatUsersStart());
    let chatSocketUrl = configuration.get("configData.chat_socket_url");
    if (chatSocketUrl === "") {
      const notificationMessage = getErrorNotificationMessage(
        "Socket URL is not configured. Chat wil not work..."
      );
      props.dispatch(createNotification(notificationMessage));
      window.location.assign("/home");
    }
    if (messageRef.current) {
      messageRef.current.scrollIntoView(
        {
          behavior: 'smooth',
          block: 'end',
          inline: 'nearest'
        })
    }
  }, []);

  useEffect(() => {
    console.log("Number of times called");
    if (
      props.chatUsers.loading === false &&
      props.chatUsers.data.users.length > 0
    ) {
      console.log("Number of times called true  ");
      console.log(props.chatUsers.data.users[0]);
      setToUserId(props.chatUsers.data.users[0].to_user_id);

      setToUserName(props.chatUsers.data.users[0].to_username);
      setToUserPicture(props.chatUsers.data.users[0].to_userpicture);
      setToName(props.chatUsers.data.users[0].to_user.name);


      chatSocketConnect(props.chatUsers.data.users[0].to_user_id);
    } else {
    }
  }, [!props.chatUsers.loading]);

  // Scroll down function..
  useEffect(() => {
    console.log("Scroll down..");
    const objDiv = document.getElementById("options-holder");
    if (objDiv != null) {
      let differenceNumber =
        objDiv.offsetHeight > objDiv.scrollHeight
          ? objDiv.offsetHeight - objDiv.scrollHeight
          : objDiv.scrollHeight - objDiv.offsetHeight;

      if (differenceNumber > 280) {
        objDiv.scrollTop = objDiv.scrollHeight;
      } else {
        objDiv.scrollTop = initialHeight;
        setInitialHeight(initialHeight + 20);
      }
    }
  }, [props.chatMessages.data.messages]);


  useEffect(() => {





  }, []);



  const startRecording = (e) => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      console.log('getUserMedia supported.');
      console.log("start", startRecordStatus);
      navigator.mediaDevices.getUserMedia(
        // constraints - only audio needed for this app
        {
          audio: true
        })

        // Success callback
        .then(function (stream) {
          gotMedia(stream);
        })

        // Error callback
        .catch(function (err) {
          console.log('The following getUserMedia error occurred: ' + err);
        }
        );
    } else {
      console.log('getUserMedia not supported on your browser!');
    }
    console.log("end", startRecordStatus);
  }

  const gotMedia = (stream) => {
    setstartRecordStatus(false);
    var options = {
      mimeType: 'video/webm;codecs=vp8'

    }

    if (MediaRecorder.isTypeSupported('audio/mp3')) {
      mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/mp3' });
      console.log(mediaRecorder);

    } else if (MediaRecorder.isTypeSupported('video/webm;codecs=vp8')) {
      mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp8' });
      console.log(mediaRecorder);

    } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
      mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/mp4' });
      console.log(mediaRecorder);

    }
    else {
      mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp9' });
      console.log(mediaRecorder);

    }

    mediaRecorder.start();
    console.log(mediaRecorder.state);
    console.log("recorder started");


    console.log('mediaRecorder mimetype');
    console.log(mediaRecorder.mimeType);


    mediaRecorder.ondataavailable = function (e) {
      console.log('available data');
      console.log(e.data);
      let chunks = [];
      chunks.push(e.data);

      console.log(mediaRecorder.state);
      console.log("recorder stopped");
      console.log(chunks);
      if (mediaRecorder.state == "inactive") {
        const audioFile = new Blob(chunks, { 'type': "audio/mp3" });
        let chatData = [];
        console.log('audio file:');
        console.log(audioFile);
        if (audioFile) {
          let reader = new FileReader();
          reader.readAsDataURL(audioFile);

          console.log(reader);
          reader.onload = function () {
            console.log('audio file format cyeck in filereader:');
            console.log(reader.result);
            console.log('message mp4 format:');
            console.log((reader.result).split(',')[0]);
            console.log('message content:');
            console.log((reader.result).split(',')[1]);
            chatData = [
              {
                from_user_id: localStorage.getItem("userId"),
                to_user_id: toUserId,
                message: (reader.result).split(',')[1],
                file: reader.result,
                file_type: audioFile.type,
                message_type: 'audio',
                type: "uu",
                user_picture: localStorage.getItem("user_picture"),
                loggedin_user_id: localStorage.getItem("userId"),
                created: moment(Date()).fromNow(),
                from_username: localStorage.getItem("username"),
                from_displayname: localStorage.getItem("name"),
                from_userpicture: localStorage.getItem("user_picture"),
                from_user_unique_id: "",
                to_username: "",
                to_displayname: "",
                to_userpicture: "",
                to_user_unique_id: "",
              },
            ];
            chatSocket.emit("message", chatData[0]);
            let messages;
            if (props.chatMessages.data.messages != null) {
              messages = [...props.chatMessages.data.messages, ...chatData];
            } else {
              messages = [...chatData];
            }
            console.log(messages)

            setInputMessage("");
            props.dispatch(addMessageContent(chatData));
          };
          reader.onerror = function (error) {
            console.log('Error: ', error);
          };
        }

      }

    }

  }


  const stopRecording = (e) => {
    setstartRecordStatus(true);

    console.log(mediaRecorder.state);
    mediaRecorder.stop();
    console.log(mediaRecorder.state);





  }


  const closeSendTipModal = () => {
    setSendTip(false);
  };

  const chatSocketConnect = (to_user_id) => {
    // check the socket url is configured
    let chatSocketUrl = configuration.get("configData.chat_socket_url");
    console.log("chatSocket", chatSocketUrl);
    console.log("Input ID", to_user_id);
    if (chatSocketUrl) {
      chatSocket = io(chatSocketUrl, {
        query:
          `commonid:'user_id_` +
          localStorage.getItem("userId") +
          `_to_user_id_` +
          to_user_id +
          `',myid:` +
          localStorage.getItem("userId"),
      });
      console.log("chatSocket", chatSocket);
      chatSocket.emit("update sender", {
        commonid:
          "user_id_" +
          localStorage.getItem("userId") +
          "_to_user_id_" +
          to_user_id,
        myid: localStorage.getItem("userId"),
      });
      let chatContent;
      chatSocket.on("message", (newData) => {
        let content = [];
        content.push(newData);
        // chatContent = [...this.state.chatData, ...content];
        // this.setState({ chatData: chatContent });
        console.log(content);
        props.dispatch(addMessageContent(content));
      });
    }
  };

  const changeUser = (event, chat, index) => {
    chatSocket.disconnect();
    event.preventDefault();
    setActiveChat(index);
    let to_user_id =
      chat.to_user_id == localStorage.getItem("userId")
        ? chat.from_user_id
        : chat.to_user_id;
    setToUserId(to_user_id);

    setToUserName(chat.to_username);
    setToUserPicture(chat.to_userpicture);
    setToName(chat.to_user.name);


    props.dispatch(
      fetchChatMessageStart({
        to_user_id: chat.to_user_id,
        from_user_id: chat.from_user_id,
      })
    );
    chatSocketConnect(to_user_id);
  };

  const handleChatSubmit = (event, type) => {
    event.preventDefault();
    let chatSocketUrl = configuration.get("configData.chat_socket_url");

    if (chatSocketUrl != undefined) {
      let chatData = [];
      if (type == 'text' && inputMessage) {
        chatData = [
          {
            from_user_id: localStorage.getItem("userId"),
            to_user_id: toUserId,
            message: inputMessage,
            message_type: type,
            type: "uu",
            user_picture: localStorage.getItem("user_picture"),
            loggedin_user_id: localStorage.getItem("userId"),
            created: moment(Date()).fromNow(),
            from_username: localStorage.getItem("username"),
            from_displayname: localStorage.getItem("name"),
            from_userpicture: localStorage.getItem("user_picture"),
            from_user_unique_id: "",
            to_username: "",
            to_displayname: "",
            to_userpicture: "",
            to_user_unique_id: "",
          },
        ];

        chatSocket.emit("message", chatData[0]);
        let messages;
        if (props.chatMessages.data.messages != null) {
          messages = [...props.chatMessages.data.messages, ...chatData];
        } else {
          messages = [...chatData];
        }
        console.log('******************************************', messages)

        setInputMessage("");
        props.dispatch(addMessageContent(chatData));
      } else if (inputFile && type != 'text') {

        console.log('input files:');
        console.log(inputFile);
        if (!(inputFile.type)) {
          var type_file = (inputFile).split(';')[0];
          var type_data = (inputFile).split('/')[0];
          console.log((type_data).split(':')[1]);
          if ((type_data).split(':')[1] == 'image') {
            // if((inputFile.type).split('/')[0] == 'image'){      
            // var reader = new FileReader();

            // reader.readAsBinaryString(inputFile); 
            // reader.onloadend = function() {
            // console.log(reader.result);
            chatData = [
              {
                from_user_id: localStorage.getItem("userId"),
                to_user_id: toUserId,
                message: (inputFile).split(',')[1],
                file: inputFile,
                file_type: (type_file).split(':')[1],
                message_type: type,
                type: "uu",
                user_picture: localStorage.getItem("user_picture"),
                loggedin_user_id: localStorage.getItem("userId"),
                created: moment(Date()).fromNow(),
                from_username: localStorage.getItem("username"),
                from_displayname: localStorage.getItem("name"),
                from_userpicture: localStorage.getItem("user_picture"),
                from_user_unique_id: "",
                to_username: "",
                to_displayname: "",
                to_userpicture: "",
                to_user_unique_id: "",
              },
            ];
            chatSocket.emit("message", chatData[0]);
            let messages;
            console.log('messages:')
            console.log(chatData[0]);

            if (props.chatMessages.data.messages != null) {
              messages = [...props.chatMessages.data.messages, ...chatData];
            } else {
              messages = [...chatData];
            }
            console.log(messages)

            setInputMessage("");
            props.dispatch(addMessageContent(chatData));

            // }

          }
        } else {

          let reader = new FileReader();
          reader.readAsDataURL(inputFile);
          reader.onload = function () {
            chatData = [
              {
                from_user_id: localStorage.getItem("userId"),
                to_user_id: toUserId,
                message: (reader.result).split(',')[1],
                file: reader.result,
                file_type: inputFile.type,
                message_type: type,
                type: "uu",
                user_picture: localStorage.getItem("user_picture"),
                loggedin_user_id: localStorage.getItem("userId"),
                created: moment(Date()).fromNow(),
                from_username: localStorage.getItem("username"),
                from_displayname: localStorage.getItem("name"),
                from_userpicture: localStorage.getItem("user_picture"),
                from_user_unique_id: "",
                to_username: "",
                to_displayname: "",
                to_userpicture: "",
                to_user_unique_id: "",
              },
            ];
            chatSocket.emit("message", chatData[0]);
            let messages;
            if (props.chatMessages.data.messages != null) {
              messages = [...props.chatMessages.data.messages, ...chatData];
            } else {
              messages = [...chatData];
            }
            console.log(messages)

            setInputMessage("");
            props.dispatch(addMessageContent(chatData));
          };
          reader.onerror = function (error) {
            console.log('Error: ', error);
          };
        }
      }
    }
  };

  const chatInputChange = (value) => {
    setInputMessage(value);
  };

  const closeUploadMediaModal = () => {
    setUploadMedia(false);
  };

  const handleMedia = (event) => {
    setUploadMedia(true);
  }

  const handleSendTip = (event) => {
    setSendTip(true);
  }

  const { t } = props;

  return (
    <div className="message-page">
      <Container>
        <Row>
          {props.chatUsers.loading ? (
            <InboxLoader></InboxLoader>
          ) : props.chatUsers.data.users.length > 0 ? (
            <ChatUserList
              chatUsers={props.chatUsers.data}
              activeChat={activeChat}
              setActiveChat={setActiveChat}
              changeUser={changeUser}
            />
          ) : (
            <InboxNoDataFound />
          )}
          <Col
            sm={12}
            md={12}
            lg={7}
            xl={8}
            className="resp-mrg-btn-xs margin-col col-sm-8"
          >
            {props.chatMessages.loading ? (
              ""
            ) : (
              <Row className="msg-row-chat">
                <div className="msg-header">
                  {/* <Button className="chat-header-back">
                    <Image
                      src="/assets/images/icons/back.svg"
                      className="svg-clone"
                    />
                  </Button> */}
                  <h1 className="chat-section-title">
                    <div className="chat-section-title-width">
                      <Link
                        to={`/` + props.chatMessages.data.user.user_unique_id}
                        className="chat-user-name"
                      >
                        {props.chatMessages.data.user.name}{" "}
                        {props.chatMessages.data.user.is_verified_badge == 1 ? (
                          // <img
                          //   className="verified-badge"
                          //   alt="verified-badge"
                          //   src={
                          //     window.location.origin +
                          //     "/assets/images/verified.svg"
                          //   }
                          // />
                          <VerifiedBadgeNoShadow />
                        ) : null}
                      </Link>
                    </div>
                  </h1>
                  <span
                    className="post-icons padding-top-lg"
                    style={{ display: "none" }}
                  >
                    <Dropdown>
                      <Dropdown.Toggle
                        className="btn btn-default dropdown-toggle"
                        type="button"
                        id="dropdown-basic"
                      >
                        <Image
                          src="/assets/images/icons/vertical-dots.svg"
                          className="svg-clone vertical-dots"
                        />
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="dropdown-menu dropdown-menu-right">
                        <Media as="li">
                          <Link to="#"> {t("copy_link_to_post")} </Link>
                        </Media>
                        <Media as="li">
                          <Link to="#">
                            {" "}
                            {t("hide_paid_blurred_from_the_home_feed")}{" "}
                          </Link>
                        </Media>
                        <Media as="li" className="divider"></Media>
                        <Media as="li">
                          <Link to="#"> {t("i_dont_like_this_post")} </Link>
                        </Media>
                        <Media as="li">
                          <Link to="#"> {t("hide_users_posts_from_feed")} </Link>
                        </Media>
                      </Dropdown.Menu>
                    </Dropdown>
                  </span>
                  <div className="chat-subheader hidden">
                    <div className="chat-user-status">
                      {t("last_seen")} <span title="Sep 7, 3:12 pm"> 1 {t("hour_ago")} </span>
                    </div>

                    <Button type="button" className="chat-subheader-btn">
                      <Image
                        src="/assets/images/icons/star.svg"
                        className="svg-clone"
                        width="12"
                      />
                    </Button>
                    <Button type="button" className="chat-subheader-btn">
                      <Image
                        src="/assets/images/icons/notification.svg"
                        className="svg-clone"
                        width="12"
                      />
                    </Button>
                    <Button type="button" className="chat-subheader-btn">
                      <Image
                        src="/assets/images/icons/gallery.svg"
                        className="svg-clone"
                        width="12"
                      />

                      <span>{t("gallery")}</span>
                    </Button>
                    <Button type="button" className="chat-subheader-btn">
                      <Image
                        src="/assets/images/icons/search.svg"
                        className="svg-clone"
                        width="12"
                      />

                      <span>{t("find")}</span>
                    </Button>
                  </div>
                </div>

                <div className="chat-area">
                  <div className="chat-wrapper scrollbar" id="options-holder">
                    <div className="chat-message padding overflow-height" id="check" ref={messageRef}>
                      {props.chatMessages.data.messages.length > 0
                        ? props.chatMessages.data.messages.map(
                          (chatMessage, index) => (
                            <>
                              {chatMessage.from_user_id ==
                                localStorage.getItem("userId") ? (
                                <div className="chat-message chat-message-sender">
                                  <Image
                                    className="chat-image chat-image-default"
                                    src={(localStorage.getItem("user_picture") != 'null') ? (api.serviceUrl() + '/' + localStorage.getItem("user_picture")) : (api.serviceUrl() + '/images/mysecrets_avatar_square_image.png')}
                                  />

                                  <div className="chat-message-wrapper">
                                    <div className="chat-message-content">
                                      {chatMessage.message_type == 'text' ?
                                        (<p>{chatMessage.message}</p>)
                                        : (chatMessage.message_type == 'image') ? (<Image src={((chatMessage.from_user) ? (api.serviceUrl() + '/' + chatMessage.message) : chatMessage.file)} />) : ((chatMessage.message_type == 'video') ? (<ReactPlayer
                                          light={(api.serviceUrl() + '/' + chatMessage.thumbnail)}
                                          url={((chatMessage.from_user) ? (api.serviceUrl() + '/' + chatMessage.message) : chatMessage.file)}
                                          controls={true}
                                          width="100%"
                                          height="100%"
                                          className="post-video-size"
                                          playing='play'
                                        />) : (<ReactPlayer
                                          light={(api.serviceUrl() + '/' + chatMessage.thumbnail)}
                                          url={((chatMessage.from_user) ? (api.serviceUrl() + '/' + chatMessage.message) : chatMessage.file)}
                                          controls={true}
                                          className="post-video-size"
                                          playing='play'
                                        />))
                                      }
                                    </div>

                                    <div className="chat-details">
                                      <span className="chat-message-localization font-size-small">
                                        {chatMessage.created}
                                      </span>
                                      <span className="chat-message-read-status font-size-small"></span>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className="chat-message chat-message-recipient">
                                  <Image
                                    className="chat-image chat-image-default"
                                    src={props.chatMessages.data.user.picture ? (api.serviceUrl() + '/' + props.chatMessages.data.user.picture) : (api.serviceUrl() + '/images/mysecrets_avatar_square_image.png')}
                                  />

                                  <div className="chat-message-wrapper">
                                    <div className="chat-message-content">
                                      {chatMessage.message_type == 'text' ?
                                        (<p>{chatMessage.message}</p>)
                                        : (chatMessage.message_type == 'image') ? (<Image src={((chatMessage.from_user) ? (api.serviceUrl() + '/' + chatMessage.message) : chatMessage.file)} />) : ((chatMessage.message_type == 'video') ? (<ReactPlayer
                                          light={(api.serviceUrl() + '/' + chatMessage.thumbnail)}
                                          url={((chatMessage.from_user) ? (api.serviceUrl() + '/' + chatMessage.message) : chatMessage.file)}
                                          controls={true}
                                          width="100%"
                                          height="100%"
                                          className="post-video-size"
                                          playing='play'
                                        />) : (<ReactPlayer
                                          light={(api.serviceUrl() + '/' + chatMessage.thumbnail)}
                                          url={((chatMessage.from_user) ? (api.serviceUrl() + '/' + chatMessage.message) : chatMessage.file)}
                                          controls={true}
                                          className="post-video-size"
                                          playing='play'
                                        />))
                                      }
                                    </div>

                                    <div className="chat-details">
                                      <span className="chat-message-localization font-size-small">
                                        {chatMessage.created}
                                      </span>
                                      {/* <span className="chat-message-read-status font-size-small">
                                          , $69 not paid yet
                                        </span> */}
                                    </div>
                                  </div>
                                </div>
                              )}{" "}
                            </>
                          )
                        )
                        : ""}
                    </div>
                  </div>

                  <div className="send-option-col"
                    style={{ borderTop: "1px solid rgba(138, 150, 163, 0.2)" }}
                  >
                    <Form
                      id="chat_post_form"
                      className="has-advanced-upload"
                      onSubmit={(event) => handleChatSubmit(event, 'text')}
                    >
                      <div className="chats-post-footer">
                        <div></div>
                        <div className="chat-post">
                          <div className="chat-textarea-price-wrapper">
                            <InputGroup className="mb-3">
                              <FormControl
                                controlId="chat-input-area"
                                placeholder="Type a message"
                                name="text"
                                rows="1"
                                className="form-control chat-input"
                                style={{
                                  overflow: "hidden",
                                  overflowWrap: "break-word",
                                  height: "48px",
                                }}
                                value={inputMessage}
                                onChange={(event) => {
                                  chatInputChange(event.currentTarget.value);
                                }}
                              />
                              <InputGroup.Append>
                                <InputGroup.Text id="basic-addon2">
                                  {startRecordStatus ? <Button onClick={e => startRecording(e)} style={{backgroundColor:'white'}}>
                                    <Image
                                      src="/assets/images/icons/audio.svg"
                                      className="svg-clone"
                                    />
                                  </Button> :
                                    <Button onClick={e => stopRecording(e)}>
                                      <Image
                                      src="/assets/images/icons/mute.svg"
                                      className="svg-clone"
                                      />
                                    </Button>} 
                                </InputGroup.Text>
                              </InputGroup.Append>
                              <InputGroup.Append>
                                <InputGroup.Text id="basic-addon2">
                                  <Button
                                    type="button"
                                    onClick={() => handleMedia()}
                                    style={{backgroundColor:'white'}}
                                  >
                                    <Image
                                    src="/assets/images/icons/gallery.svg"
                                    className="svg-clone"
                                  />
                                  </Button>
                                </InputGroup.Text>
                              </InputGroup.Append>
                              <InputGroup.Append>
                                <InputGroup.Text id="basic-addon2">
                                  <Button
                                    type="button"
                                    data-can_send="true"
                                    onClick={(event) => handleChatSubmit(event, 'text')}
                                    style={{backgroundColor:'white'}}
                                  >
                                    <Image
                                      src="/assets/images/icons/send.svg"
                                      className="svg-clone"
                                    />
                                  </Button>
                                </InputGroup.Text>
                              </InputGroup.Append>
                              <InputGroup.Append>
                                <InputGroup.Text id="basic-addon3">
                                  <Button
                                    type="button"
                                    style={{backgroundColor:'white',borderColor:'white'}}
                                    onClick={() => handleSendTip(true)}
                                  >
                                    <Image
                                      src={
                                        window.location.origin + "/assets/images/icons/tip.svg"
                                      }
                                      className="svg-clone"
                                    />
                                    <span className="post-tip" style={{color:'#E85DBE'}}></span>
                                  </Button>
                                </InputGroup.Text>
                              </InputGroup.Append>
                            </InputGroup>
                          </div>

                          {/* <div className="chat-post__actions">
                            <FormControl
                              id="fileupload_photo"
                              type="file"
                              multiple="multiple"
                              accept=".gif,.jpg,.jpeg,.gif,.png,.jpg,.jpeg,.png,.mp4,.mov,.moov,.m4v,.mpg,.mpeg,.wmv,.avi,.webm,.mkv,.stream,.mp3,.wav,.ogg"
                              onChange={(event) => handleMedia(event)}
                            />
                            <label
                              id="attach_file_photo"
                              for="fileupload_photo"
                              className="chat-attach_file"
                              data-original-title="null"
                            >
                              <Image
                                src="/assets/images/icons/gallery.svg"
                                className="svg-clone"
                              />
                            </label>

                            <Button
                              type="button"
                              className="chat-send-tip-btn"
                              data-original-title="null"
                            >
                              <Image
                                src="/assets/images/icons/tip.svg"
                                className="svg-clone"
                              />
                            </Button>
                          </div> */}
                        </div>
                      </div>
                    </Form>
                    
                  </div>

                </div>
              </Row>
            )}
          </Col>
        </Row>
      </Container>
      <UploadMediaModal uploadMediaModal={uploadMedia} closeUploadMediaModal={closeUploadMediaModal} setInputFile={setInputFile} setInputType={setInputType} handleChatSubmit={handleChatSubmit} />

      <SendTipModal
        sendTip={sendTip}
        closeSendTipModal={closeSendTipModal}
        post_id={null}
        user_id={toUserId}
        username={toUserName}
        userPicture={toUserPicture}
        name={toName}
      />

    </div>
  );
};

const mapStateToPros = (state) => ({
  chatUsers: state.chat.chatUsers,
  chatMessages: state.chat.messages,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(withNamespaces()(MessageIndex));
