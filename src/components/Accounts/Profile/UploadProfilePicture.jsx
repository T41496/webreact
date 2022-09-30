import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Image, Button } from "react-bootstrap";
import "./UploadProfilePicture.css";
import { connect } from "react-redux";
import { withNamespaces } from 'react-i18next';

import {
  updateUserDetailsStart,
  fetchUserDetailsStart,
} from "../../../store/actions/UserAction";

const UploadProfilePicture = (props) => {
  const [profileInputData, setProfileInputData] = useState({});

  const [image, setImage] = useState({
    picture: "",
    cover: "",
  });

  useEffect(() => {
    if (props.profile.loading) props.dispatch(fetchUserDetailsStart());
  }, []);

  const handleChangeImage = (event) => {
    if (event.currentTarget.type === "file") {
      setProfileInputData({
        ...profileInputData,
        [event.currentTarget.name]: event.currentTarget.files[0],
      });
      let reader = new FileReader();
      let file = event.currentTarget.files[0];

      if (event.currentTarget.name === "picture") {
        reader.onloadend = () => {
          setImage({ ...image, picture: reader.result });
        };
      }

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (Object.keys(profileInputData).length > 0)
      props.dispatch(updateUserDetailsStart(profileInputData));
    else props.dispatch(updateUserDetailsStart());
  };

  const { t } = props;

  return (
    <>
      <div className="document-upload-sec">
        <Container>
          <h4 className="head-title">{t("upload_profile_picture")}</h4>
          <div className="upload-profile-picture-card">
            <Row>
              <Col md={6}>
                <div className="upload-profile-picture-sec">
                  <Form className="upload-profile-img-form">
                    <Form.Group>
                      <input type="file" id="file" />
                      <Form.Control
                        className="hidden-input"
                        id="changePicture"
                        type="file"
                        accept="image/*"
                        name="picture"
                        onChange={handleChangeImage}
                      />
                      <Form.Label
                        for="file"
                        className="hidden-input"
                        id="changePicture"
                        type="file"
                        title="Change picture"
                      >
                        <Image
                          src={
                            image.picture === ""
                              ? window.location.origin +
                                "/images/mysecrets_avatar_square_image.png"
                              : image.picture
                          }
                          className="upload-profile-picture-img"
                        />
                        <div className="edit-icon-sec">
                          <i className="fas fa-upload"></i>
                        </div>
                      </Form.Label>
                    </Form.Group>
                  </Form>
                </div>
              </Col>
              <Col md={6}>
                <div className="upload-profile-info">
                  <h2 className="title">{t("profile_photo")}</h2>
                  <p className="desc">{t("profile_photo_para")}</p>
                  <Button
                    className="upload-profile-img-btn btn-block"
                    onClick={handleSubmit}
                  >
                    {t("submit")}
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

const mapStateToPros = (state) => ({
  profile: state.users.profile,
  profileInputData: state.users.profileInputData,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(withNamespaces()(UploadProfilePicture));
