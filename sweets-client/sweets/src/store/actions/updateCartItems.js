import axios from "axios";
import * as actionTypes from "./actionTypes";

export const returnIncrementCartItemQtyActionType = productObj => {
  return {
    type: actionTypes.INCREMENT_CART_ITEM_QTY,
    productObj: productObj
  };
};

export const incrementCartItemQty = productObj => {
  return dispatch => {
    console.log("At updateCartItems.js ", productObj);
    dispatch(returnIncrementCartItemQtyActionType(productObj));
  };
};
