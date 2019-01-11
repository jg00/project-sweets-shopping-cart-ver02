import axios from "axios";
import * as actionTypes from "./actionTypes";
const ADD_ITEM_INIT_CART_URL = "http://localhost:3001/api/carts/init"; // NEED TO BUILD
const ADD_ITEM_TO_CART_URL = "http://localhost:3001/api/carts"; // NEED TO BUILD
const GET_CART_ITEMS_URL = "http://localhost:3001/api/carts/cart";
const UPDATE_CART_ITEM_URL = "http://localhost:3001/api/carts";

/* Add user items to cart */
export const returnAddItemToCartActionType = responseData => {
  return {
    type: actionTypes.ADD_ITEM_TO_CART,
    responseData: responseData
  };
};

export const returnAddItemToCartActionTypeFetchError = error => {
  return {
    type: actionTypes.ADD_ITEM_TO_CART_FETCH_ERROR,
    error: error
  };
};

/* Initialize a cart in the database if one does not exits else add to that cart */
export const addItemToCart = cartItem => {
  return dispatch => {
    console.log("cartItem", cartItem);
    // console.log("cartItemsArray: ", cartItemsArray);

    // let newcartitemsArray = cartItemsArray.push(cartItem);
    // console.log("cartItemsArray2: ", newcartitemsArray);

    // dispatch(returnAddItemToCartActionType());

    /* TEST
    localStorage.setItem(
      "sweetsLocalStoreCart",
      JSON.stringify({ error: "error", products: [{ id: 123 }, { id: 456 }] })
    );
    */

    // Check quantity greater than zero
    console.log(cartItem.counter);
    if (cartItem.counter < 1) {
      dispatch(
        returnAddItemToCartActionTypeFetchError({
          success: false,
          message: "Update quantity"
        })
      );
      return;
    }

    const localCart = JSON.parse(localStorage.getItem("sweetsLocalStoreCart"));
    console.log("Is there a localcart? ", localCart); // null if not found

    // If localstore cart id exits update cart items to existing cart object in the database
    /*
        const ADD_ITEM_INIT_CART_URL = "http://localhost:3001/api/carts/init";
        const ADD_ITEM_TO_CART_URL = "http://localhost:3001/api/carts";
    */

    let ADD_ITEM_URL = "";
    if (!localCart) {
      // console.log("noneddd");
      ADD_ITEM_URL = ADD_ITEM_INIT_CART_URL;
      console.log("noneddd ", ADD_ITEM_URL);
    } else {
      // If a cart was created, we need to update the cartItems in that cart.

      // console.log("one exists", localCart);
      // ADD_ITEM_URL = ADD_ITEM_TO_CART_URL;
      // console.log("one exits ", ADD_ITEM_URL);

      ADD_ITEM_URL = `${ADD_ITEM_TO_CART_URL}/${localCart}/add`;
      console.log("ADD_ITEM_URL: ", ADD_ITEM_URL);

      // "http://localhost:3001/api/carts/:cartid/add"
      // ADD_ITEM_TO_CART_URL = "http://localhost:3001/api/carts
    }

    // Include localCart id if available.  Value is null if not localCart is initially available.
    cartItem.localCart = localCart; // not sure if we need this.

    // If no localstore cart id exits, save cart items to database and return new cart id
    axios
      .post(ADD_ITEM_URL, cartItem)
      .then(response => {
        console.log(
          "Cart item added responsesss ADD_ITEM_URL: ",
          response.data
        );

        // the whole cart is returned and not just the cartItems array property

        console.log("Cart id: ", response.data.cart._id);

        // Set sweetsLocalStoreCart with the cart id
        localStorage.setItem(
          "sweetsLocalStoreCart",
          JSON.stringify(response.data.cart._id)
        );

        dispatch(returnAddItemToCartActionType(response.data));
      })

      .catch(rejected => {
        dispatch(
          returnAddItemToCartActionTypeFetchError({
            success: false,
            message: "Item already exists in cart."
          })
        );
      });
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

/* Initialize cartItems on site reload */
export const returnLoadCartItemsActionType = responseData => {
  return {
    type: actionTypes.LOAD_CART_ITEMS,
    responseData: responseData
  };
};

export const returnLoadCartItemsActionTypeFetchError = error => {
  return {
    type: actionTypes.LOAD_CART_ITEMS_FETCH_ERROR,
    error: error
  };
};

export const loadCartItems = () => {
  return dispatch => {
    const localCart = JSON.parse(localStorage.getItem("sweetsLocalStoreCart"));
    console.log("Is there a localcart on load? ", localCart); // null if not found

    // let URL_WITH_CARTID_TO_RETRIEVE = "";
    // if (!localCart) {
    //   console.log("no local cart on load");
    //   // ADD_ITEM_URL = ADD_ITEM_INIT_CART_URL;
    // } else {
    //   console.log("local cart exists on load ", localCart);

    //   URL_WITH_CARTID_TO_RETRIEVE = `${GET_CART_ITEMS_URL}/${localCart}`;
    //   console.log(URL_WITH_CARTID_TO_RETRIEVE);
    // }

    const URL_WITH_CARTID_TO_RETRIEVE = `${GET_CART_ITEMS_URL}/${localCart}`;
    console.log(URL_WITH_CARTID_TO_RETRIEVE);

    // Load cart items from database and dispatch actions to initialize cartItems array
    axios(URL_WITH_CARTID_TO_RETRIEVE)
      .then(response => {
        console.log("Load Cart action", response.data); // array of cartItems objects
        dispatch(returnLoadCartItemsActionType(response.data));
      })
      .catch(rejected => {
        dispatch(
          returnLoadCartItemsActionTypeFetchError({
            success: false,
            message: "Error initializing cart items list."
          })
        );
      });
  };
};

/* SECTION - update cart quantity */
// Increment
export const returnIncrementCartItemQtyActionType = productObj => {
  return {
    type: actionTypes.INCREMENT_CART_ITEM_QTY,
    productObj: productObj
  };
};

export const incrementCartItemQty = productObj => {
  return dispatch => {
    console.log("At updateCartItems.js increment", productObj);
    dispatch(returnIncrementCartItemQtyActionType(productObj));
  };
};

// Decrement
export const returnDecrementCartItemQtyActionType = productObj => {
  return {
    type: actionTypes.DECREMENT_CART_ITEM_QTY,
    productObj: productObj
  };
};

export const decrementCartItemQty = productObj => {
  return dispatch => {
    console.log("At updateCartItems.js decrement", productObj);
    dispatch(returnDecrementCartItemQtyActionType(productObj));
  };
};

// Update cart item with new quantity
// updateCartItem

export const returnUpdateCartItemActionType = responseData => {
  return {
    type: actionTypes.UPDATE_CART_ITEM,
    responseData: responseData
  };
};

export const returnUpdateCartItemActionTypeFetchError = error => {
  return {
    type: actionTypes.UPDATE_CART_ITEM_FETCH_ERROR,
    error: error
  };
};

export const updateCartItem = productObj => {
  return dispatch => {
    console.log("At updateCartItems.js updateCartItem ", productObj);
    /*
      {counter: 5, productItem: {…}, localCart: null}
      counter: 5
      localCart: null
      productItem:
        product: {types: "White", name: "Nama White", price: 25, image: "https://www.royce.com/images/pc/english/product/namachocolate/white_m.jpg", entryDate: "2019-01-10T11:57:31.303Z"}
        __v: 0
        _id: "5c37332b85deca08c1f1d556"
    */

    // For updating cart item there should be a localCart
    const localCart = JSON.parse(localStorage.getItem("sweetsLocalStoreCart"));
    //  console.log("Is there a localcart? ", localCart);

    let UPDATE_ITEM_URL = "";
    UPDATE_ITEM_URL = `${UPDATE_CART_ITEM_URL}/${localCart}/update`;
    console.log("UPDATE_ITEM_URL: ", UPDATE_ITEM_URL);

    // Include localCart id if available.  Value is null if not localCart is initially available.
    productObj.localCart = localCart; // not sure if we need this.

    // axios next
    axios
      .post(UPDATE_ITEM_URL, productObj)
      .then(response => {
        console.log(
          "Cart item added responsesss UPDATE_ITEM_URL: ",
          response.data
        );

        // the whole cart is returned and not just the cartItems array property

        // console.log("Cart id: ", response.data.cart._id);
        console.log("Cart info returned?: ", response.data);

        dispatch(returnUpdateCartItemActionType(response.data)); // does not exists in reducer yet
      })

      //  ADD THIS CATCH NEXT.  STILL NEEDS TO BE UPDATED
      .catch(rejected => {
        dispatch(
          returnUpdateCartItemActionTypeFetchError({
            success: false,
            message: "Connection error.  Cart item quantity was not updated. "
          })
        );
      });

    // dispatch(returnUpdateCartItemActionType(productObj));  // this is now inside axios
  };
};

/* NEW SECTION FOR CHECKOUT */
export const checkoutCart = historyProps => {
  return dispatch => {
    console.log("At checkoutCart.js checkoutCart ");

    historyProps.push(`/Checkout`); // new change
    // axios
    //   .post(REGISTER_URL, user)
    //   .then(response => {
    //     console.log("responsessss", response);
    //     dispatch(saveResult(user, response.data));

    //     if (response.data.error.success === false) {
    //       console.log(response.data);
    //     } else {
    //       historyProps.push(`/Login`); // new change
    //     }
    //   })
    //   .catch(rejected => {
    //     console.log("Register user connection error: ", rejected);
    //   });
  };
};
