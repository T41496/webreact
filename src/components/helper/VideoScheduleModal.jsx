import React, { useState } from "react";
import {Form, Button, Image, Modal} from "react-bootstrap";
import { withNamespaces } from 'react-i18next';
import { saveSingleCallStart } from "../../store/actions/PostAction";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import moment from 'moment';
import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../../components/helper/NotificationMessage";
import { createNotification } from "react-redux-notify";
import configuration from "react-global-configuration";
import PaypalExpressBtn from "react-paypal-express-checkout";

const VideoScheduleModal = (props) => {
  
  const [value, onChange] = useState(new Date());

  const [validate, setValidate] = useState('');
  const [amount, setAmount] = useState((props.price>0)?props.price:0);
  const [paymentType, setPaymentType] = useState("card");
  const [showPayPal, payPal] = useState(false);

  let yesterday = moment().subtract( 1, 'day' );
  let valid = function( current ){
      return current.isAfter( yesterday );
  };

  let validateDate = () => {
    let dateval = new Date(value);
    let dateCurr = new Date();
    
    if(value){
      if(dateCurr.getTime() > dateval.getTime()){
        setValidate('greater');
        return false;
      }
      else{
        setValidate('');
        return true;
      }
    }
    else{
      setValidate('require');
      return false;
    }
  };

  let handleVideoCallSchedule = (ids,event) => {
    if(validateDate()){
      let dateval = new Date(value);
      let day = dateval.getDate();
      let month = dateval.getMonth()+1;
      let year = dateval.getFullYear();
      let hours = dateval.getHours();
      let min = dateval.getMinutes();
      let sec = dateval.getSeconds();
      let date = year+"-"+month+"-"+day+" "+hours+":"+min+":"+sec;

      props.dispatch(saveSingleCallStart({
        user_id: props.userId,
        schedule_at: date,
        payment_id: '',
        amount: amount,
        payment_type: paymentType,
      }));
      onChange(new Date());
      props.closeVideoScheduleModal();
    }
  };

  const paypalOnSuccess = (payment) => {
    setTimeout(() => {
      if(validateDate()){
        let dateval = new Date(value);
        let day = dateval.getDate();
        let month = dateval.getMonth()+1;
        let year = dateval.getFullYear();
        let hours = dateval.getHours();
        let min = dateval.getMinutes();
        let sec = dateval.getSeconds();
        let date = year+"-"+month+"-"+day+" "+hours+":"+min+":"+sec;

        props.dispatch(saveSingleCallStart({
          user_id: props.userId,
          schedule_at: date,
          payment_id: payment.paymentID,
          amount: amount,
          payment_type: paymentType,
        }));
      }
      onChange(new Date());
      props.closeVideoScheduleModal();
    }, 1000);
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
        className="modal-dialog-center report-modal"
        size="md"
        centered
        show={props.videoSchedule}
        onHide={props.closeVideoScheduleModal}
      >
        <Form>
          <Modal.Header closeButton>
            <Modal.Title>{t("schedule")} {t("date")}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <div className="report-form">
                <Form>                    
                  <Form.Group>
                    <Datetime
                      value={value}
                      isValidDate={ valid }
                      id="schedule_at"
                      closeOnClickOutside
                      onChange={onChange}
                    />
                  </Form.Group>
                </Form>
                {(validate == 'require')?
                  <Form>                    
                    <Form.Group>
                      <span className="text-danger">{t("date_require")}</span>
                    </Form.Group>
                  </Form>
                :
                  ((validate == 'greater')?
                    <Form>                    
                      <Form.Group>
                        <span className="text-danger">{t("date_error")}</span>
                      </Form.Group>
                    </Form>
                  :
                    <div>
                    </div>
                  )
                }
                {(amount>0) ?
                  <Form>
                    <label className="choose-payment-label">
                      {t("choose_payment")}
                    </label>
                    {(amount>0) ?
                      ["radio"].map((type) => (
                        <div key={`custom-inline-${type}`} className="mb-3">
                          <Form.Check
                            custom
                            inline
                            label={(amount>0)?"Card ("+configuration.get("configData.currency")+""+amount+")":"Card"}
                            type={type}
                            id="card"
                            value="card"
                            name="payment_type"
                            defaultChecked={true}
                            onChange={() => setPaymentType("card")}
                          />
                          {configuration.get("configData.is_paypal_enabled") ==
                          1 ? (
                            <Form.Check
                              custom
                              inline
                              label={(amount>0)?"Paypal ("+configuration.get("configData.currency")+""+amount+")":"Paypal"}
                              type={type}
                              // id={`custom-inline-${type}-2`}
                              id="paypal"
                              value="paypal"
                              name="payment_type"
                              onChange={() => setPaymentType("paypal")}
                            />
                          ) : (
                            ""
                          )}
                        </div>
                    )):""}
                  </Form>
                :""}
              </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="button"
              className="btn btn-normal"
              onClick={() => props.closeVideoScheduleModal()}
            >
              {t("cancel")}
            </Button>

            {paymentType === "paypal" && amount != 0 ? (
              <PaypalExpressBtn
                env={env}
                client={client}
                currency={currency}
                total={amount}
                onError={props.paypalOnError}
                onSuccess={paypalOnSuccess}
                onCancel={props.paypalOnCancel}
              />
            ) : null}
            {paymentType !== "paypal" ? (
              <Button
                type="button"
                className="btn btn-theme"
                onClick={() => handleVideoCallSchedule()}
              >
                {t("schedule")}
              </Button> ) : (
              ""
            )}
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

const mapStateToPros = (state) => ({
  saveCall: state.post.saveCallUser,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(withNamespaces()(VideoScheduleModal));

