import axios from "axios";
import * as actionTypes from "./actionTypes";

const ADD_PRODUCT_URL = "/api/products/add";
const ALL_PRODUCTS_URL = "/api/products/display";
const DELETE_PRODUCT_URL = "/api/products/delete";

// const ADD_PRODUCT_URL = "http://localhost:3001/api/products/add";
// const ALL_PRODUCTS_URL = "http://localhost:3001/api/products/display";
// const DELETE_PRODUCT_URL = "http://localhost:3001/api/products/delete";

/* Add product to database and add to product list */
export const returnAddToProductListActionType = responseData => {
  return {
    type: actionTypes.ADD_TO_PRODUCT_LIST,
    responseData: responseData
  };
};

export const returnAddToProductListActionTypeFetchError = error => {
  return {
    type: actionTypes.ADD_TO_PRODUCT_LIST_FETCH_ERROR,
    error: error
  };
};

export const addToProductList = product => {
  return dispatch => {
    // Persist product to database prior to updating redux state
    axios
      .post(ADD_PRODUCT_URL, product)
      .then(response => {
        console.log("Product added responsesss: ", response.data);
        dispatch(returnAddToProductListActionType(response.data));
      })
      .catch(rejected => {
        dispatch(
          returnAddToProductListActionTypeFetchError({
            success: false,
            message: "Connection error.  Product was not added."
          })
        );
      });
  };
};

/* Initialize product list */
export const returnLoadProductListActionType = responseData => {
  return {
    type: actionTypes.LOAD_PRODUCTS_LIST,
    responseData: responseData
  };
};

export const returnLoadProductListActionTypeFetchError = error => {
  return {
    type: actionTypes.LOAD_PRODUCTS_LIST_FETCH_ERROR,
    error: error
  };
};

export const loadProductList = () => {
  return dispatch => {
    // Load products from database and dispatch actions to initialize products array
    axios(ALL_PRODUCTS_URL)
      .then(response => {
        console.log("Load Product List action", response.data); // array of product objects
        dispatch(returnLoadProductListActionType(response.data));
      })
      .catch(rejected => {
        dispatch(
          returnLoadProductListActionTypeFetchError({
            success: false,
            message: "Error initializing product list."
          })
        );
      });
  };
};

/* Delete product from database and remove from product list */
export const returnDeleteProductActionType = responseData => {
  return {
    type: actionTypes.DELETE_PRODUCT,
    responseData: responseData
  };
};

export const returnDeleteProductActionTypeFetchError = error => {
  return {
    type: actionTypes.DELETE_PRODUCT_FETCH_ERROR,
    error: error
  };
};

export const deleteProduct = productId => {
  const URL_WITH_ID_TO_DELETE = `${DELETE_PRODUCT_URL}/${productId}`;
  console.log(URL_WITH_ID_TO_DELETE);

  // Delete product from database and dispatch action to update the products array state
  return dispatch => {
    axios
      .post(URL_WITH_ID_TO_DELETE)
      .then(response => {
        console.log("Product deleted responsesss: ", response.data);

        // Dispatch action to delete product if found.  If not update error.
        dispatch(returnDeleteProductActionType(response.data));
      })
      .catch(rejected => {
        dispatch(
          returnDeleteProductActionTypeFetchError({
            success: false,
            message: "Connection error.  Product was not deleted."
          })
        );
      });
  };
};

// Reset Error Message
export const returnResetErrorActionType = () => {
  return {
    type: actionTypes.RESET_ERROR
  };
};

export const resetError = () => {
  return dispatch => {
    console.log("At products.js resetError");
    dispatch(returnResetErrorActionType());
  };
};
