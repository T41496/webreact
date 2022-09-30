import {
  SAVE_PRO_OWNER_START,
  SAVE_PRO_OWNER_SUCCESS,
  SAVE_PRO_OWNER_FAILURE,
  FETCH_SINGLE_PRO_OWNER_START,
  FETCH_SINGLE_PRO_OWNER_SUCCESS,
  FETCH_SINGLE_PRO_OWNER_FAILURE,
  SET_VISIBILITY_PRO_OWNER_START,
  SET_VISIBILITY_PRO_OWNER_SUCCESS,
  SET_VISIBILITY_PRO_OWNER_FAILURE,
  UPDATE_AVAILABILITY_PRO_OWNER_START,
  UPDATE_AVAILABILITY_PRO_OWNER_SUCCESS,
  UPDATE_AVAILABILITY_PRO_OWNER_FAILURE,
  FETCH_PRODUCTS_PRO_OWNER_START,
  FETCH_PRODUCTS_PRO_OWNER_SUCCESS,
  FETCH_PRODUCTS_PRO_OWNER_FAILURE,
  FETCH_PRO_CATE_PRO_OWNER_START,
  FETCH_PRO_CATE_PRO_OWNER_SUCCESS,
  FETCH_PRO_CATE_PRO_OWNER_FAILURE,
  FETCH_PRO_SUBCATE_PRO_OWNER_START,
  FETCH_PRO_SUBCATE_PRO_OWNER_SUCCESS,
  FETCH_PRO_SUBCATE_PRO_OWNER_FAILURE,
  PRO_SEARCH_PRO_OWNER_START,
  PRO_SEARCH_PRO_OWNER_SUCCESS,
  PRO_SEARCH_PRO_OWNER_FAILURE,
  FETCH_PRO_IMAGE_PRO_OWNER_START,
  FETCH_PRO_IMAGE_PRO_OWNER_SUCCESS,
  FETCH_PRO_IMAGE_PRO_OWNER_FAILURE,
  SAVE_PRO_IMAGE_PRO_OWNER_START,
  SAVE_PRO_IMAGE_PRO_OWNER_SUCCESS,
  SAVE_PRO_IMAGE_PRO_OWNER_FAILURE,
  DELETE_PRO_IMAGE_PRO_OWNER_START,
  DELETE_PRO_IMAGE_PRO_OWNER_SUCCESS,
  DELETE_PRO_IMAGE_PRO_OWNER_FAILURE,
} from "./ActionConstant";

// save product owner

export function saveProOwnerStart(data) {
  return {
    type: SAVE_PRO_OWNER_START,
    data,
  };
}

export function saveProOwnerSuccess(data) {
  return {
    type: SAVE_PRO_OWNER_SUCCESS,
    data,
  };
}

export function saveProOwnerFailure(error) {
  return {
    type: SAVE_PRO_OWNER_FAILURE,
    error,
  };
}

// fetch single produc owner actions.

export function fetchSingleProOwnerStart(data) {
  return {
    type: FETCH_SINGLE_PRO_OWNER_START,
    data,
  };
}

export function fetchSingleProOwnerSuccess(data) {
  return {
    type: FETCH_SINGLE_PRO_OWNER_SUCCESS,
    data,
  };
}

export function fetchSingleProOwnerFailure(error) {
  return {
    type: FETCH_SINGLE_PRO_OWNER_FAILURE,
    error,
  };
}

// setVisibilityProOwner actions.

export function setVisibilityProOwnerStart(data) {
  return {
    type: SET_VISIBILITY_PRO_OWNER_START,
    data,
  };
}

export function setVisibilityProOwnerSuccess(data) {
  return {
    type: SET_VISIBILITY_PRO_OWNER_SUCCESS,
    data,
  };
}

export function setVisibilityProOwnerFailure(error) {
  return {
    type: SET_VISIBILITY_PRO_OWNER_FAILURE,
    error,
  };
}

//UPDATE_AVAILABILITY_PRO_OWNER actions.

export function updateAvailabiltyProOwnerStart(data) {
  return {
    type: UPDATE_AVAILABILITY_PRO_OWNER_START,
    data,
  };
}

