// import axios from "axios";
import * as actionTypes from "../actions/actionTypes";

const initialState = {
  cartItems: [],
  error: {}
};

const reducer = (state = initialState, action) => {
  if (action.type === actionTypes.ADD_ITEM_TO_CART) {
    console.log(
      "finally at cartItemsReducer.js ADD_ITEM_TO_CART",
      action.responseData
    );
    // I GET TO THIS POINT.  HOWEVERMAYBE WE NEED TO INTIALIZE A CART OBJECT THAT HAVE CART ITEMS LIST, ERRORS

    // return {
    //   ...state
    // };

    // console.log("finally at cartItemsReducer.js", action.responseData);

    let cartItems = [],
      error = {};
    if (!action.responseData.error.success) {
      cartItems = [];
      error = action.responseData.error;

      // On errors do not update cartItems array redux state
      return {
        ...state,
        error: error
      };
    } else {
      cartItems = action.responseData.cart.cartItems; // this is an array
      error = action.responseData.error;

      // Update products redux state if no errors
      return {
        ...state,
        cartItems: cartItems, // updating the cartItems arrray and not adding a specific cart to the array
        // cartItems: state.products.concat(product),
        error: error
      };
    }
  }

  // } // FOR TESTING

  return state;
};

export default reducer;
