import * as actionTypes from "../actions/actionTypes";
// import { updateObject } from "../utility";

const initialState = {
  user: {},
  isAuth: false,
  error: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_AUTHENTICATE:
      return {
        ...state,
        user: action.responseData.userData, // {userData: {email, name, isAdmin}}
        isAuth: !state.isAuth
      };

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
