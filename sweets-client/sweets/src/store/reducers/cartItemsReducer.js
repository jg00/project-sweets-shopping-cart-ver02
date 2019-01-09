// import axios from "axios";
import * as actionTypes from "../actions/actionTypes";

const initialState = {
  cartItems: [],
  error: {}
};

// THIS MAY NEED TO BE CHANGED TO UPDATE CARTITEMS ARRAY INSTEAD OF ADD ITEM TO CART
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
        cartItems: cartItems, // updating the whole cartItems array returned from action.responseData.cart.cartItems
        // cartItems: state.products.concat(product),
        error: error
      };
    }
  }

  if (action.type === actionTypes.ADD_ITEM_TO_CART_FETCH_ERROR) {
    console.log(
      "finally at cartItemsReducer.js ADD_ITEM_TO_CART_FETCH_ERROR",
      action.error
    );

    return {
      ...state,
      error: action.error
    };
  }

  /* FOR LOADING CART ITEMS - come back to this after database */
  if (action.type === actionTypes.LOAD_CART_ITEMS) {
    console.log(
      "finally at cartItemsReducer.js LOAD_CART_ITEMS",
      action.responseData
    );

    if (!action.responseData.error.success) {
      // On errors do not update cartItems array redux state
      return {
        ...state,
        error: action.responseData.error
      };
    } else {
      // Update cartItems redux state if no errors
      return {
        ...state,
        cartItems: action.responseData.cart.cartItems,
        error: action.responseData.error
      };
    }
  }

  if (action.type === actionTypes.LOAD_CART_ITEMS_FETCH_ERROR) {
    console.log(
      "finally at cartItemsReducer.js LOAD_CART_ITEMS_FETCH_ERROR",
      action.error
    );

    return {
      ...state,
      cartItems: [],
      error: action.error
    };
  }

  /* FOR UPDATING QUANTITY OF A CART ITEM*/
  if (action.type === actionTypes.INCREMENT_CART_ITEM_QTY) {
    console.log(
      "finally at updateCartItemsReducer.js INCREMENT_CART_ITEM_QTY",
      action.productObj
    );

    console.log(action.productObj.productItem._id);
    // console.log(state.cartItems);

    const productItemId = action.productObj.productItem._id;
    console.log(state.cartItems);

    // state.cartItems.   do something here
    const cartObj = state.cartItems.find(
      item => item.productItem._id === productItemId
    );
    console.log(cartObj); // STOPPED HERE FOR NOW
    return {
      ...state,
      error: "Increment cart item qty error"
    };
  }

  // ELSE RETURN PREVIOUS STATE
  return state;
};

export default reducer;
