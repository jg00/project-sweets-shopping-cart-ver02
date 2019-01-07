// import axios from "axios";
import * as actionTypes from "../actions/actionTypes";

const initialState = {
  products: [],
  error: {}
};

const reducer = (state = initialState, action) => {
  if (action.type === actionTypes.ADD_ITEM_TO_CART) {
    console.log("finally at cartItemsReducer.js ADD_ITEM_TO_CART");
    // I GET TO THIS POINT.  HOWEVERMAYBE WE NEED TO INTIALIZE A CART OBJECT THAT HAVE CART ITEMS LIST, ERRORS

    return {
      ...state
    };

    /* TESTING FOR NOW
      console.log("finally at cartItemsReducer.js", action.responseData);
  
      let product = {},
        error = {};
      if (!action.responseData.error.success) {
        product = {};
        error = action.responseData.error;
  
        // On errors do not update products redux state
        return {
          ...state,
          error: error
        };
      } else {
        product = action.responseData.product;
        error = action.responseData.error;
  
        // Update products redux state if no errors
        return {
          ...state,
          products: state.products.concat(product),
          error: error
        };
      }
    } 
    */
  } // FOR TESTING

  return state;
};

export default reducer;
