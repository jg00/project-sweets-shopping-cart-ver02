import * as actionTypes from "./actionTypes";
import * as cartActionCreators from "./cartItems";
import axios from "axios";
import { setAuthenticationToken } from "../../utils";
import jwtDecode from "jwt-decode";
const LOGIN_URL = "http://localhost:3001/api/auth/";
const UPDATE_USER_CART_ID = "http://localhost:3001/api/auth/updateusercartid";

export const returnAuthActionTypePayload = responseData => {
  return {
    type: actionTypes.SET_AUTHENTICATE,
    responseData: responseData
  };
};

// Action creators
export const setAuthenticate = (user, historyProps, authRedirectPath) => {
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
          localStorage.setItem("jsonwebtoken", response.data.token); // original only stored the token.
          localStorage.setItem(
            "jsonwebtokenpayload",
            JSON.stringify(response.data.userData)
          ); // original only stored the token.
          // localStorage.setItem("jsonwebtoken", JSON.stringify(response.data)); // now storing token and userData payload for additional information

          // localStorage.setItem(
          //   "sweetsLocalStoreCart",
          //   JSON.stringify(response.data.userData.cartId)
          // ); // original only stored the token.

          // If user already has a cartid associated to it pull the user's items
          console.log(
            "does use already have a cart?",
            response.data.userData.cartId
          );

          if (response.data.userData.cartId) {
            localStorage.setItem(
              "sweetsLocalStoreCart",
              JSON.stringify(response.data.userData.cartId)
            ); // original only stored the token.
            dispatch(cartActionCreators.loadCartItems());
          }

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

          dispatch(returnAuthActionTypePayload(response.data));

          // Added to auto add user id
          let localStoreCartId = JSON.parse(
            localStorage.getItem("sweetsLocalStoreCart")
          );
          let localJsonWebTokenPayload = JSON.parse(
            localStorage.getItem("jsonwebtokenpayload.cartId")
          );
          // console.log(localStoreCartId, localJsonWebTokenPayload);

          // If localStoreCartId exists and a user is logged in but user CartId is null, set the Cart Id.
          if (localStoreCartId && !localJsonWebTokenPayload) {
            console.log(
              "Set the cart id: ",
              localStoreCartId,
              localJsonWebTokenPayload
            );
            // Dispatch set user id
            dispatch(setUserCartId());
          }

          // maybe

          // dispatch(cartActionCreators.loadCartItems());
          // console.log(redirectTo)
          // this.props.history.push("/"); comment for now
          // historyProps.push(`/`);
          historyProps.push(authRedirectPath);
        }

        // window.location = "/";
        // this.props.history.push("/");
      })
      .catch(rejected => {
        console.log("Login user connection error: ", rejected);
      });
  };
};

/*
export const setAuthenticateManually = (boolValue, tokenInfo) => {
  return {
    type: actionTypes.SET_AUTHENTICATE_MANUALLY,
    boolValue: boolValue,
    tokenInfo: tokenInfo
  };
};
*/

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

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  };
};

// For updating user cart id
export const returnSetUserCartIdActionType = userData => {
  return {
    type: actionTypes.SET_USER_CART_ID,
    userData: userData
  };
};

export const returnSetUserCartIdActionTypeFetchError = error => {
  return {
    type: actionTypes.SET_USER_CART_ID_FETCH_ERROR,
    error: error
  };
};

export const setUserCartId = () => {
  return dispatch => {
    const localCart = JSON.parse(localStorage.getItem("sweetsLocalStoreCart"));
    console.log("here at setUserCartid localCart: ", localCart);

    const userData = JSON.parse(localStorage.getItem("jsonwebtokenpayload"));
    // console.log("here at setUserCartid userData: ", userData);

    console.log("here at setUserCartid userData w/localcart: ", userData);

    if (userData) {
      console.log("lets see if we can then set up userData.cartId");
      userData.cartId = localCart;
      console.log("updated userData.cartId/localCart ", userData);
      // update database
      // api/auth/updateusercartid

      axios
        .post(UPDATE_USER_CART_ID, userData)
        .then(response => {
          console.log(
            "User cart id responsesss UPDATE_USER_CART_ID: ",
            response.data
          );

          // the whole cart is returned and not just the cartItems array property

          // console.log("Cart id: ", response.data.cart._id);
          console.log("User info returned?: ", response.data);

          // dispatch(returnUpdateCartItemActionType(response.data)); // does not exists in reducer yet
          // dispatch

          dispatch(returnSetUserCartIdActionType(userData));
        })

        //  ADD THIS CATCH NEXT.  STILL NEEDS TO BE UPDATED
        .catch(rejected => {
          dispatch(
            returnSetUserCartIdActionTypeFetchError({
              success: false,
              message: "Connection error.  User cart id was not updated. "
            })
          );
        });

      // // dispatch - moved to axios
      // console.log(userData);
      // dispatch(returnSetUserCartIdActionType(userData));
    }

    // return {
    //   type: actionTypes.SET_USER_CART_ID,
    //   userData: userData
    // };
  };
};

// Reset Error Message
export const returnResetErrorActionType = () => {
  return {
    type: actionTypes.RESET_ERROR
  };
};

export const resetError = () => {
  return dispatch => {
    console.log("At auth.js resetError");
    dispatch(returnResetErrorActionType());
  };
};
