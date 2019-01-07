import * as actionTypes from "../actions/actionTypes";
// import { updateObject } from "../utility";

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

    default:
      return state;
  }
  //   return state;
};

export default reducer;
