import * as actionTypes from "./actionTypes";
import * as cartActionCreators from "./cartItems";
import axios from "axios";
import { setAuthenticationToken } from "../../utils";
import jwtDecode from "jwt-decode";

const LOGIN_URL = "/api/auth/";
const UPDATE_USER_CART_ID = "/api/auth/updateusercartid";

// const LOGIN_URL = "http://localhost:3001/api/auth/";
// const UPDATE_USER_CART_ID = "http://localhost:3001/api/auth/updateusercartid";

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
          );

          // If user already has a cartid associated to it pull the user's items
          console.log(
            "does use already have a cart?",
            response.data.userData.cartId
          );

          if (response.data.userData.cartId) {
            localStorage.setItem(
              "sweetsLocalStoreCart",
              JSON.stringify(response.data.userData.cartId)
            );
            dispatch(cartActionCreators.loadCartItems());
          }

          // put the token in the request header
          setAuthenticationToken(response.data.token);
          console.log(response.data); // response.data

          dispatch(returnAuthActionTypePayload(response.data));

          // Added to auto add user id
          let localStoreCartId = JSON.parse(
            localStorage.getItem("sweetsLocalStoreCart")
          );
          let localJsonWebTokenPayload = JSON.parse(
            localStorage.getItem("jsonwebtokenpayload.cartId")
          );

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

          historyProps.push(authRedirectPath);
        }
      })
      .catch(rejected => {
        console.log("Login user connection error: ", rejected);
      });
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

    let error = {};
    let tokenInfo = {};

    if (!token || token === "undefined") {
      console.log("Not Authorized - auth.js - checkAuthenticateOnSiteReload");

      error = {
        success: false,
        message: "Token does not exist.  User not authenticated."
      };

      tokenInfo = {
        token: {}, // default empty token
        error: error
      };

      console.log(error);
    } else {
      console.log("Authorized - auth.js - checkAuthenticateOnSiteReload");

      error = {
        success: true,
        message: "Token exist.  User authenticated."
      };

      const tokenDecoded = jwtDecode(token);

      console.log("tokendecoded", tokenDecoded);

      tokenInfo = {
        token: tokenDecoded,
        error: error
      };

      console.log(
        "tokeninfo - auth.js - checkAuthenticateOnSiteReload ",
        tokenInfo
      ); // {email: "sam@mail.com", name: "Sam", isAdmin: true, iat: 1545188894 }
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

    if (userData) {
      userData.cartId = localCart;
      console.log("updated userData.cartId/localCart ", userData);

      axios
        .post(UPDATE_USER_CART_ID, userData)
        .then(response => {
          console.log("User info returned?: ", response.data);

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
    }
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
