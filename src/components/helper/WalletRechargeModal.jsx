import React, { useState, useEffect } from "react";
import { Form, Button, Modal, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { fetchCardDetailsStart } from "../../store/actions/CardsAction";
import { sendWalletRechargeStart } from "../../store/actions/WithDrawAction";
import { Link } from "react-router-dom";
import { withNamespaces } from 'react-i18next';

const WalletRechargeModal = (props) => {
  
  useEffect(() => {
    props.dispatch(fetchCardDetailsStart());
  }, []);

  const [inputData, setInputData] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    props.dispatch(sendWalletRechargeStart(inputData));
  };

  const { t } = props;

  return (
    <>
      <Modal
        className="modal-dialog-center withdraw-modal"
        size="md"
        centered
        show={props.rechargeModal}
        onHide={props.closeRechargeModal}
      >
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>{t("wallet_recharge")}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {props.payments.loading ? (
              t("loading")
            ) : (
              <Row>
                <Col md="12">
                  <div className="mb-5">
                    <h4 className="text-muted">
                      {t("wallet_balance")}:{" "}
                      <span className="text-muted">
                        {props.payments.data.user_wallet
                          ? props.payments.data.user_wallet.remaining_formatted
                          : ""}
                      </span>
                    </h4>
                  </div>
                </Col>
              </Row>
            )}
            <div className="floating-form">
              <div className="floating-label">
                <input
                  className="floating-input"
                  type="number"
                  placeholder="Amount"
                  value={inputData.amount}
                  onChange={(event) =>
                    setInputData({
                      ...inputData,
                      amount: event.currentTarget.value,
                    })
                  }
                />
                <span className="highlight"></span>
                <label className="default-label">{t("enter_amount")}</label>
              </div>
              <h4 style={{ "padding":"10px" }} className="text-muted">{t("Change_card")} <Link className="text-sm" to={`/cards`}>{t("Click_here")}</Link></h4>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="button"
              className="btn btn-danger"
              data-dismiss="modal"
              onClick={props.closeRechargeModal}
            >
              {t("cancel")}
            </Button>
            <Button
              type="button"
              className="btn btn-success"
              data-dismiss="modal"
              onClick={handleSubmit}
              disabled={props.sendWalletRecharge.buttonDisable}
            >
              {props.sendWalletRecharge.loadingButtonContent !== null
                ? props.sendWalletRecharge.loadingButtonContent
                : t("wallet_recharge")}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

const mapStateToPros = (state) => ({
  cards: state.cards.cardDetails,
  sendWalletRecharge: state.withDraw.sendWalletRecharge,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(withNamespaces()(WalletRechargeModal));
