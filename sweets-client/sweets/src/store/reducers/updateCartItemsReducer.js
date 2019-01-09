// import axios from "axios";
import * as actionTypes from "../actions/actionTypes";

const initialState = {
  //   cartItems: [],
  error: {}
};

const reducer = (state = initialState, action) => {
  if (action.type === actionTypes.INCREMENT_CART_ITEM_QTY) {
    console.log(
      "finally at updateCartItemsReducer.js INCREMENT_CART_ITEM_QTY",
      action.productObj
    );

    return {
      ...state
    };

    //   return {
    //     ...state,
    //     error: action.error
    //   };
  }

  return state;
};

export default reducer;
