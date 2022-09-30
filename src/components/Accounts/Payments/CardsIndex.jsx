import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Image } from "react-bootstrap";
import AddCardModal from "../../helper/AddCardModal";
import "./CardsIndex.css";
import {
  fetchCardDetailsStart,
  selectDefaultCardStart,
  deleteCardStart
} from "../../../store/actions/CardsAction";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentAddCardModal from "../../helper/PaymentAddCardModal";
import NoDataFound from "../../NoDataFound/NoDataFound";
import CardListLoader from "../../Loader/CardListLoader";
import configuration from "react-global-configuration";
import { withNamespaces } from 'react-i18next';

const CardsIndex = (props) => {
  useEffect(() => {
    props.dispatch(fetchCardDetailsStart());
  }, []);

  const stripePromise = loadStripe(
    configuration.get("configData.stripe_publishable_key")
  );

  const [addCard, setAddCard] = useState(false);

  const closeAddCardModal = () => {
    setAddCard(false);
  };

  const [paymentAddCard, setPaymentAddCard] = useState(false);

  const closePaymentAddCardModal = () => {
    setPaymentAddCard(false);
  };

  const { cards } = props;

  const deleteCard = (id) => {
    if(window.confirm(t('alert_card_delete'))) {
      props.dispatch(deleteCardStart({ user_card_id: id }));
    }
  };

  const { t } = props;

  return (
    <>
      <div className="card-list-sec">
        <Container>
          <h4 className="head-title">{t("your_cards")}</h4>
          <Row>
            <Col sm={12} md={6} xl={4}>
              <div
                className="card-list-box cursor-pointer-link"
                onClick={() => setPaymentAddCard(true)}
              >
                <div className="add-account-sec">
                  <Image
                    src="/assets/images/icons/add-card.svg"
                    className="add-card-img"
                  />
                  <h5 className="text-muted">{t("add_card")}</h5>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            {cards.loading ? (
              <CardListLoader />
            ) : cards.data.cards.length > 0 ? (
              cards.data.cards.map((card) => (
                <Col sm={12} md={6} xl={4}>
                  <div className="card-list-box">
                    <h5 className="mb-4">XXXX XXXX XXXX {card.last_four}</h5>
                    <h5 className="text-muted">{card.card_type}</h5>
                    <div className="payment-bottom">
                      <div className="action-btn">
                        {card.is_default == 1 ? (
                          <p className="card-link-text text-success">
                            {t("default_card")}
                          </p>
                        ) : (
                          <Link
                            className="card-link-text text-info"
                            onClick={() =>
                              props.dispatch(
                                selectDefaultCardStart({
                                  user_card_id: card.id,
                                })
                              )
                            }
                          >
                            {t("mark_as_default")}
                          </Link>
                        )}
                      </div>
                      <Image
                        src="/assets/images/icons/credit-card.svg"
                        className="credit-img"
                      />
                      <Image
                        src="/assets/images/icons/delete.svg"
                        className="credit-img"
                        onClick={() => deleteCard(card.id)}
                      />
                    </div>
                  </div>
                </Col>
              ))
            ) : (
              <NoDataFound />
            )}
          </Row>
        </Container>
      </div>
      <Elements stripe={stripePromise}>
        <PaymentAddCardModal
          paymentAddCard={paymentAddCard}
          closePaymentAddCardModal={closePaymentAddCardModal}
        />
      </Elements>
    </>
  );
};

const mapStateToPros = (state) => ({
  cards: state.cards.cardDetails,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(withNamespaces()(CardsIndex));
