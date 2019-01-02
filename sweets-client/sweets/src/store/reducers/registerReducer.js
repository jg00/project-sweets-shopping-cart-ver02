import * as actionTypes from "../actions/actionTypes";
// import { updateObject } from "../utility";

const initialState = {
  //   user: {},
  //   isAuth: false,
  error: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REGISTER:
      console.log("finally at reducer - REGISTER action", action.user2);
      //   console.log("finally at reducer - REGISTER action", action.error);
      //   console.log("finally at reducer - REGISTER action", action.error.error);

      //   if (action.user2) {
      //     const userRegisteredId = {
      //       id: action.user2._id
      //     };
      //   }

      return {
        ...state,
        // user: action.user2,
        // user: userRegisteredId,
        error: action.error.error
      };

    default:
      return state;
  }
  //   return state;
};

export default reducer;
