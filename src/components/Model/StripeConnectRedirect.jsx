import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Row,
  Col,
  Image,
  Modal,
  Media,
} from "react-bootstrap";
import {
  fetchStripeConnectStart,
} from "../../store/actions/UserAction";
import { withNamespaces } from "react-i18next";
import * as QueryString from "query-string";
import api from "../../Environment";

const StripeConnectRedirect = (props) => {

  const params = QueryString.parse(props.location.search);
  useEffect(() => {
    props.dispatch(
      fetchStripeConnectStart({
        code: params.code,
      })
    );
  }, []);

  const { t } = props;

  return (
    <>
    </>
  );
};

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapDispatchToProps
)(withNamespaces()(StripeConnectRedirect));