export function updateAvailabiltyProOwnerSuccess(data) {
  return {
    type: UPDATE_AVAILABILITY_PRO_OWNER_SUCCESS,
    data,
  };
}

export function updateAvailabiltyProOwnerFailure(error) {
  return {
    type: UPDATE_AVAILABILITY_PRO_OWNER_FAILURE,
    error,
  };
}

// FETCH_PRODUCTS_PRO_OWNER actions.

export function fetchProductsProOwnerStart(data) {
  return {
    type: FETCH_PRODUCTS_PRO_OWNER_START,
    data,
  };
}

export function fetchProductsProOwnerSuccess(data) {
  return {
    type: FETCH_PRODUCTS_PRO_OWNER_SUCCESS,
    data,
  };
}

export function fetchProductsProOwnerFailure(error) {
  return {
    type: FETCH_PRODUCTS_PRO_OWNER_FAILURE,
    error,
  };
}

// FETCH_PRO_CATE_PRO_OWNER actions.

export function fetchProCateProOwnerStart(data) {
  return {
    type: FETCH_PRO_CATE_PRO_OWNER_START,
    data,
  };
}

export function fetchProCateProOwnerSuccess(data) {
  return {
    type: FETCH_PRO_CATE_PRO_OWNER_SUCCESS,
    data,
  };
}

export function fetchProCateProOwnerFailure(error) {
  return {
    type: FETCH_PRO_CATE_PRO_OWNER_FAILURE,
    error,
  };
}

// FETCH_PRO_SUBCATE_PRO_OWNER actions.

export function fetchProSubCateProOwnerStart(data) {
  return {
    type: FETCH_PRO_SUBCATE_PRO_OWNER_START,
    data,
  };
}

export function fetchProSubCateProOwnerSuccess(data) {
  return {
    type: FETCH_PRO_SUBCATE_PRO_OWNER_SUCCESS,
    data,
  };
}

export function fetchProSubCateProOwnerFailure(error) {
  return {
    type: FETCH_PRO_SUBCATE_PRO_OWNER_FAILURE,
    error,
  };
}

// PRO_SEARCH_PRO_OWNER actions.

export function proSearchProOwnerStart(data) {
  return {
    type: PRO_SEARCH_PRO_OWNER_START,
    data,
  };
}

export function proSearchProOwnerSuccess(data) {
  return {
    type: PRO_SEARCH_PRO_OWNER_SUCCESS,
    data,
  };
}

export function proSearchProOwnerFailure(error) {
  return {
    type: PRO_SEARCH_PRO_OWNER_FAILURE,
    error,
  };
}

// FETCH_PRO_IMAGE_PRO_OWNER actions.

export function fetchProImageProOwnerStart(data) {
  return {
    type: FETCH_PRO_IMAGE_PRO_OWNER_START,
    data,
  };
}

export function fetchProImageProOwnerSuccess(data) {
  return {
    type: FETCH_PRO_IMAGE_PRO_OWNER_SUCCESS,
    data,
  };
}

export function fetchProImageProOwnerFailure(error) {
  return {
    type: FETCH_PRO_IMAGE_PRO_OWNER_FAILURE,
    error,
  };
}

// SAVE_PRO_IMAGE_PRO_OWNER actions.

export function saveProImageProOwnerStart(data) {
  return {
    type: SAVE_PRO_IMAGE_PRO_OWNER_START,
    data,
  };
}

export function saveProImageProOwnerSuccess(data) {
  return {
    type: SAVE_PRO_IMAGE_PRO_OWNER_SUCCESS,
    data,
  };
}

export function saveProImageProOwnerFailure(error) {
  return {
    type: SAVE_PRO_IMAGE_PRO_OWNER_FAILURE,
    error,
  };
}

// DELETE_PRO_IMAGE_PRO_OWNER actions.

export function deleteProImageProOwnerStart(data) {
  return {
    type: DELETE_PRO_IMAGE_PRO_OWNER_START,
    data,
  };
}

export function deleteProImageProOwnerSuccess(data) {
  return {
    type: DELETE_PRO_IMAGE_PRO_OWNER_SUCCESS,
    data,
  };
}

export function deleteProImageProOwnerFailure(error) {
  return {
    type: DELETE_PRO_IMAGE_PRO_OWNER_FAILURE,
    error,
  };
}
