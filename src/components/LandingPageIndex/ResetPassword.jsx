import React, { Component } from "react";
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";
import { connect } from "react-redux";
import { fetchSinglePageStart } from "../../store/actions/PageAction";
import { Link } from "react-router-dom";
import configuration from "react-global-configuration";
import { resetPasswordStart } from "../../store/actions/UserAction";
import { withNamespaces } from "react-i18next";

class ResetPassword extends Component {
    state = {
        inputData: {},
    };

    handleChange = ({ currentTarget: input }) => {
        const inputData = { ...this.state.inputData };
        inputData[input.name] = input.value;
        inputData['reset_token'] = this.props.match.params.token;
        this.setState({ inputData });
    };
    
    handleForgotPasswordSubmit = (event) => {
        event.preventDefault();
        this.props.dispatch(resetPasswordStart(this.state.inputData));
    };


    render() {
    const { inputData } = this.state;

    const { t } = this.props;
    return (
        <>
            <div className="login-section">
                <Container>
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
                                <div className="screen">
                                <div className="slider">
                                    <div className="slider__item slider__item--1">
                                    <img
                                        src={
                                        window.location.origin +
                                        "/assets/images/login-slider-1.jpg"
                                        }
                                        alt=""
                                    />
                                    </div>
                                    <div className="slider__item slider__item--2">
                                    {" "}
                                    <img
                                        src={
                                        window.location.origin +
                                        "/assets/images/login-slider-2.jpg"
                                        }
                                        alt=""
                                    />
                                    </div>
                                    {/* <div className="slider__item slider__item--3"></div>
                                    <div className="slider__item slider__item--4"></div>
                                    <div className="slider__item slider__item--5"></div> */}
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </Col>
                        <Col lg={6} xl={6} md={12} sm={12} xs={12}>
                            <div className="sign-in form-section">
                                <Link to="#" aria-current="page" className="sign-in-logo">
                                <Image
                                    src={configuration.get("configData.site_logo")}
                                    width="237"
                                />
                                </Link>
                                <p className="login-tagline">
                                {configuration.get("configData.tag_name")}
                                </p>
                                <div className="forms-fields">
                                <div id="main">
                                    <div id="first">
                                    
                                        <Form onSubmit={this.handleForgotPasswordSubmit} method="post">
                                        <div className="form-group">
                                            <Form.Control
                                                id="password"
                                                type="password"
                                                controlId="loginemail"
                                                className="form-control"
                                                placeholder={t("new_password_placeholder")}
                                                onChange={this.handleChange}
                                                value={inputData.password}
                                                name="password"
                                                autoComplete="off"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <Form.Control
                                                controlId="loginemail"
                                                className="form-control"
                                                id="password_confirmation"
                                                type="password"
                                                placeholder={t("confirm_password")}
                                                name="password_confirmation"
                                                value={inputData.password_confirmation}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />
                                        </div>

                                        <Form.Group controlId="formBasicName">
                                            <Button
                                            id="forgotpassword"
                                            type="submit"
                                            className="btn btn-auth btn-lg"
                                            disabled={this.props.inputData.buttonDisable}
                                            >
                                                {this.props.inputData.loadingButtonContent !=
                                                null
                                                ? this.props.inputData.loadingButtonContent
                                                : t("reset_password")}                                            
                                            </Button>
                                        </Form.Group>
                                        <p id="two">{t("already_have_an_account")}</p>
                                        <p>
                                            <Link
                                            className="signup"
                                            to={"/"}
                                            id="signin"
                                            >
                                            {" "}
                                            {t("login_for")}{" "}
                                            {configuration.get("configData.site_name")}
                                            </Link>
                                        </p>
                                        </Form>
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
  }
}

const mapStateToPros = (state) => ({
    inputData: state.users,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(withNamespaces()(ResetPassword));
