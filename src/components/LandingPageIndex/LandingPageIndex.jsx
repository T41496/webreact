import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";
import configuration from "react-global-configuration";
import SocialButton from "../helper/SocialButton";
import { withNamespaces } from "react-i18next";
import { connect } from "react-redux";
import {
  forgotPasswordStart,
  userLoginStart,
  userRegisterStart,
  usernameValidationStart,
  usernameValidationEmpty
} from "../../store/actions/UserAction";
import api from "../../Environment";
import {
   
  fetchYotiDetailsStart
} from "../../store/actions/YotiAction";

const LandingPageIndex = (props) => {
  const [show, setShow] = useState("login");

  const [loginInputData, setLoginInputData] = useState({});

  const [signupInputData, setSignupInputData] = useState({});

  const [forgotPasswordInputData, setForgotPasswordInputData] = useState({});

  const [validationError, setValidationError] = useState("NO");

  useEffect(() => {
    props.dispatch(fetchYotiDetailsStart());

  }, 
  []);

  const handleLogin = (event) => {
    event.preventDefault();
    props.dispatch(userLoginStart(loginInputData));
  };

  const handleSignup = (event) => {
    event.preventDefault();
    props.dispatch(userRegisterStart(signupInputData));
  };

  const handleForgotPassword = (event) => {
    event.preventDefault();
    props.dispatch(forgotPasswordStart(forgotPasswordInputData));
  };

  const handleFacebookLogin = (user) => {
    console.log("handleFacebookLogin", user._profile);
    props.dispatch(
      userRegisterStart({
        name: user._profile.name,
        first_name: user._profile.firstName ? user._profile.firstName : "",
        last_name: user._profile.lastName ? user._profile.lastName : "",
        email: user._profile.email ? user._profile.email : "",
        social_unique_id: user._profile.id,
        picture: user._profile.profilePicURL,
        login_by: "facebook",
      })
    );
  };

  const handleGoogleLogin = (user) => {
    console.log("handleGoogleLogin", user._profile);
    props.dispatch(
      userRegisterStart({
        name: user._profile.name,
        email: user._profile.email,
        first_name: user._profile.firstName ? user._profile.firstName : "",
        last_name: user._profile.lastName ? user._profile.lastName : "",
        social_unique_id: user._profile.id,
        picture: user._profile.profilePicURL,
        login_by: "google",
      })
    );
  };

  const handleUsernameValidation = (event, username) => {
    setSignupInputData({
      ...signupInputData,
      username: username,
    });
      props.dispatch(usernameValidationStart({ username: username }));
  };

  const handleSocialLoginFailure = (err) => {
    console.error(err);
  };

  const { t } = props;

  return (
    <>
      <div className="login-section">
        <Container fluid>
          <Row>
            <Col
              lg={6}
              xl={6}
              md={12}
              sm={12}
              xs={12}
              className="hidden-xs iphone-slide-area resp-btm-lg flex-49"
            >
              <div className="dm-width">
                <div className="dm-device">
                  <div className="device">
                   
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={6} xl={6} md={12} sm={12} xs={12}>
              <div className="landing-logo mobile_v">
              <Link to="#" aria-current="page" className="sign-in-logo">
                  <Image
                    src={api.serviceUrl()+'/'+configuration.get("configData.site_logo")}
                    width="237"
                  />
                </Link>
                <p className="login-tagline">
                  {configuration.get("configData.tag_name")}
                </p>
              </div>
              <div className="sign-in form-section">
              <div className="landing-logo destop">
              <Link to="#" aria-current="page" className="sign-in-logo">
                  <Image
                    src={api.serviceUrl()+'/'+configuration.get("configData.site_logo")}
                    width="237"
                  />
                </Link>
                <p className="login-tagline">
                  {configuration.get("configData.tag_name")}
                </p>
              </div>
                <div className="forms-fields">
                  {configuration.get("configData.FB_CLIENT_ID") ? (
                    <SocialButton
                      provider="facebook"
                      scope="email"
                      appId={configuration.get("configData.FB_CLIENT_ID")}
                      onLoginSuccess={handleFacebookLogin}
                      onLoginFailure={handleSocialLoginFailure}
                      className="social-button"
                      id="facebook-connect"
                    >
                      <span>
                        {t("signup")} / {t("login_with_facebook")}
                      </span>
                    </SocialButton>
                  ) : (
                    ""
                  )}

                  {configuration.get("configData.GOOGLE_CLIENT_ID") ? (
                    <SocialButton
                      provider="google"
                      key={"google"}
                      appId={configuration.get("configData.GOOGLE_CLIENT_ID")}
                      onLoginSuccess={handleGoogleLogin}
                      onLoginFailure={handleSocialLoginFailure}
                      className="social-button"
                      id="google-connect"
                    >
                      <span>
                        {t("signup")} / {t("login_with_google")}
                      </span>
                    </SocialButton>
                  ) : (
                    ""
                  )}
                  
                  {configuration.get("configData.GOOGLE_CLIENT_ID") ||
                  configuration.get("configData.FB_CLIENT_ID") ? (
                    <span className="or-line">
                      <span>or</span>
                    </span>
                  ) : (
                    <span classsName="login-or-hide"></span>
                  )}
                  <div id="main">
                    <div id="first">
                      {show === "login" ? (
                        <Form
                          onSubmit={handleLogin}
                          method="post"
                          autoComplete="off"
                        >
                          <Form.Group controlId="loginemail">
                            <Form.Control
                              type="text"
                              controlId="loginemail"
                              placeholder={t('e_mail')}
                              required
                              value={loginInputData.email}
                              name="email"
                              autoComplete="nope"
                              onChange={(event) =>
                                setLoginInputData({
                                  ...loginInputData,
                                  email: event.currentTarget.value,
                                })
                              }
                            />
                          </Form.Group>

                          <Form.Group controlId="formBasicPassword">
                            <Form.Control
                              type="password"
                              controlId="loginpassword"
                              placeholder={t("password")}
                              required
                              autocomplete="off"
                              value={loginInputData.password}
                              name="password"
                              onChange={(event) =>
                                setLoginInputData({
                                  ...loginInputData,
                                  password: event.currentTarget.value,
                                })
                              }
                            />
                          </Form.Group>
                          <div className="forget-password">
                            <p id="one">
                              <Link
                                to="#"
                                type="button"
                                className="forgot-link"
                                onClick={(event) => {
                                  event.preventDefault();
                                  setShow("forgotpassword");
                                }}
                              >
                                {" "}
                                {t("forgot_password")}{" "}
                              </Link>
                            </p>
                          </div>
                          <div className="">
                            <Button
                              id="login"
                              type="submit"
                              onClick={handleLogin}
                              className="btn btn-auth btn-lg"
                              disabled={props.login.buttonDisable}
                            >
                              {props.login.loadingButtonContent !== null
                                ? props.login.loadingButtonContent
                                : (<>{t("login")}</>)}
                            </Button>
                          </div>
                          <p></p>
                          <p>
                            <Link
                              className="signup"
                              to="#"
                              id="signup"
                              onClick={(event) => {
                                event.preventDefault();
                                setShow("signup");
                              }}
                            >
                              {" "}
                              {t("signup_now")}
                            </Link>
                          </p>
                        </Form>
                      ) : null}
                      {show === "signup" ? (
                        <Form
                          onSubmit={handleSignup}
                          id="form"
                          method="post"
                          name="form"
                          autoComplete="off"
                        >
                          <Form.Group controlId="signupName">
                            <Form.Control
                              type="text"
                              controlId="signupName"
                              placeholder={t("name")}
                              required
                              value={signupInputData.name}
                              name="name"
                              autoComplete="off"
                              onChange={(event) =>
                                setSignupInputData({
                                  ...signupInputData,
                                  name: event.currentTarget.value,
                                })
                              }
                            />
                          </Form.Group>
                          {props.validation.isValid}
                          <Form.Group controlId="signupUsername">
                            <Form.Control
                              type="text"
                              controlId="signupUsername"
                              placeholder={t("user_name")}
                              required
                              autoComplete="off"
                              value={signupInputData.user_name}
                              name="username"
                              onKeyUp={(event) => handleUsernameValidation(event, event.currentTarget.value)}
                              isValid={props.validation.isValid}
                              isInvalid={props.validation.isInValid}
                            />
                            {props.validation.isInValid ? (
                              <Form.Control.Feedback type="invalid">
                                {t("username_already_taken")}
                              </Form.Control.Feedback>
                            ) : (
                              ""
                            )}
                            {props.validation.isValid ? (
                              <Form.Control.Feedback>
                                {t("looks_good")}
                              </Form.Control.Feedback>
                            ) : (
                              ""
                            )}
                          </Form.Group>
                          <Form.Group controlId="registerEmail">
                            <Form.Control
                              type="text"
                              controlId="registerEmail"
                              placeholder={t("e_mail")}
                              required
                              autoComplete="off"
                              value={signupInputData.email}
                              name="email"
                              onChange={(event) =>
                                setSignupInputData({
                                  ...signupInputData,
                                  email: event.currentTarget.value,
                                })
                              }
                            />
                          </Form.Group>

                          <Form.Group controlId="registerPassword">
                            <Form.Control
                              type="password"
                              controlId="registerPassword"
                              placeholder={t("password")}
                              required
                              autoComplete="new-password"
                              value={signupInputData.password}
                              name="password"
                              onChange={(event) =>
                                setSignupInputData({
                                  ...signupInputData,
                                  password: event.currentTarget.value,
                                })
                              }
                            />
                          </Form.Group>

                          <Form.Group
                            controlId="formBasicName"
                            className="round"
                          >
                            {/* <input type="checkbox" id="checkbox" /> */}
                            {/* <label for="checkbox"></label> */}
                            <p className="terms">
                              {t("signing_up_confirmation")}{" "}
                              <Link to={`/page/terms`} target="_blank">
                                {t("terms_of_service")}
                              </Link>{" "}
                              {t("and")}{" "}
                              <Link to={`/page/privacy`} target="_blank">
                                {t("privacy_policy")}
                              </Link>
                              .
                            </p>
                          </Form.Group>

                          <Form.Group controlId="formBasicName">
                            <Button
                              id="register"
                              type="submit"
                              onClick={handleSignup}
                              className="btn btn-auth btn-lg r-btn"
                              disabled={props.login.buttonDisable}
                            >
                              {props.signup.loadingButtonContent !== null
                                ? props.signup.loadingButtonContent
                                : (<>{t("signup")}</>)}
                            </Button>
                          </Form.Group>
                          <p id="two">{t("already_have_an_account")}</p>
                          <p>
                            <Link
                              className="signup"
                              href="#"
                              id="signin"
                              onClick={(event) => {
                                event.preventDefault();
                                setShow("login");
                              }}
                            >
                              {" "}
                              {t("login_for")}{" "}
                              {configuration.get("configData.site_name")}
                            </Link>
                          </p>
                        </Form>
                      ) : null}
                      {show === "forgotpassword" ? (
                        <Form onSubmit={handleForgotPassword} method="post">
                          <div className="form-group">
                            <Form.Control
                              type="text"
                              controlId="loginemail"
                              className="form-control"
                              placeholder={t("e_mail")}
                              required
                              value={forgotPasswordInputData.email}
                              name="email"
                              onChange={(event) =>
                                setForgotPasswordInputData({
                                  ...forgotPasswordInputData,
                                  email: event.currentTarget.value,
                                })
                              }
                            />
                          </div>

                          <Form.Group controlId="formBasicName">
                            <Button
                              id="forgotpassword"
                              type="submit"
                              onClick={handleForgotPassword}
                              className="btn btn-auth btn-lg"
                              disabled={props.forgotPassword.buttonDisable}
                            >
                              {props.forgotPassword.loadingButtonContent !==
                              null
                                ? props.forgotPassword.loadingButtonContent
                                : "Forgot Password"}
                            </Button>
                          </Form.Group>
                          <p id="two">{t("already_have_an_account")}</p>
                          <p>
                            <Link
                              className="signup"
                              to="#"
                              id="signin"
                              onClick={(event) => {
                                event.preventDefault();
                                setShow("login");
                              }}
                            >
                              {" "}
                              {t("login_for")}{" "}
                              {configuration.get("configData.site_name")}
                            </Link>
                          </p>
                        </Form>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

const mapStateToPros = (state) => ({
  login: state.users.loginInputData,
  signup: state.users.registerInputData,
  forgotPassword: state.users.forgotPasswordInputData,
  validation: state.users.validationInputData,
  yoti_session: state.yotiSession,

});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(withNamespaces()(LandingPageIndex));