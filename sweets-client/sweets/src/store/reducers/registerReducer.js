import * as actionTypes from "../actions/actionTypes";

const initialState = {
  error: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REGISTER:
      console.log("finally at reducer - REGISTER action", action.user2);

      return {
        ...state,
        error: action.error.error
      };

    case actionTypes.RESET_ERROR:
      console.log("finally at registerReducer.js - RESET ACTION");

      return {
        ...state,
        error: ""
      };

    default:
      return state;
  }
  //   return state;
};

export default reducer;
