import {
  FETCH_SUBSCRIPTION_START,
  FETCH_SUBSCRIPTION_SUCCESS,
  FETCH_SUBSCRIPTION_FAILURE,
  FETCH_MY_SUBSCRIPTION_START,
  FETCH_MY_SUBSCRIPTION_SUCCESS,
  FETCH_MY_SUBSCRIPTION_FAILURE,
  FETCH_SINGLE_SUBSCRIPTION_START,
  FETCH_SINGLE_SUBSCRIPTION_SUCCESS,
  FETCH_SINGLE_SUBSCRIPTION_FAILURE,
  SUBSCRIPTION_PAYMENT_STRIPE_START,
  SUBSCRIPTION_PAYMENT_STRIPE_SUCCESS,
  SUBSCRIPTION_PAYMENT_STRIPE_FAILURE,
  SUBSCRIPTION_PAYMENT_WALLET_START,
  SUBSCRIPTION_PAYMENT_WALLET_SUCCESS,
  SUBSCRIPTION_PAYMENT_WALLET_FAILURE,
  SUBSCRIPTION_AUTO_RENEWAL_START,
  SUBSCRIPTION_AUTO_RENEWAL_SUCCESS,
  SUBSCRIPTION_AUTO_RENEWAL_FAILURE,
  SUBSCRIPTION_PAYMENT_PAYPAL_START,
  SUBSCRIPTION_PAYMENT_PAYPAL_SUCCESS,
  SUBSCRIPTION_PAYMENT_PAYPAL_FAILURE,
} from "./ActionConstant";

// Get subscription actions.

export function fetchSubscriptionStart(data) {
  return {
    type: FETCH_SUBSCRIPTION_START,
    data,
  };
}

export function fetchSubscriptionSuccess(data) {
  return {
    type: FETCH_SUBSCRIPTION_SUCCESS,
    data,
  };
}

export function fetchSubscriptionFailure(error) {
  return {
    type: FETCH_SUBSCRIPTION_FAILURE,
    error,
  };
}

// Get My subscription actions.

export function fetchMySubscriptionStart(data) {
  return {
    type: FETCH_MY_SUBSCRIPTION_START,
    data,
  };
}

export function fetchMySubscriptionSuccess(data) {
  return {
    type: FETCH_MY_SUBSCRIPTION_SUCCESS,
    data,
  };
}

export function fetchMySubscriptionFailure(error) {
  return {
    type: FETCH_MY_SUBSCRIPTION_FAILURE,
    error,
  };
}

// Get single subscription actions.

export function fetchSingleSubscriptionStart(data) {
  return {
    type: FETCH_SINGLE_SUBSCRIPTION_START,
    data,
  };
}

export function fetchSingleSubscriptionSuccess(data) {
  return {
    type: FETCH_SINGLE_SUBSCRIPTION_SUCCESS,
    data,
  };
}

export function fetchSingleSubscriptionFailure(error) {
  return {
    type: FETCH_SINGLE_SUBSCRIPTION_FAILURE,
    error,
  };
}

// Subscription Payment stripe actions.

export function subscriptionPaymentStripeStart(data) {
  return {
    type: SUBSCRIPTION_PAYMENT_STRIPE_START,
    data,
  };
}

export function subscriptionPaymentStripeSuccess(data) {
  return {
    type: SUBSCRIPTION_PAYMENT_STRIPE_SUCCESS,
    data,
  };
}

export function subscriptionPaymentStripeFailure(error) {
  return {
    type: SUBSCRIPTION_PAYMENT_STRIPE_FAILURE,
    error,
  };
}

// Subscription Payment wallet actions.

export function subscriptionPaymentWalletStart(data) {
  return {
    type: SUBSCRIPTION_PAYMENT_WALLET_START,
    data,
  };
}

export function subscriptionPaymentWalletSuccess(data) {
  return {
    type: SUBSCRIPTION_PAYMENT_WALLET_SUCCESS,
    data,
  };
}

export function subscriptionPaymentWalletFailure(error) {
  return {
    type: SUBSCRIPTION_PAYMENT_WALLET_FAILURE,
    error,
  };
}

// Subscription auto renewal actions.

export function subscriptionAutoRenewalStart(data) {
  return {
    type: SUBSCRIPTION_AUTO_RENEWAL_START,
    data,
  };
}

export function subscriptionAutoRenewalSuccess(data) {
  return {
    type: SUBSCRIPTION_AUTO_RENEWAL_SUCCESS,
    data,
  };
}

export function subscriptionAutoRenewalFailure(error) {
  return {
    type: SUBSCRIPTION_AUTO_RENEWAL_FAILURE,
    error,
  };
}

// Subscription Payment stripe actions.

export function subscriptionPaymentPaypalStart(data) {
  return {
    type: SUBSCRIPTION_PAYMENT_PAYPAL_START,
    data,
  };
}

export function subscriptionPaymentPaypalSuccess(data) {
  return {
    type: SUBSCRIPTION_PAYMENT_PAYPAL_SUCCESS,
    data,
  };
}

export function subscriptionPaymentPaypalFailure(error) {
  return {
    type: SUBSCRIPTION_PAYMENT_PAYPAL_FAILURE,
    error,
  };
}