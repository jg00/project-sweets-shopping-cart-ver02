import * as actionTypes from "../actions/actionTypes";
// import { updateObject } from "../utility";

const initialState = {
  user: {},
  isAuth: false,
  // isAdmin: false,
  error: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_AUTHENTICATE:
      console.log("finally at authReducer", action.responseData);
      // console.log(
      //   "finally at authReducer",
      //   typeof action.responseData.error.success // boolean
      // );

      let user = {},
        isAuth = false;
      // user = {},
      // isAdmin = false
      // }
      // isAuth = false,
      // isAdmin = false;

      if (!action.responseData.error.success) {
        // console.log(typeof user22);
        user = {};
        isAuth = false;
      } else {
        user = action.responseData.userData;
        isAuth = true;

        // // Check if admin user type
        // if (isAdmin) {
        //   isAdmin = true;
        // } else {
        //   isAdmin = false;
        // }
      }

      // const user22 = action.responseData.userData;

      return {
        ...state,
        user: user, // {userData: {email, name, isAdmin}}
        isAuth: isAuth
        // isAdmin: isAdmin
      };
    // return {
    //   ...state,
    //   user: action.responseData.userData, // {userData: {email, name, isAdmin}}
    //   isAuth: !state.isAuth
    // };

    case actionTypes.SET_AUTHENTICATE_MANUALLY:
      return {
        ...state,
        user: action.tokenInfo,
        isAuth: action.boolValue
      };

    default:
      return state;
  }
  //   return state;
};

export default reducer;
