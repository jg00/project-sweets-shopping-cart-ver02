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
        error: action.responseData.error // maybe do not display any errors on load if no issues
        // error: "non"
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

  /* FOR INCREMENTING QUANTITY OF A SPECIFIC CART ITEM OBJECT */
  if (action.type === actionTypes.INCREMENT_CART_ITEM_QTY) {
    console.log(
      "finally at updateCartItemsReducer.js INCREMENT_CART_ITEM_QTY",
      action.productObj
    );

    // Specific product item id will be used to identify and replace the object in the state
    const productItemId = action.productObj.productItem._id; // _id: "5c34cdc92132c304ee86452a"

    // Make a copy of action.productObj (ie object) and return an updated object with counter value incremented
    let updatedActionProductObj = {
      ...action.productObj,
      counter: action.productObj.counter + 1
    };

    // Make a copy of state.cartItems (ie array of objects)
    let copyStateCartItems = [...state.cartItems];

    // Update copyStateCartItems (ie copy of array of objects) and replace the specific product with the new updated productObj
    let updatedStateCartItems = copyStateCartItems.map(item =>
      item.productItem._id === productItemId ? updatedActionProductObj : item
    );

    return {
      ...state,
      cartItems: updatedStateCartItems,
      // error: "Increment cart item qty error"
      error: {
        success: true,
        message: null
      }
    };
  }

  /* FOR DECREMENTING QUANTITY OF A SPECIFIC CART ITEM OBJECT */
  if (action.type === actionTypes.DECREMENT_CART_ITEM_QTY) {
    console.log(
      "finally at updateCartItemsReducer.js DECREMENT_CART_ITEM_QTY",
      action.productObj
    );

    // Specific product item id will be used to identify and replace the object in the state
    const productItemId = action.productObj.productItem._id; // _id: "5c34cdc92132c304ee86452a"

    // Make a copy of action.productObj (ie object) and return an updated object with counter value incremented
    let updatedActionProductObj = {
      ...action.productObj,
      counter: action.productObj.counter - 1
    };

    // Make a copy of state.cartItems (ie array of objects)
    let copyStateCartItems = [...state.cartItems];

    // Update copyStateCartItems (ie copy of array of objects) and replace the specific product with the new updated productObj
    let updatedStateCartItems = copyStateCartItems.map(item =>
      item.productItem._id === productItemId ? updatedActionProductObj : item
    );

    return {
      ...state,
      cartItems: updatedStateCartItems,
      // error: "Decrement cart item qty error",
      error: {
        success: true,
        message: null
      }
    };
  }

  // Update cart items (This update the full cart so could be used when cart items are deleted as well) //
  if (action.type === actionTypes.UPDATE_CART_ITEM) {
    console.log(
      "finally at cartItemsReducer.js UPDATE_CART_ITEM",
      action.responseData
    );

    // Update products redux state if no errors
    return {
      ...state,
      cartItems: action.responseData.cart.cartItems,
      error: action.responseData.error // maybe do not display any errors on load if no issues
    };
  }

  if (action.type === actionTypes.UPDATE_CART_ITEM_FETCH_ERROR) {
    console.log(
      "finally at cartItemsReducer.js UPDATE_CART_ITEM_FETCH_ERROR",
      action.error
    );

    return {
      ...state,
      error: action.error
    };
  }

  // Delete cart items (Same as update since we are updating the full cart array) //
  if (action.type === actionTypes.DELETE_CART_ITEM) {
    console.log(
      "finally at cartItemsReducer.js DELETE_CART_ITEM",
      action.responseData
    );

    // Update products redux state if no errors
    return {
      ...state,
      cartItems: action.responseData.cart.cartItems,
      error: action.responseData.error // maybe do not display any errors on load if no issues
    };
  }

  // Reset error message as we move from page to page
  if (action.type === actionTypes.RESET_ERROR) {
    console.log(
      "finally at cartItemsReducer.js RESET_ERROR"
      // action.responseData
    );

    // Reset error message only
    return {
      ...state,
      error: ""
    };
  }

  // ELSE RETURN PRESENT STATE
  return state;
};

export default reducer;
