import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Button, Container, Row, Col, Table, Badge } from "react-bootstrap";
import "../../Wallet/Wallet.css";
import {
  deleteBankAccountStart,
  getBankAccountStart,
  makeDefaultBankAccountStart,
} from "../../../store/actions/BankAccountAction";
import { Link } from "react-router-dom";
import NoDataFound from "../../NoDataFound/NoDataFound";
import BillingAccountLoader from "../../Loader/BillingAccountLoader";
import { withNamespaces } from 'react-i18next';

const BillingAccountIndex = (props) => {
  useEffect(() => {
    props.dispatch(getBankAccountStart());
  }, []);

  const { t } = props;

  return (
    <>
      <div className="wallet-sec">
        <Container>
          <Row>
            <Col sm={12} md={12}>
              <div className="wallet-header-sec">
                <Row>
                  <Col sm={12} md={12} xl={9}>
                    <h3>{t("billing_accounts")}</h3>
                    <p className="text-muted f-2">
                      {t("billing_accounts_para")}
                    </p>
                  </Col>
                  <Col sm={12} md={12} xl={3}>
                    <div className="edit-save">
                      <Link className="receive-btn-blue" to={"/add-bank"}>
                        {t("add_new_account")}
                      </Link>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="trans-table-sec">
        <Container>
          {props.bankAccount.loading ? (
            <BillingAccountLoader />
          ) : props.bankAccount.data.billing_accounts.length > 0 ? (
            <Row>
              <Col sm={12} md={12}>
                <div className="trans-table">
                  <Table borderedless responsive>
                    <thead>
                      <tr className="bg-white text-muted text-center">
                        <th>{t("nickname")}</th>
                        <th>{t("account_holder_name")}</th>
                        <th>{t("account_number")}</th>
                        <th>{t("bank_name")}</th>
                        <th>{t("ifsc_code")}</th>
                        <th>{t("swift_code")}</th>
                        <th>{t("route_number")}</th>
                        <th>{t("iban_number")}</th>
                        <th>{t("is_default")}</th>
                        <th>{t("status")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {props.bankAccount.data.billing_accounts.map(
                        (accounts) => (
                          <tr key={accounts.user_billing_account_id}>
                            <td>{accounts.nickname}</td>
                            <td>
                              {accounts.account_holder_name
                                ? accounts.account_holder_name
                                : "-"}
                            </td>
                            <td className="amount">
                              {accounts.account_number
                                ? accounts.account_number
                                : "-"}
                            </td>
                            <td>
                              {accounts.bank_name ? accounts.bank_name : "-"}
                            </td>
                            <td>
                              {accounts.ifsc_code ? accounts.ifsc_code : "-"}
                            </td>
                            <td>
                              {accounts.swift_code ? accounts.swift_code : "-"}
                            </td>
                            <td>
                              {accounts.route_number
                                ? accounts.route_number
                                : "-"}
                            </td>
                            <td>
                              {accounts.iban_number
                                ? accounts.iban_number
                                : "-"}
                            </td>
                            {accounts.is_default === 1 ? (
                              <td>
                                <Badge className="unconfirmed-badge">
                                  {t("yes")}
                                </Badge>
                              </td>
                            ) : (
                              <td> - </td>
                            )}
                            <td>
                              {accounts.is_default === 0 ? (
                                <Button
                                  onClick={() =>
                                    props.dispatch(
                                      makeDefaultBankAccountStart({
                                        user_billing_account_id:
                                          accounts.user_billing_account_id,
                                      })
                                    )
                                  }
                                >
                                  {t("make_default")}
                                </Button>
                              ) : null}{" "}
                              <Button
                                onClick={() =>
                                  props.dispatch(
                                    deleteBankAccountStart({
                                      user_billing_account_id:
                                        accounts.user_billing_account_id,
                                    })
                                  )
                                }
                              >
                                {t("delete")}
                              </Button>{" "}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </Table>
                </div>
              </Col>
            </Row>
          ) : (
            <NoDataFound />
          )}
        </Container>
      </div>
    </>
  );
};

const mapStateToPros = (state) => ({
  bankAccount: state.bankAccount.bankAccount,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(withNamespaces()(BillingAccountIndex));
