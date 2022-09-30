import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Col, Form, Media, Image, Row, Button } from "react-bootstrap";
import {
  fetchUserDetailsStart,
} from "../../store/actions/UserAction";
import configuration from "react-global-configuration";
import "./StripeConnect.css";
import { connect } from "react-redux";
import { withNamespaces } from "react-i18next";

class StripeConnect extends Component {
  
  componentDidMount() {
    this.props.dispatch(fetchUserDetailsStart());
  }

  render() {
    const { t } = this.props;
    return (
      <>
        <div className="static-page-sec stripe-page">
          <Container>
            <Row>
                <Col sm="12" md="12">
                  <h4 className="head-title">Stripe Connect</h4>
                  <div className="stripe-content">
                    { this.props.profile.loading ? t("loading")
                      : this.props.profile.data.stripe_acc_id != null ? 
                        <p>{t("status")} : <strong>{t("account_connected")}</strong></p>
                      : <p>{t("status")} : <strong>{t("account_not_connected")}</strong></p>
                    }
                    <p>{t("please_connect_your_bank_details_in_stripe")}</p>
                    <a href={configuration.get("configData.stripe_oauth_url")}>
                      <Button className="btn btn-primary" id="connect_with_stripe">{t("connect_with_stripe")}</Button>
                    </a>
                  </div>
                </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

const mapStateToPros = (state) => ({
  profile: state.users.profile,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(withNamespaces()(StripeConnect));