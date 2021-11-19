import { USER_LOGIN_FAIL } from "src/redux/constants/userConstants";

export const tokenhasExpired = (userInfo) => {
  var expire = false;
  if (userInfo) {
    var token = userInfo.token;
    var tokenArray = token.split(".");
    var jwt = JSON.parse(atob(tokenArray[1]));
    if (jwt && jwt.exp && Number.isFinite(jwt.exp)) {
      expire = jwt.exp * 1000;
    } else {
      expire = false;
    }

    if (!expire) {
      return false;
    }
    return Date.now() > expire;
  }
  return false;
};

export const redirectLogin = (history, dispatch) => {
  history.push("/login");
  const message =
    "Su token de autenticación se ha vencido. Acceda otra vez al sistema";
  dispatch({
    type: USER_LOGIN_FAIL,
    payload: message,
  });
};
