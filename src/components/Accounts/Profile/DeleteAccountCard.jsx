import React, { useState } from "react";
import { connect } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";
import { deleteAccountStart } from "../../../store/actions/UserAction";
import { withNamespaces } from 'react-i18next';

const DeleteAccountCard = (props) => {
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    props.dispatch(deleteAccountStart({ password: password }));
  };

  const { t } = props;

  return (
    <>
      <div
        role="tabpanel"
        className={
          props.activeSec === "delete-account-card"
            ? "tab-pane fade in active"
            : "tab-pane fade"
        }
        id="Section4"
      >
        <div className="delete-account-sec">
          <Row>
            <Col sm={12} md={12}>
              <div className="card">
                <div className="card-header bg-transparent">
                  <h4>{t("delete_account")}</h4>
                </div>
                <div className="card-body">
                  <Row>
                    <Col sm={12} md={12}>
                      <div className="card-details">
                        <h5>
                          <b>{t("hope_see_you_soon")}</b>
                        </h5>
                        <p>
                          {t("delete_account_note")}
                        </p>
                      </div>
                      <Form autoComplete="new-password" onSubmit={handleSubmit}>
                        <Form.Group>
                          <Form.Label for="password">{t("password")}</Form.Label>
                          <Form.Control
                            className="form-control"
                            id="password"
                            type="password"
                            placeholder={t("enter_your_password")}
                            name="password"
                            value={password}
                            onChange={(event) =>
                              setPassword(event.currentTarget.value)
                            }
                          />
                        </Form.Group>
                        <Row className="mt-5">
                          <Col sm={12} xs={12} md={6} className="mx-auto">
                            <Button
                              className="btn btn-auth btn-lg btn btn-primary"
                              type="submit"
                              disabled={props.deleteAcc.buttonDisable}
                            >
                              {props.deleteAcc.loadingButtonContent !== null
                                ? props.deleteAcc.loadingButtonContent
                                : t("delete_account") }
                            </Button>
                          </Col>
                        </Row>
                      </Form>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

const mapStateToPros = (state) => ({
  deleteAcc: state.users.deleteAccount,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(withNamespaces()(DeleteAccountCard));
