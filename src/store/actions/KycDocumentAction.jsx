import {
  GET_KYC_DOCUMENT_START,
  GET_KYC_DOCUMENT_SUCCESS,
  GET_KYC_DOCUMENT_FAILURE,
  ADD_KYC_DOCUMENT_START,
  ADD_KYC_DOCUMENT_SUCCESS,
  ADD_KYC_DOCUMENT_FAILURE,
} from "./ActionConstant";

// Get kyc document actions.

export function getKycDocumentStart(data) {
  return {
    type: GET_KYC_DOCUMENT_START,
    data,
  };
}

export function getKycDocumentSuccess(data) {
  return {
    type: GET_KYC_DOCUMENT_SUCCESS,
    data,
  };
}

export function getKycDocumentFailure(error) {
  return {
    type: GET_KYC_DOCUMENT_FAILURE,
    error,
  };
}

// add kyc document actions.

export function addKycDocumentStart(data) {
  return {
    type: ADD_KYC_DOCUMENT_START,
    data,
  };
}

export function addKycDocumentSuccess(data) {
  return {
    type: ADD_KYC_DOCUMENT_SUCCESS,
    data,
  };
}

export function addKycDocumentFailure(error) {
  return {
    type: ADD_KYC_DOCUMENT_FAILURE,
    error,
  };
}
