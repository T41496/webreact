import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Form,
  Modal,
  InputGroup,
  FormControl,
  Col,
  Row,
  Button,
} from "react-bootstrap";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import api from "../../Environment";
import { connect } from "react-redux";
import { createNotification } from "react-redux-notify";
import {
  getErrorNotificationMessage,
  getSuccessNotificationMessage,
} from "./NotificationMessage";
import { fetchCardDetailsStart } from "../../store/actions/CardsAction";
import { withNamespaces } from 'react-i18next';

const PaymentAddCardModal = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [addCardButtonDisable, setAddCardButtonDisable] = useState(false);
  const [addCardLoadingContent, setAddCardLoadingContent] = useState(null);

  const addCard = async (ev) => {
    ev.preventDefault();
    setAddCardButtonDisable(true);
    setAddCardLoadingContent("Loading... Please wait");
    if (stripe) {
      await stripe
        .createPaymentMethod({
          type: "card",
          card: elements.getElement(CardElement),
        })
        .then((payload) => {
          // console.log("Payload", payload);
          const inputData = {
            card_token: payload.paymentMethod.id,
          };
          api
            .postMethod("cards_add", inputData)
            .then((response) => {
              if (response.data.success) {
                const notificationMessage = getSuccessNotificationMessage(
                  response.data.message
                );
                props.dispatch(createNotification(notificationMessage));
                props.dispatch(fetchCardDetailsStart());

                setAddCardButtonDisable(false);
                setAddCardLoadingContent(null);
              } else {
                const notificationMessage = getErrorNotificationMessage(
                  response.data.error
                );
                props.dispatch(createNotification(notificationMessage));
              }
              props.closePaymentAddCardModal();
            })
            .catch((error) => {
              console.log("Error", error);
              setAddCardButtonDisable(false);
              setAddCardLoadingContent(null);
              const notificationMessage = getErrorNotificationMessage(
                "Error Please try again"
              );
              props.dispatch(createNotification(notificationMessage));
            });
        })
        .catch((error) => {
          console.log("Eroor", error);
          setAddCardButtonDisable(false);
          setAddCardLoadingContent(null);
          const notificationMessage = getErrorNotificationMessage(
            "Please check your card details and try again.."
          );
          props.dispatch(createNotification(notificationMessage));
        });
    } else {
      setAddCardButtonDisable(false);
      setAddCardLoadingContent(null);
      const notificationMessage = getErrorNotificationMessage(
        "Stripe is not configured"
      );
      props.dispatch(createNotification(notificationMessage));
    }
  };

  const { t } = props;

  return (
    <>
      <Modal
        className="modal-dialog-center payment-add-card-modal"
        size="md"
        centered
        show={props.paymentAddCard}
        onHide={props.closePaymentAddCardModal}
      >
        <Form>
          <Modal.Header closeButton>
            <Modal.Title>{t("add_card")}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={12} md={7}>
                <CardElement />
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="button"
              className="btn btn-danger width-btn"
              data-dismiss="modal"
              onClick={props.closePaymentAddCardModal}
            >
              {t("cancel")}
            </Button>
            <Button
              type="submit"
              className="btn btn-success width-btn"
              data-dismiss="modal"
              onClick={addCard}
              disabled={addCardButtonDisable}
            >
              {addCardLoadingContent != null ? addCardLoadingContent : t("add")}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(null, mapDispatchToProps)(withNamespaces()(PaymentAddCardModal));
