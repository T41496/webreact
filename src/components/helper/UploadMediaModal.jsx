import React, { useState } from "react";
import { Form, Button, Image, Modal, FormControl } from "react-bootstrap";
import { connect } from "react-redux";
import {
  sendTipStripeStart,
  sendTipWalletStart,
  sendTipPaypalStart,
} from "../../store/actions/SendTipAction";
import configuration from "react-global-configuration";

import PaypalExpressBtn from "react-paypal-express-checkout";
import { createNotification } from "react-redux-notify";
import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../../components/helper/NotificationMessage";
import ReactPlayer from "react-player/lazy";
import { withNamespaces } from 'react-i18next';
import api from "../../Environment";
import { useStripe } from "@stripe/react-stripe-js";
import Compress from "react-image-file-resizer";

const UploadMediaModal = (props) => {
  const [media, setMedia] = useState('');
  const [type, setType] = useState('');
  const [image, setImage] = useState('');
  const [video, setVideo] = useState('');

  const [btn, setBtn] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    props.closeUploadMediaModal();
    props.handleChatSubmit(event, type);
    setImage('');
    setVideo('');
  };

  const handleClose = (event) => {
    event.preventDefault();
    props.closeUploadMediaModal();
    setImage('');
    setVideo('');
    setBtn(true);

  };

  const handleMedia = (event) => {
    setBtn(true);
    // props.setInputFile(event.currentTarget.files[0]);
    setType((event.currentTarget.files[0].type).split('/')[0]);

      console.log('original file:');
      console.log(event.currentTarget.files[0]);
      if((event.currentTarget.files[0].type).split('/')[0] == 'image') {

            Compress.imageFileResizer(
              event.currentTarget.files[0], // the file from input
              350, // width
              350, // height
              'JPEG',
              // (inputFile.type).split('/')[1], // compress format WEBP, JPEG, PNG
              100, // quality
              0, // rotation
              (uri) => {
                console.log('compress file:');
                console.log(uri);
                var binaryData = [];
                binaryData.push(uri);
                
                props.setInputFile(uri);

          
          
            setVideo('');
            setImage(binaryData);
            // setImage(URL.createObjectURL(event.currentTarget.files[0]));
          },
          "base64" // blob or base64 default base64
        )
      } else {
            var totalBytes = event.currentTarget.files[0].size;
            if(totalBytes < 500000){
               var _size = Math.floor(totalBytes/1000) + 'KB';
                //alert(_size);
            }else{
               var mb_size = Math.floor(totalBytes/1000000);  
             // alert(mb_size);
            }
            if(mb_size >= 2){
              setBtn(false);

 
            }
          console.log('video file');
          console.log(URL.createObjectURL(event.currentTarget.files[0]));
          setImage('');
          props.setInputFile(event.currentTarget.files[0]);

          setVideo(URL.createObjectURL(event.currentTarget.files[0]))
      }
      
  }

  const { t } = props;

  return (
    <>
      <Modal
        className="modal-dialog-center sent-tip-modal"
        size="md"
        centered
        show={props.uploadMediaModal}
        onHide={props.closeUploadMediaModal}
      >
        {props.uploadMediaModal === true ? (
          <Form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>{t("upload_media")}</Modal.Title>
             {/* {btn? '' : <span className="upload-alert-msg">*File size lessthan 2MB only allowed</span>}  */}
            </Modal.Header>
            <Modal.Body>
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
                {image ?
                <Image
                  src={image}
                  className="svg-clone upload-media-img"
                />
                : ''}
                {video ?
                <ReactPlayer
                  url={video}
                  controls={true}
                  width="100%"
                  height="100%"
                  className="post-video-size"
                  playing='play'
                />
                : ''}
              </label>
            </Modal.Body>
            <Modal.Footer>
              <Button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={handleClose}
              >
                {t("cancel")}
              </Button>
              {/* {btn ? */}
              <Button
                type="button"
                className="btn btn-success"
                data-dismiss="modal"
                onClick={handleSubmit}
              >
                {t("send")}
              </Button>
              {/* : ''} */}
            </Modal.Footer>
          </Form>
        ) : null}
      </Modal>
    </>
  );
};

const mapStateToPros = (state) => ({
  tipStripe: state.tip.tipStripe,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(withNamespaces()(UploadMediaModal));
