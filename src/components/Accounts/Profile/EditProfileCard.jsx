import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Form, Button, Image } from "react-bootstrap";
import configuration from "react-global-configuration";
import { withNamespaces } from 'react-i18next';

import {
  editUserDetails,
  fetchUserDetailsStart,
  updateUserDetailsStart,
  usernameValidationStart,
} from "../../../store/actions/UserAction";
import api from "../../../Environment";
import Autocomplete,{usePlacesWidget} from "mac-react-google-autocomplete";

const EditProfileCard = (props) => {
  const [profileInputData, setProfileInputData] = useState({});

  const [image, setImage] = useState({
    picture: "",
    cover: "",
  });

  const [changePicture, setChangePicture] = useState(0);

  const [changeCover, setChangeCover] = useState(0);

  const { ref: bootstrapRef } = usePlacesWidget({
    apiKey: configuration.get("configData.map_key"),
    onPlaceSelected: (place) => {
      console.log(place.formatted_address);
    },
    options: {
      types: "geocode"
    },
  });

  const [locationData, setLocationData] = useState(localStorage.getItem('userAddress'));

  useEffect(() => {
    if (props.profile.loading) props.dispatch(fetchUserDetailsStart());
  }, []);

  const handleUsernameValidation = (event, username, value) => {
    props.dispatch(editUserDetails(username, value));
    props.dispatch(usernameValidationStart({ username: value }));
  };

  const handleChangeImage = (event) => {
    if (event.currentTarget.type === "file") {
      setProfileInputData({
        ...profileInputData,
        [event.currentTarget.name]: event.currentTarget.files[0],
      });
      let reader = new FileReader();
      let file = event.currentTarget.files[0];

      if (event.currentTarget.name === "cover") {
        setChangeCover(1);
        reader.onloadend = () => {
          setImage({ ...image, cover: reader.result });
        };
      }

      if (event.currentTarget.name === "picture") {
        setChangePicture(1);
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
      {props.profile.loading ? (
        t("loading")
      ) : (
        <div
          role="tabpanel"
          className={
            props.activeSec === "profile-card"
              ? "tab-pane fade in active"
              : "tab-pane fade"
          }
          id="Section2"
        >
          <div className="profile-post-area">
            <div className="bookmarkes-list bookmarks-right-side border-btm-none">
              <div className="pull-left">
                <h3>{t("edit_profile")}</h3>
                <p className="small-text">{t("change_photo")}</p>
              </div>
              <div className="pull-right"></div>
            </div>
          </div>
          <div className="edit-profile-photo">
            <div className="profile large">
              <div className="cover">
                <Image
                  src={(changeCover == 0) ? (props.profile.data.cover ? (api.serviceUrl()+'/'+props.profile.data.cover) : (api.serviceUrl()+'/images/mysecrets_avatar_square_image.png')) : image.cover}
                />

                <div className="layer">
                  <div className="loader"></div>
                </div>
                <a className="image-wrapper" href="#">
                  <Form id="coverForm" action="#">
                    <Form.Control
                      className="hidden-input"
                      id="changeCover"
                      type="file"
                      name="cover"
                      accept="image/*"
                      onChange={handleChangeImage}
                    />
                    <Form.Label
                      className="edit "
                      for="changeCover"
                      title="Change cover"
                    >
                      {t("upload_cover_image")}
                    </Form.Label>
                  </Form>
                </a>
              </div>
              <div className="user-info">
                <div className="profile-pic">
                  <Image
                    src={(changePicture == 0) ? (props.profile.data.picture ? (api.serviceUrl()+'/'+props.profile.data.picture) : (api.serviceUrl()+'/images/mysecrets_avatar_square_image.png')) : image.picture}
                  />
                  <div className="layer">
                    <div className="loader"></div>
                  </div>
                  <a className="image-wrapper" href="#">
                    <Form id="profile-img" action="#">
                      <Form.Control
                        className="hidden-input"
                        id="changePicture"
                        type="file"
                        accept="image/*"
                        name="picture"
                        onChange={handleChangeImage}
                      />
                      <Form.Label
                        className="edit"
                        for="changePicture"
                        type="file"
                        title="Change picture"
                      ></Form.Label>
                    </Form>
                  </a>
                </div>
                <a className="upload-profile-picture">
                  <Form id="profilePictureForm" action="#">
                    <Form.Control
                      className="hidden-input"
                      id="changePicture"
                      type="file"
                      name="picture"
                      onChange={handleChangeImage}
                    />
                    <Form.Label
                      className="edit"
                      for="changePicture"
                      type="file"
                      title="Change picture"
                    >
                      {t("upload_profile_photo")}
                    </Form.Label>
                  </Form>
                </a>
              </div>
            </div>
            <p className="inuput-help">{t("upload_profile_photo_para")}</p>
          </div>
          <div
            className="edit-input-wrapper"
            data-vv-delay="1000"
            data-vv-as="username"
          >
            <Form.Label className="edit-input-label">
              {t("username")}{" "}
              <span className="edit-input-optional">({t("optional")})</span>
            </Form.Label>
            <div className="">
              <Form.Control
                id="username"
                type="text"
                placeholder=""
                name="username"
                value={props.profile.data.username}
                className="form-control edit-reset"
                onChange={(event) =>
                  handleUsernameValidation(
                    event,
                    event.currentTarget.name,
                    event.currentTarget.value
                  )
                }
                isValid={props.validation.isValid}
                isInvalid={props.validation.isInValid}
              />
              {props.validation.isInValid ? (
                <Form.Control.Feedback type="invalid">
                  {t("username_error")}
                </Form.Control.Feedback>
              ) : (
                ""
              )}
              {props.validation.isValid ? (
                <Form.Control.Feedback>{t("looks_good")}</Form.Control.Feedback>
              ) : (
                ""
              )}
            </div>
            <p className="input-help">
              {window.location.origin + "/" + props.profile.data.username}
            </p>
          </div>
          <div
            className="edit-input-wrapper"
            data-vv-delay="1000"
            data-vv-as="Display Name"
          >
            <Form.Label className="edit-input-label">
              {t("display_name")}
              <span className="edit-input-optional">({t("optional")})</span>
            </Form.Label>
            <div className="">
              <Form.Control
                id="name"
                type="text"
                placeholder=""
                defaultValue={props.profile.data.name}
                name="name"
                className="form-control edit-reset"
                onChange={(event) => {
                  props.dispatch(
                    editUserDetails(
                      event.currentTarget.name,
                      event.currentTarget.value
                    )
                  );
                }}
              />
            </div>
          </div>
          <div
            className="edit-input-wrapper disabled"
            data-vv-delay="1000"
            data-vv-as="monthly_amount"
          >
            <Form.Label className="edit-input-label">
              {t("subscription_price")} ({t("per_month")}{" "}
              {configuration.get("configData.currency_code")})
              <span className="edit-input-optional">({t("optional")})</span>
            </Form.Label>
            <div className="">
              <Form.Control
                id="monthly_amount"
                type="number"
                step="any"
                min="0"
                placeholder=""
                name="monthly_amount"
                className="form-control edit-reset"
                disabled={
                  localStorage.getItem("is_subscription_enabled") == 1
                    ? false
                    : true
                }
                defaultValue={props.profile.data.monthly_amount}
                onChange={(event) => {
                  props.dispatch(
                    editUserDetails(
                      event.currentTarget.name,
                      event.currentTarget.value
                    )
                  );
                }}
              />
            </div>
          </div>
          <div
            className="edit-input-wrapper disabled"
            data-vv-delay="1000"
            data-vv-as="yearly_amount"
          >
            <Form.Label className="edit-input-label">
              {t("subscription_price")} ({t("per_year")}{" "}
              {configuration.get("configData.currency_code")})
              <span className="edit-input-optional">({t("optional")})</span>
            </Form.Label>
            <div className="">
              <Form.Control
                id="yearly_amount"
                type="number"
                step="any"
                min="0"
                placeholder=""
                name="yearly_amount"
                className="form-control edit-reset"
                disabled={
                  localStorage.getItem("is_subscription_enabled") == 1
                    ? false
                    : true
                }
                defaultValue={props.profile.data.yearly_amount}
                onChange={(event) => {
                  props.dispatch(
                    editUserDetails(
                      event.currentTarget.name,
                      event.currentTarget.value
                    )
                  );
                }}
              />
            </div>
            {localStorage.getItem("is_subscription_enabled") == 1 ? (
              <p className="inuput-help">
                {t("you_can_change_the")}
                <Link to={`/add-bank`}>
                  {t("you_can_change_the_para1")}
                </Link>{" "}
                {t("you_can_change_the_para2")}.
              </p>
            ) : (
              <p className="inuput-help">
                {t("you_can_change_the_para3")}
                <Link to={`/add-bank`}>
                  {t("you_can_change_the_para4")}
                </Link>{" "}
                {t("you_can_change_the_para5")}.
              </p>
            )}
          </div>
          <div
            className="edit-input-wrapper disabled"
            data-vv-delay="1000"
            data-vv-as="videocall"
          >
            <Form.Label className="edit-input-label">
              {t("videocall_price")}{" "}
              <span className="edit-input-optional">({t("optional")})</span>
            </Form.Label>
            <div className="">
              <Form.Control
                id="videocall_price"
                type="number"
                autocomplete="off"
                placeholder=""
                value={(props.profile.data.videocall_price)?props.profile.data.videocall_price:0}
                name="videocall_price"
                min="0"
                className="form-control edit-reset"
                onChange={(event) => {
                  props.dispatch(
                    editUserDetails(
                      event.currentTarget.name,
                      event.currentTarget.value
                    )
                  );
                }}
              />
            </div>
          </div>
          <div
            className="edit-input-wrapper disabled"
            data-vv-delay="1000"
            data-vv-as="description"
          >
            <Form.Label className="edit-input-label">
              {t("about")}{" "}
              <span className="edit-input-optional">({t("optional")})</span>
            </Form.Label>
            <div className="">
              <Form.Control
                id="edit-description"
                type="text"
                autocomplete="off"
                placeholder=""
                value={props.profile.data.about}
                name="about"
                className="form-control edit-reset"
                onChange={(event) => {
                  props.dispatch(
                    editUserDetails(
                      event.currentTarget.name,
                      event.currentTarget.value
                    )
                  );
                }}
              />
            </div>
          </div>
          <div className="edit-input-wrapper">
            <input
              id="edit-show_address"
              type="checkbox"
              placeholder=""
              value={props.profile.data.about}
              name="show_address"
              className=""
              checked={(props.profile.data.show_address==1)?true:false}
              onChange={(event) => {
                props.dispatch(
                  editUserDetails(
                    'show_address',
                    (event.currentTarget.checked)?1:0
                  )
                );
              }}
            />
            <Form.Label className="edit-input-label">
              {t("show_location")}
            </Form.Label>
          </div>
          <div
            className="edit-input-wrapper disabled"
            data-vv-delay="1000"
            data-vv-as="Address"
          >
            <Form.Label className="edit-input-label">
              {t("location")}{" "}
              <span className="edit-input-optional">({t("optional")})</span>
            </Form.Label>
            <div className="">
              {/* <Form.Control
                id="edit-address"
                type="text"
                autocomplete="off"
                value={props.profile.data.address}
                placeholder={t("location")}
                name="address"
                className="form-control edit-reset"
                onChange={(event) => {
                  props.dispatch(
                    editUserDetails(
                      event.currentTarget.name,
                      event.currentTarget.value
                    )
                  );
                }}
              /> */}
              <Autocomplete
                className="form-control edit-reset"
                apiKey={configuration.get("configData.map_key")}
                value={locationData}
                onPlaceSelected={(place) => {
                  props.dispatch(editUserDetails('address',place.formatted_address));
                  props.dispatch(editUserDetails('latitude',place.geometry.location.lat()));
                  props.dispatch(editUserDetails('longitude',place.geometry.location.lng()));
                  console.log('loca');
                  setLocationData(place.formatted_address);
                }}
                onChange={(event) => {
                  setLocationData(event.currentTarget.value);
                  console.log('state');
                  if(event.currentTarget.value==''){
                    props.dispatch(editUserDetails('address',''));
                    props.dispatch(editUserDetails('latitude',''));
                    props.dispatch(editUserDetails('longitude',''));
                  }
                }}
                options={{
                  types: "geocode",
                }}
              />
            </div>
          </div>
          <div
            className="edit-input-wrapper disabled"
            data-vv-delay="1000"
            data-vv-as="Website"
          >
            <Form.Label className="edit-input-label">
              {t("website_url")}
              <span className="edit-input-optional">({t("optional")})</span>
            </Form.Label>
            <div className="">
              <Form.Control
                id="edit-website"
                type="text"
                autocomplete="off"
                value={props.profile.data.website}
                placeholder={t("website_url")}
                name="website"
                className="form-control edit-reset"
                onChange={(event) => {
                  props.dispatch(
                    editUserDetails(
                      event.currentTarget.name,
                      event.currentTarget.value
                    )
                  );
                }}
              />
            </div>
          </div>
          <div
            className="edit-input-wrapper disabled"
            data-vv-delay="1000"
            data-vv-as="Amazon Wishlist"
          >
            <Form.Label className="edit-input-label">
              {t("amazon_wishlist")}
              <span className="edit-input-optional">({t("optional")})</span>
            </Form.Label>
            <div className="">
              <Form.Control
                id="edit-amazon-wishlist"
                type="text"
                autocomplete="off"
                value={props.profile.data.amazon_wishlist}
                placeholder={t("amazon_wishlist")}
                name="amazon_wishlist"
                className="form-control edit-reset"
                onChange={(event) => {
                  props.dispatch(
                    editUserDetails(
                      event.currentTarget.name,
                      event.currentTarget.value
                    )
                  );
                }}
              />
            </div>
          </div>
         <div className="edit-save">
            <Button
              className="save-btn"
              onClick={handleSubmit}
              disabled={props.profileInputData.buttonDisable}
            >
              {props.profileInputData.loadingButtonContent !== null
                ? props.profileInputData.loadingButtonContent
                : t("submit")}
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToPros = (state) => ({
  profile: state.users.profile,
  profileInputData: state.users.profileInputData,
  validation: state.users.validationInputData,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(withNamespaces()(EditProfileCard));
