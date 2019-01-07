import axios from "axios";
import * as actionTypes from "./actionTypes";
// const ADD_ITEM_TO_CART_URL = "http://localhost:3001/api/cart/add"; // NEED TO BUILD

/* Add user items to cart */
export const returnAddItemToCartActionType = () => {
  return {
    type: actionTypes.ADD_ITEM_TO_CART
    //   responseData: responseData
  };
};

export const returnAddItemToCartActionTypeFetchError = error => {
  return {
    type: actionTypes.ADD_ITEM_TO_CART_FETCH_ERROR,
    error: error
  };
};

export const addItemToCart = product => {
  return dispatch => {
    // dispatch(returnAddItemToCartActionType(response.data)); // NO RESPONSE DATA YET
    dispatch(returnAddItemToCartActionType());

    /*
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
        */
  };
};
