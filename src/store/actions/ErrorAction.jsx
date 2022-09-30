import { ERROR_LOGOUT_CHECK } from "./ActionConstant";

export function checkLogoutStatus(data) {
  return {
    type: ERROR_LOGOUT_CHECK,
    data,
  };
}
