import * as actionTypes from "./actionTypes";
import axios from "axios";
import { setAuthenticationToken } from "../../utils";
import jwtDecode from "jwt-decode";
const LOGIN_URL = "http://localhost:3001/api/auth/";

export const returnAuthActionTypePayload = responseData => {
  return {
    type: actionTypes.SET_AUTHENTICATE,
    responseData: responseData
  };
};

// Action creators
export const setAuthenticate = (user, historyProps) => {
  return dispatch => {
    axios
      .post(LOGIN_URL, user)
      .then(response => {
        console.log("ddddddd", response.data); // response from database

        // if (response.data.error.success === false) {
        if (!response.data.error.success) {
          console.log("auth.js", response.data);
          dispatch(returnAuthActionTypePayload(response.data));
        } else {
          console.log("Login.js > handleLoginButtonClick - true");

          // save the token to localStorage so we can access it later on
          localStorage.setItem("jsonwebtoken", response.data.token);
          // put the token in the request header
          setAuthenticationToken(response.data.token);
          console.log(response.data); // response.data

          /*
            {token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6I…DgwfQ.6HDd603cv6Lhhr31mqCoMi-tiz8blxfbdlwooEEtw4Q", userData: {…}, error: {…}}
            error: {success: true, message: "User Logged In"}
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxQG1haWwuY29tIiwibmFtZSI6InRlc3QxIiwiaWF0IjoxNTQ2NTM5NDgwfQ.6HDd603cv6Lhhr31mqCoMi-tiz8blxfbdlwooEEtw4Q"
            userData: {email: "test1@mail.com", name: "test1"}
            __proto__: Object
          */

          // this.props.onAuthenticate()  // before sendin param;

          // this.props.onAuthenticate(response.data); // before
          dispatch(returnAuthActionTypePayload(response.data));

          // console.log(response.data);
          // this.props.history.push("/"); comment for now

          historyProps.push(`/`); // (comment for now but redirect works) new change to all products after login
        }

        // window.location = "/";
        // this.props.history.push("/");
      })
      .catch(rejected => {
        console.log("Login user connection error: ", rejected);
      });
  };

  // return {
  //   type: actionTypes.SET_AUTHENTICATE,
  //   responseData: responseData
  // };
};

export const setAuthenticateManually = (boolValue, tokenInfo) => {
  return {
    type: actionTypes.SET_AUTHENTICATE_MANUALLY,
    boolValue: boolValue,
    tokenInfo: tokenInfo
  };
};

export const returnTokenActionTypePayload = tokenInfo => {
  return {
    type: actionTypes.SET_CURRENT_USER_ON_SITE_RELOAD,
    tokenInfo: tokenInfo
  };
};

export const checkAuthenticateOnSiteReload = historyProps => {
  return dispatch => {
    // Handle situation where site is reloaded by user on browser
    const token = localStorage.getItem("jsonwebtoken");
    // console.log("test");
    // const tokenInfo = jwtDecode(token);

    let error = {};
    let tokenInfo = {};

    if (!token || token === "undefined") {
      // side note - if not token nothing will be dispatched.
      // error info in the authReducer.js
      console.log("Not Authorized - auth.js - checkAuthenticateOnSiteReload");

      error = {
        // error: {
        success: false,
        message: "Token does not exist.  User not authenticated."
        // }
      };

      tokenInfo = {
        token: {}, // default empty token
        error: error
      };

      console.log(error);
    } else {
      console.log("Authorized - auth.js - checkAuthenticateOnSiteReload");
      // this.props.onAuthenticate();  // was causing error when no token available
      error = {
        // error: {
        success: true,
        message: "Token exist.  User authenticated."
        // }
      };

      // console.log(token);
      // Need to get payload userData from the token in localstore
      // const tokenInfo = jwtDecode(token);
      const tokenDecoded = jwtDecode(token);
      // console.log(
      //   "tokeninfo - auth.js - checkAuthenticateOnSiteReload ",
      //   tokenInfo
      // ); // {email: "sam@mail.com", name: "Sam", isAdmin: true, iat: 1545188894 }

      console.log("tokendecoded", tokenDecoded);

      tokenInfo = {
        token: tokenDecoded,
        error: error
      };

      console.log(
        "tokeninfo - auth.js - checkAuthenticateOnSiteReload ",
        tokenInfo
      ); // {email: "sam@mail.com", name: "Sam", isAdmin: true, iat: 1545188894 }

      // dispatch(returnTokenActionTypePayload(tokenInfo));

      // const formattedTokenInfo = {
      //   email: tokenInfo.email,
      //   name: tokenInfo.name,
      //   isAdmin: tokenInfo.isAdmin
      // };

      // If page "Refreshed" manually override redux property isAuth: true
      // this.props.onAuthenticate();
      // this.props.onAuthenticateManuallySet(true);  // before adding decode
      // this.props.onAuthenticateManuallySet(true, formattedTokenInfo); //(commented for now)
      // this.props.onAuthenticate()
    }

    // Disptch outside of if statement
    dispatch(returnTokenActionTypePayload(tokenInfo));
  };
};
