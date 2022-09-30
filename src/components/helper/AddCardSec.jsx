import React, { Component } from "react";
import { injectStripe, CardElement } from "react-stripe-elements";
import api from "../../Environment";
import { connect } from "react-redux";
import { createNotification } from "react-redux-notify";
import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../helper/NotificationMessage";
import { fetchCardDetailsStart } from "../../store/actions/CardsAction";
import { withNamespaces } from 'react-i18next';

class AddCardSec extends Component {
  state = {
    addCardLoadingContent: null,
    addCardButtonDisable: false,
  };

  addCard = (ev) => {
    ev.preventDefault();
    this.setState({
      addCardLoadingContent: "Please wait... Request processing...",
      addCardButtonDisable: true,
    });
    if (this.props.stripe) {
      this.props.stripe
        .createToken({ type: "card", name: localStorage.getItem("username") })
        .then((payload) => {
          const inputData = {
            card_token: payload.token.id,
          };
          api
            .postMethod("cards_add", inputData)
            .then((response) => {
              if (response.data.success) {
                const notificationMessage = getSuccessNotificationMessage(
                  response.data.message
                );
                this.props.dispatch(createNotification(notificationMessage));
                this.props.dispatch(fetchCardDetailsStart());
                this.setState({
                  addCardLoadingContent: null,
                  addCardButtonDisable: false,
                });
                this.props.cardAddedStatusChange();
              } else {
                const notificationMessage = getErrorNotificationMessage(
                  response.data.error
                );
                this.props.dispatch(createNotification(notificationMessage));
              }
            })
            .catch((error) => {
              this.setState({
                addCardLoadingContent: null,
                addCardButtonDisable: false,
              });
              const notificationMessage = getErrorNotificationMessage(
                "Error Please try again"
              );
              this.props.dispatch(createNotification(notificationMessage));
            });
        })
        .catch((error) => {
          this.setState({
            addCardLoadingContent: null,
            addCardButtonDisable: false,
          });

          const notificationMessage = getErrorNotificationMessage(
            "Please check your card details and try again.."
          );
          this.props.dispatch(createNotification(notificationMessage));
        });
    } else {
      this.setState({
        addCardLoadingContent: null,
        addCardButtonDisable: false,
      });
      const notificationMessage = getErrorNotificationMessage(
        "Stripe is not configured"
      );
      this.props.dispatch(createNotification(notificationMessage));
    }
  };
  render() {
    const { addCardLoadingContent, addCardButtonDisable } = this.state;
    const { t } = this.props;
    return (
      <div className="modal-body sm-padding">
        <h4 className="title">{t("add_card")}</h4>

        <div className="form-group">
          <CardElement />
        </div>

        <div className="form-group">
          <button
            className="btn btn-group"
            type="submit"
            onClick={this.addCard}
            disabled={addCardButtonDisable}
          >
            {addCardLoadingContent != null ? addCardLoadingContent : t("submit")}
          </button>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(null, mapDispatchToProps)(injectStripe(withNamespaces()(AddCardSec)));
