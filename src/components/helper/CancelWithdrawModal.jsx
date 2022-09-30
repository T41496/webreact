import React, { useState, useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { cancelWithDrawRequestStart } from "../../store/actions/WithDrawAction";
import { withNamespaces } from 'react-i18next';

const CancelWithdrawModal = (props) => {
  const [cancelWithdrawInputData, setCancelWithdrawInputData] = useState({});

  useEffect(() => {
    console.log("Testin...");
    setCancelWithdrawInputData({
      ...cancelWithdrawInputData,
      user_withdrawal_id: props.data.user_withdrawal_id,
    });
  }, [props.loading]);

  const handleSubmit = (event) => {
    event.preventDefault();
    props.dispatch(cancelWithDrawRequestStart(cancelWithdrawInputData));
    props.closeCancelWithdrawModal();
  };

  const { t } = props;

  return (
    <>
      <Modal
        className="modal-dialog-center"
        size="md"
        centered
        show={props.cancelWithdrawModal}
        onHide={props.closeCancelWithdrawModal}
      >
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>{t("withdraw_request")}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="floating-form">
              <div className="floating-label">
                <input
                  className="floating-input"
                  type="text"
                  placeholder=""
                  value={cancelWithdrawInputData.cancel_reason}
                  name="cancel_reason"
                  onChange={(event) =>
                    setCancelWithdrawInputData({
                      ...cancelWithdrawInputData,
                      cancel_reason: event.currentTarget.value,
                    })
                  }
                />
                <span className="highlight"></span>
                <label className="default-label">{t("cancel_reason")}</label>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="button"
              className="btn btn-danger"
              data-dismiss="modal"
              onClick={props.closeCancelWithdrawModal}
            >
              {t("cancel")}
            </Button>
            <Button
              type="submit"
              className="btn btn-success"
              data-dismiss="modal"
              disabled={props.cancelWithDraw.buttonDisable}
            >
              {props.cancelWithDraw.loadingButtonContent !== null
                ? props.cancelWithDraw.loadingButtonContent
                : t("cancel_withdraw")}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

const mapStateToPros = (state) => ({
  cancelWithDraw: state.withDraw.cancelWithDraw,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(withNamespaces()(CancelWithdrawModal));
