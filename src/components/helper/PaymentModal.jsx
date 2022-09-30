import React, { useState } from "react";
import { Form, Button, Image, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import {
  subscriptionPaymentStripeStart,
  subscriptionPaymentPaypalStart,
  subscriptionPaymentWalletStart,
} from "../../store/actions/SubscriptionAction";
import PaypalExpressBtn from "react-paypal-express-checkout";
import { createNotification } from "react-redux-notify";
import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../../components/helper/NotificationMessage";
import configuration from "react-global-configuration";
import { withNamespaces } from 'react-i18next';
import api from "../../Environment";

const PaymentModal = (props) => {
  const [paymentType, setPaymentType] = useState("wallet");

  const [showPayPal, payPal] = useState(false);

  let env = configuration.get("configData.PAYPAL_MODE"); // you can set here to 'production' for production
  let currency = "USD"; // or you can set this value from your props or state

  const client = {
    sandbox: configuration.get("configData.PAYPAL_ID"),
    production: configuration.get("configData.PAYPAL_ID"),
  };

  const choosePaymentOption = (event) => {
    setPaymentType(event);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (paymentType === "card")
      props.dispatch(
        subscriptionPaymentStripeStart({
          user_unique_id: props.user_unique_id,
          plan_type: props.subscriptionData.plan_type,
          is_free: props.subscriptionData.is_free,
        })
      );
    if (paymentType === "wallet")
      props.dispatch(
        subscriptionPaymentWalletStart({
          user_unique_id: props.user_unique_id,
          plan_type: props.subscriptionData.plan_type,
          is_free: props.subscriptionData.is_free,
        })
      );
    if (paymentType === "paypal") showPayPal(true);

    // props.closePaymentModal();
  };

  const paypalOnSuccess = (payment) => {
    console.log(payment);
    setTimeout(() => {
      props.dispatch(
        subscriptionPaymentPaypalStart({
          payment_id: payment.paymentID,
          user_unique_id: props.user_unique_id,
          plan_type: props.subscriptionData.plan_type,
          is_free: props.subscriptionData.is_free,
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

  const { t } = props;

  return (
    <>
      <Modal
        className="modal-dialog-center sent-tip-modal"
        size="md"
        centered
        show={props.subscrptionPayment}
        onHide={props.closePaymentModal}
      >
        {props.subscrptionPayment === true ? (
          <Form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>{t("subscribe")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="header-userinfo">
                <div className="g-avatar online_status_class">
                  <Image
                    src={props.userPicture ? (api.serviceUrl()+'/'+props.userPicture) : (api.serviceUrl()+'/images/mysecrets_avatar_square_image.png')}
                    alt={props.name}
                    className="tips__user__img"
                  />
                </div>
                <div className="body-userinfo">
                  <div className="popup-username-row">
                    <div className="pop-username">
                      <div className="">
                        {props.name}{" "}
                        {props.is_verified_badge == 1 ? (
                          <img
                            className="verified-badge"
                            alt="verified-badge"
                            src={configuration.get('configData.verified_badge_file') ? configuration.get('configData.verified_badge_file') : ""
                            }
                          />
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="popup-username-row">
                    <span className="pop-username popuser-realname">
                      <div className="pop-user-username">@{props.username}</div>
                    </span>
                  </div>
                </div>
              </div>

              <div className="floating-form">
                <div>
                  <div className="pop-user-username">
                    {t("amount")} - {props.subscriptionData.amount_formatted}
                  </div>
                </div>
                <Form className="mt-4">
                  {["radio"].map((type) => (
                    <div key={`custom-inline-${type}`} className="mb-3">
                    <Form.Check
                      custom
                      inline
                      label="Wallet"
                      type={type}
                      // id={`custom-inline-${type}-2`}
                      id="wallet"
                      value="wallet"
                      name="payment_type"
                      defaultChecked={true}
                      onChange={(event) => {
                        choosePaymentOption(event.currentTarget.value);
                      }}
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
                    {configuration.get("configData.is_paypal_enabled") ==
                      1 ? (
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
                  disabled={props.subPayWallet.buttonDisable}
                >
                  {props.subPayWallet.loadingButtonContent !== null
                    ? props.subPayWallet.loadingButtonContent
                    : t("pay_now")}
                </Button>
              ) : (
                ""
              )}
              {paymentType === "paypal" &&
              props.subscriptionData.amount != 0 ? (
                <PaypalExpressBtn
                  env={env}
                  client={client}
                  currency={currency}
                  total={props.subscriptionData.amount}
                  onError={paypalOnError}
                  onSuccess={paypalOnSuccess}
                  onCancel={paypalOnCancel}
                />
              ) : null}

              <Button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={props.closePaymentModal}
              >
                {t("cancel")}
              </Button>
              {paymentType === "card" ? (
                <Button
                  type="button"
                  className="btn btn-success"
                  data-dismiss="modal"
                  onClick={handleSubmit}
                  disabled={props.subPayStripe.buttonDisable}
                >
                  {props.subPayStripe.loadingButtonContent !== null
                    ? props.subPayStripe.loadingButtonContent
                    : t("pay_now")}
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
  subPayWallet: state.subscriptions.subPayWallet,
  subPayStripe: state.subscriptions.subPayStripe,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(withNamespaces()(PaymentModal));
