import React, { useState } from "react";
import { connect } from "react-redux";
import { Form, Button, Row, Col, Image } from "react-bootstrap";
import { changePasswordStart } from "../../../store/actions/UserAction";
import { withNamespaces } from 'react-i18next';

const ChangePasswordCard = (props) => {
  const [inputData, setInputData] = useState({});
  const [oldPassword, setOldPassword] = useState('password');
  const [newPassword, setNewPassword] = useState('password');
  const [confirmPassword, setConfirmPassword] = useState('password');

  const handleSubmit = (event) => {
    event.preventDefault();
    props.dispatch(changePasswordStart(inputData));
  };

  const handleOldPassword = () => {
    if(oldPassword=='password'){
      setOldPassword('text');
    }
    else{
      setOldPassword('password');
    }
  };

  const handleNewPassword = () => {
    if(newPassword=='password'){
      setNewPassword('text');
    }
    else{
      setNewPassword('password');
    }
  };

  const handleConfirmPassword = () => {
    if(confirmPassword=='password'){
      setConfirmPassword('text');
    }
    else{
      setConfirmPassword('password');
    }
  };

  const { t } = props;

  return (
    <>
      <div
        role="tabpanel"
        className={
          props.activeSec === "change-password-card"
            ? "tab-pane fade in active"
            : "tab-pane fade"
        }
        id="Section3"
      >
        <div className="change-password-sec">
          <div className="card-header bg-transparent">
            <h4>{t("change_password")}</h4>
          </div>
          <div className="card-body">
            <Form autoComplete="new-password" onSubmit={handleSubmit}>
              <Form.Group>
                <Row>
                  <Col sm={11} md={11}>
                    <Form.Label for="old_password">{t("old_password")}</Form.Label>
                    <Form.Control
                      className="form-control"
                      id="old_password"
                      type={oldPassword}
                      placeholder={t("old_password_placeholder")}
                      name="old_password"
                      value={inputData.old_password}
                      onChange={(event) =>
                        setInputData({
                          ...inputData,
                          old_password: event.currentTarget.value,
                        })
                      }
                    />
                  </Col>
                  <Col sm={1} md={1}>
                    <span className="password__show" onClick={handleOldPassword}>
                      <br />
                      <Image
                        src={oldPassword === 'text' ? '/assets/images/icons/invisible.png' : '/assets/images/icons/eye.png'}
                      />
                      <br />
                      {oldPassword === 'text' ? 'Hide' : 'Show'}
                    </span>
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group>
                <Row>
                  <Col sm={11} md={11}>
                    <Form.Label for="password">{t("new_password")}</Form.Label>
                    <Form.Control
                      className="form-control"
                      id="password"
                      type={newPassword}
                      placeholder={t("new_password_placeholder")}
                      name="password"
                      value={inputData.password}
                      onChange={(event) =>
                        setInputData({
                          ...inputData,
                          password: event.currentTarget.value,
                        })
                      }
                    />
                  </Col>
                  <Col sm={1} md={1}>
                    <span className="password__show" onClick={handleNewPassword}>
                      <br />
                      <Image
                        src={newPassword === 'text' ? '/assets/images/icons/invisible.png' : '/assets/images/icons/eye.png'}
                      />
                      <br />
                      {newPassword === 'text' ? 'Hide' : 'Show'}
                    </span>
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group>
                <Row>
                  <Col sm={11} md={11}>
                    <Form.Label for="password_confirmation">
                      {t("confirm_password")}
                    </Form.Label>
                    <Form.Control
                      className="form-control"
                      id="password_confirmation"
                      type={confirmPassword}
                      placeholder={t("confirm_password")}
                      name="password_confirmation"
                      value={inputData.password_confirmation}
                      onChange={(event) =>
                        setInputData({
                          ...inputData,
                          password_confirmation: event.currentTarget.value,
                        })
                      }
                    />
                  </Col>
                  <Col sm={1} md={1}>
                    <span className="password__show" onClick={handleConfirmPassword}>
                      <br />
                      <Image
                        src={confirmPassword === 'text' ? '/assets/images/icons/invisible.png' : '/assets/images/icons/eye.png'}
                      />
                      <br />
                      {confirmPassword === 'text' ? 'Hide' : 'Show'}
                    </span>
                  </Col>
                </Row>
              </Form.Group>
              <Row className="mt-5">
                <Col sm={12} xs={12} md={6} className="mx-auto">
                  <Button
                    className="btn btn-auth btn-lg btn btn-primary"
                    type="submit"
                    disabled={props.changePassword.buttonDisable}
                    onClick={handleSubmit}
                  >
                    {props.changePassword.loadingButtonContent != null
                      ? props.changePassword.loadingButtonContent
                      : t("change_password")}
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToPros = (state) => ({
  changePassword: state.changePassword,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(withNamespaces()(ChangePasswordCard));
