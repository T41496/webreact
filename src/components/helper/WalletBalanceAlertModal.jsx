import React, { useState, useEffect } from "react";
import { Form, Button, Image, Modal, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withNamespaces } from 'react-i18next';

const WalletBalanceAlertModal = (props) => {

  const { t } = props;

  return (
    <>
      <Modal
        className="modal-dialog-center wallet-insufficient-modal"
        size="md"
        centered
        show={props.walletAlert}
        onHide={props.closeWalletAlertModal}
      >
        <Form>
          <Modal.Header closeButton>
            <Modal.Title>
              <div><Image src={window.location.origin + "/assets/images/icons/alert_icon.png"} style={{ "width": "43px" }} /> {t("wallet_balance_insufficient_alert")}</div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
                <Col md="12">
                  <p style={{ "font-size": "19px" }}>Your Wallet Balance is insufficient, Please recharge and try again</p>
                </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Link to="/wallet">
              <Button className="btn btn-success" style={{"height": "45px"}}>Yes</Button>
            </Link>
            <Button type="button" className="btn btn-danger" data-dismiss="modal" onClick={props.closeWalletAlertModal} style={{ "height": "45px"}}>No</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(null, mapDispatchToProps)(withNamespaces()(WalletBalanceAlertModal));
