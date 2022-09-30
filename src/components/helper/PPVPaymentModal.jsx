import React, { useState } from "react";
import { Form, Button, Image, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import {
  PPVPaymentStripeStart,
  PPVPaymentWalletStart,
  PPVPaymentPaypalStart,
} from "../../store/actions/PostAction";

import PaypalExpressBtn from "react-paypal-express-checkout";
import { createNotification } from "react-redux-notify";
import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../../components/helper/NotificationMessage";
import configuration from "react-global-configuration";
import { withNamespaces } from 'react-i18next';

const PPVPaymentModal = (props) => {
  const [amount, setAmount] = useState(0);
  const [paymentType, setPaymentType] = useState("wallet");

  const [showPayPal, payPal] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (paymentType === "paypal") showPayPal(true);

    if (paymentType === "card")
      props.dispatch(
        PPVPaymentStripeStart({
          post_id:
            props.post_id != undefined || props.post_id != null
              ? props.post_id
              : "",
          amount: amount,
          user_id: props.user_id,
        })
      );
    if (paymentType === "wallet")
      props.dispatch(
        PPVPaymentWalletStart({
          post_id:
            props.post_id != undefined || props.post_id != null
              ? props.post_id
              : "",
          amount: props.amount,
          user_id: props.user_id,
        })
      );
    if (paymentType === "paypal") props.closePPVPaymentModal();
  };

  const paypalOnSuccess = (payment) => {
    console.log(payment);
    setTimeout(() => {
      props.dispatch(
        PPVPaymentPaypalStart({
          payment_id: payment.paymentID,
          post_id:
            props.post_id != undefined || props.post_id != null
              ? props.post_id
              : "",
          amount: props.amount,
          user_id: props.user_id,
        })
      );
    }, 1000);
  };

  const paypalOnError = (err) => {
    const notificationMessage = getErrorNotificationMessage(err);
    this.props.dispatch(createNotification(notificationMessage));
  };

  const paypalOnCancel = (data) => {
    const notificationMessage = getErrorNotificationMessage(
      "Payment cancelled please try again.."
    );
    this.props.dispatch(createNotification(notificationMessage));
  };

  const choosePaymentOption = (event) => {
    console.log(amount);
    setPaymentType(event);
  };

  let env = configuration.get("configData.PAYPAL_MODE"); // you can set here to 'production' for production
  let currency = "USD"; // or you can set this value from your props or state

  const client = {
    sandbox: configuration.get("configData.PAYPAL_ID"),
    production: configuration.get("configData.PAYPAL_ID"),
  };

  const { t } = props;

  return (
    <>
      <Modal
        className="modal-dialog-center sent-tip-modal"
        size="md"
        centered
        show={props.PPVPayment}
        onHide={props.closePPVPaymentModal}
      >
        {props.PPVPayment === true ? (
          <Form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>{t("pay_and_see_the_Post")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="floating-form">
                <h4>
                  {t("pay_amount")}:{" "}
                  <span className="text-info">
                    {props.post.amount_formatted}
                  </span>
                </h4>

                <Form className="mt-4">
                  <label className="text-muted f-12">{t("choose_payment_mode")}</label>
                  {["radio"].map((type) => (
                    <div key={`custom-inline-${type}`} className="mb-3">
                      <Form.Check
                        custom
                        inline
                        label="Wallet"
                        type={type}
                        id="wallet"
                        value="wallet"
                        name="payment_type"
                        onChange={(event) => {
                          choosePaymentOption(event.currentTarget.value);
                        }}
                        checked="true"
                      />
                      <Form.Check
                        custom
                        inline
                        label="Card"
                        type={type}
                        // id={`custom-inline-${type}-2`}
                        id="card"
                        value="card"
                        name="payment_type"
                        onChange={(event) => {
                          choosePaymentOption(event.currentTarget.value);
                        }}
                      />
                      {paymentType === "paypal" ? (
                        <Form.Check
                          custom
                          inline
                          label="Paypal"
                          type={type}
                          id="paypal"
                          value="paypal"
                          name="payment_type"
                          onChange={(event) => {
                            choosePaymentOption(event.currentTarget.value);
                          }}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  ))}
                </Form>
              </div>
            </Modal.Body>
            <Modal.Footer>
              {paymentType === "wallet" ? (
                <Button
                  type="button"
                  className="btn btn-success"
                  data-dismiss="modal"
                  onClick={handleSubmit}
                  disabled={props.ppvPayWallet.buttonDisable}
                >
                  {props.ppvPayWallet.loadingButtonContent !== null
                    ? props.ppvPayWallet.loadingButtonContent
                    : t("confirm")}
                </Button>
              ) : (
                ""
              )}
              {paymentType === "paypal" && props.amount != 0 ? (
                <PaypalExpressBtn
                  env={env}
                  client={client}
                  currency={currency}
                  total={props.amount}
                  onError={paypalOnError}
                  onSuccess={paypalOnSuccess}
                  onCancel={paypalOnCancel}
                />
              ) : null}
              <Button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={props.closePPVPaymentModal}
              >
                {t("cancel")}
              </Button>
              {paymentType === "card" ? (
                <Button
                  type="button"
                  className="btn btn-success"
                  data-dismiss="modal"
                  onClick={handleSubmit}
                  disabled={props.ppvPayStripe.buttonDisable}
                >
                  {props.ppvPayStripe.loadingButtonContent !== null
                    ? props.ppvPayStripe.loadingButtonContent
                    : t("confirm")}
                </Button>
              ) : (
                ""
              )}
            </Modal.Footer>
          </Form>
        ) : null}
      </Modal>
    </>
  );
};

const mapStateToPros = (state) => ({
  ppvPayWallet: state.post.ppvPayWallet,
  ppvPayStripe: state.post.ppvPayStripe,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(withNamespaces()(PPVPaymentModal));
