import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "./AddBankIndex.css";
import { addBankAccountStart } from "../../../store/actions/BankAccountAction";
import { withNamespaces } from 'react-i18next';

const AddBankIndex = (props) => {
  const [inputData, setInputData] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    props.dispatch(addBankAccountStart(inputData));
  };

  const { t } = props;

  return (
    <div className="card-list-sec">
      <Container>
        <h4 className="head-title">{t("add_bank")}</h4>
        <Row>
          <Col sm={12} md={12}>
            <div className="add-bank-box">
              <Form onSubmit={handleSubmit}>
                <Col md={6}>
                  <Form.Group controlId="formHorizontalNickname">
                    <Form.Label>{t("nick_name")}: (*)</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nick Name"
                      value={inputData.nickname}
                      name="nickname"
                      onChange={(event) => {
                        setInputData({
                          ...inputData,
                          nickname: event.currentTarget.value,
                        });
                      }}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group controlId="formHorizontalAccountName">
                    <Form.Label>{t("account_name")}: (*)</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={t("account_name")}
                      value={inputData.account_holder_name}
                      name="account_holder_name"
                      onChange={(event) => {
                        setInputData({
                          ...inputData,
                          account_holder_name: event.currentTarget.value,
                        });
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formHorizontalAccountNumber">
                    <Form.Label>{t("account_number")}: (*)</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder={t("account_number")}
                      value={inputData.account_number}
                      min='0'
                      name="account_number"
                      onChange={(event) => {
                        setInputData({
                          ...inputData,
                          account_number: event.currentTarget.value,
                        });
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formHorizontalBanlName">
                    <Form.Label>
                      {t("bank_name")}:{" "}
                      <span className="text-capitalize">({t("optional")})</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={t("bank_name")}
                      value={inputData.bank_name}
                      name="bank_name"
                      onChange={(event) => {
                        setInputData({
                          ...inputData,
                          bank_name: event.currentTarget.value,
                        });
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formHorizontalIFSCCode">
                    <Form.Label>
                      {t("ifsc_code")}:{" "}
                      <span className="text-capitalize">({t("optional")})</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={t("ifsc_code")}
                      value={inputData.ifsc_code}
                      name="ifsc_code"
                      onChange={(event) => {
                        setInputData({
                          ...inputData,
                          ifsc_code: event.currentTarget.value,
                        });
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formHorizontalSWIFTCode">
                    <Form.Label>
                      {t("swift_code")}:{" "}
                      <span className="text-capitalize">({t("optional")})</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={t("swift_code")}
                      value={inputData.swift_code}
                      name="swift_code"
                      onChange={(event) => {
                        setInputData({
                          ...inputData,
                          swift_code: event.currentTarget.value,
                        });
                      }}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group controlId="formHorizontalRouteNumber">
                    <Form.Label>
                      {t("route_number")}:
                      <span className="text-capitalize">({t("optional")})</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={t("route_number")}
                      value={inputData.route_number}
                      name="route_number"
                      onChange={(event) => {
                        setInputData({
                          ...inputData,
                          route_number: event.currentTarget.value,
                        });
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formHorizontalIBANNumber">
                    <Form.Label>
                      {t("iban_number")}:{" "}
                      <span className="text-capitalize">({t("optional")})</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={t("iban_number")}
                      value={inputData.iban_number}
                      name="iban_number"
                      onChange={(event) => {
                        setInputData({
                          ...inputData,
                          iban_number: event.currentTarget.value,
                        });
                      }}
                    />
                  </Form.Group>
                </Col>
                <div className="edit-save">
                  <Button
                    className="save-btn"
                    type="submit"
                    disabled={props.bankAccount.buttonDisable}
                  >
                    {props.bankAccount.loadingButtonContent !== null
                      ? props.bankAccount.loadingButtonContent
                      : t("submit")}
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const mapStateToPros = (state) => ({
  bankAccount: state.bankAccount.addBankAccountInput,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(withNamespaces()(AddBankIndex));
