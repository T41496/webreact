import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Tabs,
  Table,
  Tab,
  Image,
  Button,
} from "react-bootstrap";
import "./PaymentsIndex.css";
import { fetchAllTransactionStart } from "../../../store/actions/TransactionAction";
import {
  cancelWithDrawRequestStart,
  fetchWithDrawalsStart,
} from "../../../store/actions/WithDrawAction";
import WithdrawModal from "../../helper/WithdrawModal";
import CancelWithdrawModal from "../../helper/CancelWithdrawModal";
import { fetchPaymentsStart } from "../../../store/actions/UserAction";
import configuration from "react-global-configuration";
import NoDataFound from "../../NoDataFound/NoDataFound";
import api from "../../../Environment";
import { withNamespaces } from "react-i18next";

const PaymentsIndex = (props) => {
  useEffect(() => {
    props.dispatch(fetchAllTransactionStart());
    props.dispatch(fetchWithDrawalsStart());
    props.dispatch(fetchPaymentsStart());
  }, []);
  const [withdrawModal, setWithdrawModal] = useState(false);

  const closeWithdrawModal = () => {
    setWithdrawModal(false);
  };

  const [data, setData] = useState("");
  const [cancelWithdrawModal, setCancelWithdrawModal] = useState(false);
  const closeCancelWithdrawModal = () => {
    setCancelWithdrawModal(false);
    setIsLoading(false);
  };

  const showCancelWithdrawModel = (event, data) => {
    setCancelWithdrawModal(true);
    setData(data);
    setIsLoading(true);
  };

  const [isLoading, setIsLoading] = useState(false);

  const { t } = props;

  return (
    <div className="payment-sec">
      <Container>
        <Row>
          <Col sm={12} md={12} xl={4} lg={4}>
            <div className="payment-card">
              <div className="payment-header">
                <div className="payment-cover-sec">
                  <Image
                    src={(localStorage.getItem("user_cover") != 'null') ? (api.serviceUrl()+'/'+localStorage.getItem("user_cover")) : (api.serviceUrl()+'/images/mysecrets_avatar_square_image.png')}
                    className="payment-cover"
                  />
                </div>
                <div className="paymnet-user-info">
                  <Image
                    src={(localStorage.getItem("user_picture") != 'null') ? (api.serviceUrl()+'/'+localStorage.getItem("user_picture")) : (api.serviceUrl()+'/images/mysecrets_avatar_square_image.png')}
                    className="profile-img"
                  />
                  <div className="payment-user-details">
                    <h2 className="title">{localStorage.getItem("name")}</h2>
                    <p className="desc">
                      <Link to={`/profile`}>
                        @{localStorage.getItem("username")}
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
              <div className="payment-body">
                {props.payments.loading ? (
                  t("loading")
                ) : (
                  <Row>
                    <Col sm={6} xs={6} md={6} className="padding-sm space-sm">
                      <div className="flex-box">
                        <div className="payment-body-icon">
                          <i className="fas fa-bars"></i>
                        </div>
                        <div className="payment-body-info">
                          <h3>{t("posts")}</h3>
                          <h4>{props.payments.data.user.total_posts}</h4>
                        </div>
                      </div>
                    </Col>

                    <Col sm={6} xs={6} md={6} className="padding-sm">
                      <div className="flex-box">
                        <div className="payment-body-icon">
                          <i className="fas fa-unlock-alt"></i>
                        </div>
                        <div className="payment-body-info">
                          <h3>{t("subscribed")}</h3>
                          <h4>{props.payments.data.user.total_followings}</h4>
                        </div>
                      </div>
                    </Col>
                    <Col sm={6} xs={6} md={6} className="padding-sm">
                      <div className="flex-box">
                        <div className="payment-body-icon">
                          <i className="fas fa-user-friends"></i>
                        </div>
                        <div className="payment-body-info">
                          <h3>{t("subscribers")}</h3>
                          <h4>{props.payments.data.user.total_followers}</h4>
                        </div>
                      </div>
                    </Col>
                  </Row>
                )}
              </div>
            </div>
            <div className="payment-refer-add-box hidden">
              <div className="payment-body">
                <h2>{t("refer_your_friend")}</h2>
                <Link to="#" aria-current="page" className="sign-in-logo">
                  <Image
                    src={configuration.get("configData.site_logo")}
                    width="237"
                  />
                </Link>
                <h2>{t("earn_commission")},</h2>
                <h2>{t("lifetime")}!</h2>
              </div>
              <div className="payment-footer">
                <h2>
                  <i className="fab fa-twitter mr-3"></i>{" "}
                  {t("tweet_your_referral")}
                </h2>
              </div>
            </div>
          </Col>
          <Col sm={12} md={12} xl={8} lg={8}>
            <div className="payment-tabs-card">
              <div className="flex-content">
                <h2>{t("statements")}</h2>
                <Button
                  className="send-withdraw-btn"
                  onClick={() => setWithdrawModal(true)}
                >
                  {t("send_withdraw")}
                </Button>
              </div>
              <Tabs defaultActiveKey="earnings"  id="uncontrolled-tab-example">
                <Tab eventKey="earnings" title={t("earnings")}>
                  <div className="payment-tabs-content">
                    {props.transaction.loading ? (
                      t("loading")
                    ) : props.transaction.data.history.length > 0 ? (
                      <Table borderedless responsive>
                        <thead>
                          <tr className="bg-white">
                            <th>{t("date")}</th>
                            <th>{t("transaction_id")}</th>
                            <th>{t("mode")}</th>
                            <th>{t("message")}</th>
                            <th>{t("amount")}</th>
                            <th>{t("service_fee")}</th>
                            <th>{t("status")}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {props.transaction.data.history.map((history) => (
                            <tr>
                              <td>{history.paid_date}</td>
                              <td>{history.payment_id}</td>
                              <td>{history.payment_mode}</td>
                              <td>{history.message}</td>
                              <td>{history.paid_amount_formatted}</td>
                              <td>{history.admin_amount_formatted}</td>
                              <td>
                                <p>
                                  <i className="far fa-clock mr-2"></i>
                                  {history.status_formatted}
                                </p>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    ) : (
                      <NoDataFound />
                    )}
                  </div>
                </Tab>

                <Tab eventKey="payments" title={t('withdraws')}>
                  <div className="payment-tabs-content">
                    {props.withDrawals.loading ? (
                      t("loading")
                    ) : props.withDrawals.data.history.length > 0 ? (
                      <Table borderedless responsive>
                        <thead>
                          <tr className="bg-white">
                            <th>{t("date")}</th>
                            <th>{t("transaction_id")}</th>
                            <th>{t("billing_account")}</th>
                            <th>{t("requested")}</th>
                            <th>{t("paid")}</th>
                            <th>{t("status")}</th>
                            <th>{t("action")}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {props.withDrawals.data.history.map(
                            (withDrawRequest) => (
                              <tr>
                                <td>{withDrawRequest.created}</td>
                                <td>
                                  {withDrawRequest.user_withdrawal_unique_id}
                                </td>
                                <td>{withDrawRequest.billing_account_name}</td>
                                <td>
                                  {withDrawRequest.requested_amount_formatted}
                                </td>
                                <td>{withDrawRequest.paid_amount_formatted}</td>
                                <td>{withDrawRequest.status_formatted}</td>
                                <td>
                                  {withDrawRequest.cancel_btn_status == 1 ? (
                                    <Button
                                      onClick={(event) =>
                                        showCancelWithdrawModel(
                                          event,
                                          withDrawRequest
                                        )
                                      }
                                      className="cancel-btn"
                                    >
                                      {t("cancel")}
                                    </Button>
                                  ) : (
                                    ""
                                  )}
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </Table>
                    ) : (
                      <NoDataFound />
                    )}
                  </div>
                </Tab>
              </Tabs>
            </div>
          </Col>
        </Row>
      </Container>
      <WithdrawModal
        withdrawModal={withdrawModal}
        closeWithdrawModal={closeWithdrawModal}
        payments={props.payments}
      />
      <CancelWithdrawModal
        closeCancelWithdrawModal={closeCancelWithdrawModal}
        cancelWithdrawModal={cancelWithdrawModal}
        data={data}
        loading={isLoading}
      />
    </div>
  );
};

const mapStateToPros = (state) => ({
  withDrawals: state.withDraw.withDrawals,
  transaction: state.transaction.allTransaction,
  payments: state.users.payments,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(withNamespaces()(PaymentsIndex));
