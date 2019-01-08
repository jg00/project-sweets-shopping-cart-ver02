import axios from "axios";
import * as actionTypes from "./actionTypes";
const ADD_ITEM_TO_CART_URL = "http://localhost:3001/api/carts/add"; // NEED TO BUILD

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

export const addItemToCart = cartItem => {
  return dispatch => {
    const localCart = JSON.parse(localStorage.getItem("sweetsLocalStoreCart"));
    console.log(localCart);

    // If localstore cart id exits update cart items to existing cart object in the database

    console.log("cartItem", cartItem);
    // dispatch(returnAddItemToCartActionType());

    // Include localCart id if available.  Value is null if not localCart is initially available.
    cartItem.localCart = localCart;

    // If no localstore cart id exits, save cart items to database and return new cart id
    axios.post(ADD_ITEM_TO_CART_URL, cartItem).then(response => {
      console.log("Product added responsesss: ", response.data);
      // dispatch(returnAddItemToCartActionType(response.data));
    });
    /*
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

/* SAMPLE CODE ONLY
    localStorage.setItem(
      "sweetsLocalStoreCart",
      JSON.stringify({ error: "error", products: [{ id: 123 }, { id: 456 }] })
    );
    const localCart = JSON.parse(localStorage.getItem("sweetsLocalStoreCart"));
    if (!localCart) {
      console.log("noneddd");
    } else {
      console.log("one exists", localCart);
    }
    */

// If no localstore cart id exits, save cart items to database and return new cart id

// dispatch(returnAddItemToCartActionType(response.data)); // NO RESPONSE DATA YET
// dispatch(returnAddItemToCartActionType());

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
//   };
// };
