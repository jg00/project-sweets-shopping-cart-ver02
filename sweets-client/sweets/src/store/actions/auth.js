import * as actionTypes from "./actionTypes";

// Action creators
export const setAuthenticate = responseData => {
  return {
    type: actionTypes.SET_AUTHENTICATE,
    responseData: responseData
  };
};

export const setAuthenticateManually = (boolValue, tokenInfo) => {
  return {
    type: actionTypes.SET_AUTHENTICATE_MANUALLY,
    boolValue: boolValue,
    tokenInfo: tokenInfo
  };
};
