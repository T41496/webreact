import {
  SEND_TIP_BY_STRIPE_START,
  SEND_TIP_BY_STRIPE_SUCCESS,
  SEND_TIP_BY_STRIPE_FAILURE,
  SEND_TIP_BY_WALLET_START,
  SEND_TIP_BY_WALLET_SUCCESS,
  SEND_TIP_BY_WALLET_FAILURE,
  SEND_TIP_BY_PAYPAL_START,
  SEND_TIP_BY_PAYPAL_SUCCESS,
  SEND_TIP_BY_PAYPAL_FAILURE,
} from "./ActionConstant";

export function sendTipStripeStart(data) {
  return {
    type: SEND_TIP_BY_STRIPE_START,
    data,
  };
}

export function sendTipStripeSuccess(data) {
  return {
    type: SEND_TIP_BY_STRIPE_SUCCESS,
    data,
  };
}

export function sendTipStripeFailure(error) {
  return {
    type: SEND_TIP_BY_STRIPE_FAILURE,
    error,
  };
}

export function sendTipWalletStart(data) {
  return {
    type: SEND_TIP_BY_WALLET_START,
    data,
  };
}

export function sendTipWalletSuccess(data) {
  return {
    type: SEND_TIP_BY_WALLET_SUCCESS,
    data,
  };
}

export function sendTipWalletFailure(error) {
  return {
    type: SEND_TIP_BY_WALLET_FAILURE,
    error,
  };
}

export function sendTipPaypalStart(data) {
  return {
    type: SEND_TIP_BY_PAYPAL_START,
    data,
  };
}

export function sendTipPaypalSuccess(data) {
  return {
    type: SEND_TIP_BY_PAYPAL_SUCCESS,
    data,
  };
}

export function sendTipPaypalFailure(error) {
  return {
    type: SEND_TIP_BY_PAYPAL_FAILURE,
    error,
  };
}
