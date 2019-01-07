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

    /*
        1 response.data returned if product id was found and deleted
          Product deleted:  
          {product: {…}, error: {…}}
          error: {success: true, message: "ProductId: 5c32a88b96285309ab32eea9 deleted."}
          product: {product: {…}, _id: "5c32a88b96285309ab32eea9", __v: 0}
          __proto__: Object
          
        2 response.data returned if product id was not found
          Product deleted:  
          {error: {…}}
          error: {success: false, message: "Product id not found."}
          __proto__: Object
    */

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

  return state;
};

export default reducer;
