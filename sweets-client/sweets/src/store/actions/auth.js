import * as actionTypes from "./actionTypes";
import axios from "axios";
import { setAuthenticationToken } from "../../utils";
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
        // console.log(response.data);  // response from database

        if (response.data.success === false) {
          console.log("auth.js", response.data);
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

          /////// historyProps.push(`/`); // (comment for now but redirect works) new change to all products after login
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
