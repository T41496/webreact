import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Image, Modal, Media } from "react-bootstrap";
import Background from "../helper/g-3.jpg";
import PaymentAddCardModal from "../helper/PaymentAddCardModal";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import configuration from "react-global-configuration";
import { withNamespaces } from 'react-i18next';

const AddCardModel = (props) => {
  const stripePromise = loadStripe(
    configuration.get("configData.stripe_publishable_key")
  );
  const [paymentAddCard, setPaymentAddCard] = useState(false);

  const closePaymentAddCardModal = () => {
    setPaymentAddCard(false);
  };

  const { t } = props;

  return (
    <>
      <Modal
        className="modal-dialog-center add-card-modal"
        size="md"
        centered
        show={props.addCard}
        onHide={props.closeAddCardModal}
      >
        <Form>
          <Modal.Header
            closeButton
            style={{
              background: `url(${Background})`,
              backgroundPosition: "top",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              height: "12em",
            }}
          ></Modal.Header>
          <Modal.Body>
            <div className="user-profile-img">
              <Image src="/assets/images/avatar/b-4.jpg" className="" />
            </div>
            <div className="add-card-content-header">
              <Link to="#">
                <div className="add-card-user-name">
                  {localStorage.getItem("name")}
                  <Image
                    src={
                      configuration.get("configData.verified_badge_file")
                        ? configuration.get("configData.verified_badge_file")
                        : ""
                    }
                    className="add-card-verified-icon ml-3"
                  />
                </div>
              </Link>
              <h6 className="sub-title">@{localStorage.getItem("username")}</h6>
              <h4 className="title">{t("subscription_benefits")}:</h4>
              <div className="flex-center">
                <ul className="list-unstyled">
                  <Media as="li">
                    <i className="fas fa-check mr-2"></i>
                    <span>{t("full_access_to_user_content")}</span>
                  </Media>
                  <Media as="li">
                    <i className="fas fa-check mr-2"></i>
                    <span>{t("direct_message_with_this_user")}</span>
                  </Media>
                  <Media as="li">
                    <i className="fas fa-check mr-2"></i>
                    <span>{t("cancel_your_subscription_at_any_time")}</span>
                  </Media>
                </ul>
              </div>
              <div className="lists-button-group">
                <Link
                  type="button"
                  className="g-btn m-rounded m-border m-profile m-with-icon"
                  onClick={() => {
                    setPaymentAddCard(true);
                    props.closeAddCardModal();
                  }}
                >
                  <Image
                    src="/assets/images/icons/subscribe-blue.svg"
                    className="svg-clone"
                  />
                  <span className="b-btn-text">
                    {t("please_add_payment_card")}
                  </span>
                </Link>
              </div>
            </div>
          </Modal.Body>
        </Form>
      </Modal>
      <Elements stripe={stripePromise}>
        <PaymentAddCardModal
          paymentAddCard={paymentAddCard}
          closePaymentAddCardModal={closePaymentAddCardModal}
        />
      </Elements>
    </>
  );
};

export default withNamespaces()(AddCardModel);
