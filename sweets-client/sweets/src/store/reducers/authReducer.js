import * as actionTypes from "../actions/actionTypes";
// import { updateObject } from "../utility";

const initialState = {
  user: {},
  isAuth: false,
  error: {},
  authRedirectPath: "/"
  // cartId: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_AUTHENTICATE:
      console.log("finally at authReducer", action.responseData);

      let user = {},
        isAuth = false,
        error = {};

      if (!action.responseData.error.success) {
        user = {};
        isAuth = false;
        error = action.responseData.error;
      } else {
        user = action.responseData.userData;
        isAuth = true;
        error = action.responseData.error;
      }

      return {
        ...state,
        user: user, // {userData: {email, name, isAdmin}}
        isAuth: isAuth,
        error: error
      };

    // case actionTypes.SET_AUTHENTICATE_MANUALLY:
    //   return {
    //     ...state,
    //     user: action.tokenInfo,
    //     isAuth: action.boolValue
    //   };

    case actionTypes.SET_CURRENT_USER_ON_SITE_RELOAD:
      console.log(
        "finally at authReducer - token site reload",
        action.tokenInfo
      );

      // On reload initialize
      user = {};
      isAuth = false;
      error = {};

      if (!action.tokenInfo.error.success) {
        user = {};
        isAuth = false;
        error = { success: false, message: "" }; // do not display any for token missing
      } else {
        user = action.tokenInfo.token; // token: {email: "test1@mail.com", name: "test1", iat: 1546621722}
        isAuth = true;
        error = action.tokenInfo.error; // error: {success: true, message: "Token exist.  User authenticated."}token: {email: "test1@mail.com", name: "test1", iat: 1546621722}__proto__: Object
      }

      return {
        ...state,
        user: user, // {userData: {email, name, isAdmin}}
        isAuth: isAuth,
        error: error
      };

    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return {
        ...state,
        authRedirectPath: action.path

        // user: user, // {userData: {email, name, isAdmin}}
        // isAuth: isAuth,
        // error: error
      };

    case actionTypes.SET_USER_CART_ID:
      console.log("here at SET_USER_CART_ID reducer ", action.userData);
      return {
        ...state,
        // cartId: action.userData.cartId
        user: action.userData
      };
    // return {
    //   ...state,
    //   authRedirectPath: action.path

    // user: user, // {userData: {email, name, isAdmin}}
    // isAuth: isAuth,
    // error: error
    // };

    case action.type === actionTypes.SET_USER_CART_ID_FETCH_ERROR:
      console.log(
        "finally at authReducer.js SET_USER_CART_ID_FETCH_ERROR",
        action.error
      );

      return {
        ...state,
        // cartItems: [],
        error: action.error
      };

    default:
      return state;
  }
  //   return state;
};

export default reducer;
