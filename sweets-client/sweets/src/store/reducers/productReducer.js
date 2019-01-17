// import axios from "axios";
import * as actionTypes from "../actions/actionTypes";

const initialState = {
  products: [],
  error: {}
};

const reducer = (state = initialState, action) => {
  if (action.type === actionTypes.ADD_TO_PRODUCT_LIST) {
    console.log("finally at productReducer.js", action.responseData);

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

  if (action.type === actionTypes.ADD_TO_PRODUCT_LIST_FETCH_ERROR) {
    console.log(
      "finally at productReducer.js ADD_TO_PRODUCT_LIST_FETCH_ERROR",
      action.error
    );

    return {
      ...state,
      error: action.error
    };
  }

  if (action.type === actionTypes.LOAD_PRODUCTS_LIST) {
    console.log(
      "finally at productReducer.js LOAD_PRODUCTS_LIST",
      action.responseData
    );

    if (!action.responseData.error.success) {
      // On errors do not update products redux state
      return {
        ...state,
        error: action.responseData.error
      };
    } else {
      // Update products redux state if no errors
      return {
        ...state,
        products: action.responseData.products,
        error: action.responseData.error
      };
    }
  }

  if (action.type === actionTypes.LOAD_PRODUCTS_LIST_FETCH_ERROR) {
    console.log(
      "finally at productReducer.js LOAD_PRODUCTS_LIST_FETCH_ERROR",
      action.error
    );

    return {
      ...state,
      products: [],
      error: action.error
    };
  }

  if (action.type === actionTypes.DELETE_PRODUCT) {
    console.log(
      "finally at productReducer.js DELETE_PRODUCT",
      action.responseData
    );

    console.log("can we access products array state from productReducer.js?");
    console.log(state.products);

    if (!action.responseData.error.success) {
      return {
        ...state,
        error: action.responseData.error
      };
    } else {
      const newArray = state.products.filter(
        product => product._id !== action.responseData.product._id
      );

      console.log("newArray without deleted product ", newArray);
      return {
        ...state,
        products: newArray,
        error: action.responseData.error
      };
    }
  }

  // Reset error message as we move from page to page
  if (action.type === actionTypes.RESET_ERROR) {
    console.log(
      "finally at productReducer.js RESET_ERROR"
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
