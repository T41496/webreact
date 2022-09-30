import React, { useState, useEffect } from "react";
import { Form, Button, Image, Modal, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withNamespaces } from 'react-i18next';

const ConnectStripeModal = (props) => {

  const { t } = props;

  return (
    <>
      <Modal
        className="modal-dialog-center stripe-connect-modal"
        size="md"
        centered
        show={props.stripeConnectModal}
        onHide={props.closeStripeConnectModal}
      >
        <Form>
          <Modal.Header closeButton>
            <Modal.Title>
              <Image src={window.location.origin + "/assets/images/icons/stripe-connect.png"} style={{ "width": "43px" }} /> 
              <div>{t("connect_to_stripe")}</div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
                <Col md="12">
                  <p style={{ "font-size": "19px" }}>Please Connect to Stripe first and send withdraw request to Admin</p>
                </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Link to="/stripe-connect">
              <Button className="btn btn-primary" id="connect_with_stripe" style={{ "width": "473px","height": "45px","font-size": "22px","background-color": "#635bff" }}>Please Connect to Stripe</Button>
            </Link>
            <Link to="/add-bank">
              <Button className="btn btn-primary" id="connect_with_stripe" style={{ "width": "473px","height": "45px","font-size": "22px","background-color": "#228B22" }}>Please add your bank details</Button>
            </Link>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(null, mapDispatchToProps)(withNamespaces()(ConnectStripeModal));
