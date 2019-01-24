import * as authActionCreators from "./auth";
import axios from "axios";
import jwtDecode from "jwt-decode";
import * as actionTypes from "./actionTypes";

const ADD_ITEM_INIT_CART_URL = "/api/carts/init"; // NEED TO BUILD
const ADD_ITEM_TO_CART_URL = "/api/carts"; // NEED TO BUILD
const GET_CART_ITEMS_URL = "/api/carts/cart";
const UPDATE_CART_ITEM_URL = "/api/carts";
const DELETE_CART_ITEM_URL = "/api/carts/delete";

// const ADD_ITEM_INIT_CART_URL = "http://localhost:3001/api/carts/init"; // NEED TO BUILD
// const ADD_ITEM_TO_CART_URL = "http://localhost:3001/api/carts"; // NEED TO BUILD
// const GET_CART_ITEMS_URL = "http://localhost:3001/api/carts/cart";
// const UPDATE_CART_ITEM_URL = "http://localhost:3001/api/carts";
// const DELETE_CART_ITEM_URL = "http://localhost:3001/api/carts/delete";

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

        console.log("Cart id: ", response.data.cart._id);

        // Set sweetsLocalStoreCart with the cart id
        localStorage.setItem(
          "sweetsLocalStoreCart",
          JSON.stringify(response.data.cart._id)
        );

        // Added to auto add user id
        let localStoreCartId = JSON.parse(
          localStorage.getItem("sweetsLocalStoreCart")
        );
        let localJsonWebTokenPayload = JSON.parse(
          localStorage.getItem("jsonwebtokenpayload.cartId")
        );

        // If localStoreCartId exists and a user is logged in but user CartId is null, set the Cart Id.
        if (localStoreCartId && !localJsonWebTokenPayload) {
          console.log(
            "Set the cart id: ",
            localStoreCartId,
            localJsonWebTokenPayload
          );
          // Dispatch set user id
          dispatch(authActionCreators.setUserCartId());
        }

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
    const tokenPayload = JSON.parse(
      localStorage.getItem("jsonwebtokenpayload")
    );

    const userData = tokenPayload;
    // console.log(typeof userData);
    console.log("userData ", userData);
    // console.log(userData.cartItems.length);

    let localCart = null;
    if (userData && userData.cartId !== null) {
      localCart = userData.cartId;
      // localStorage.setItem("sweetsLocalStoreCart", JSON.stringify(localCart));
    } else {
      localCart = JSON.parse(localStorage.getItem("sweetsLocalStoreCart"));
      console.log("Is there a localcart on load? ", localCart); // null if not found
    }

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
  };
};

/* NEW SECTION FOR CHECKOUT */
/* Checkout cart button */
export const returnCheckoutCarttActionType = responseData => {
  return {
    type: actionTypes.CHECKOUT_CART,
    responseData: responseData
  };
};

export const returnCheckoutCartActionTypeFetchError = error => {
  return {
    type: actionTypes.CHECKOUT_CART_FETCH_ERROR,
    error: error
  };
};

export const checkoutCart = (historyProps, localCartItems) => {
  return dispatch => {
    console.log("At checkoutCart.js checkoutCart--- ", localCartItems);

    // If not logged in redirect to login page
    const token = localStorage.getItem("jsonwebtoken");
    // const tokenPayload = localStorage.getItem("jsonwebtokenpayload");

    if (!token || token === "undefined") {
      historyProps.push(`/Login`); // new change
      return;
    }
    // else {

    /* 
      Once logged in we need to 
        1 capture user's original cart 
        2 merge current cart and 
        3 finally redirect to summary page 
    */

    // mergeUserCart(localCartItems); // NOT USING FOR NOW
    // return;
    // }

    historyProps.push("/AllItems"); //test
  };
};

export const mergeUserCart = localCartItems => {
  console.log("at mergeUserCart ");

  const tokenPayload = JSON.parse(localStorage.getItem("jsonwebtokenpayload"));

  const userData = tokenPayload;
  // console.log(typeof userData);
  console.log("userData ", userData);
  // console.log(userData.cartItems.length);

  /*
    {email: "test1@mail.com", name: "test1", cartItems: Array(0)}
  */

  console.log("localCartItems ", localCartItems);

  // AT THIS POINT I HAVE USER CART ITEMS VS ANONYMOUS USER CART ITEMS
  // CONTINUE FROM HERE......

  let combineLocalCartWithUserCart = [
    ...localCartItems.cartItems,
    ...userData.cartItems
  ];
  console.log(combineLocalCartWithUserCart);

  // Replaces the whole specifc cart
  updateCartItem(combineLocalCartWithUserCart);

  // Also need to update the logged in users' cartid to match the current sweetsLocalStoreCart

  // For updating cart item there should be a localCart
  // const localCart = JSON.parse(localStorage.getItem("sweetsLocalStoreCart"));
  //  console.log("Is there a localcart? ", localCart);
};

// For deleting cart item //
/* Delete product from database and remove from product list */
export const returnDeleteCartItemActionType = responseData => {
  return {
    type: actionTypes.DELETE_CART_ITEM,
    responseData: responseData
  };
};

export const returnDeleteCartItemActionTypeFetchError = error => {
  return {
    type: actionTypes.DELETE_CART_ITEM_FETCH_ERROR,
    error: error
  };
};

export const deleteCartItem = productObj => {
  const URL_WITH_ID_TO_DELETE = `${DELETE_CART_ITEM_URL}/${
    productObj.productItem._id
  }`;
  console.log(URL_WITH_ID_TO_DELETE);

  /*
    At time user clicks the 'Delete Cart Item' button this will be the current cart we want to delete from
  */
  const localCart = JSON.parse(localStorage.getItem("sweetsLocalStoreCart"));
  console.log("Is there a localcart TO DELETE ---- ? ", localCart); // null if not found

  // Delete cart item from database and dispatch action to update the cart array state
  return dispatch => {
    // console.log("BEFORE SENT - ", productObj);

    axios
      .post(URL_WITH_ID_TO_DELETE, { cartIdPlayload: localCart })
      .then(response => {
        console.log("Cart item deleted responsesss: ", response.data);

        // Dispatch action to delete product if found.  If not update error.
        dispatch(returnDeleteCartItemActionType(response.data));
      })
      .catch(rejected => {
        dispatch(
          returnDeleteCartItemActionTypeFetchError({
            success: false,
            message: "Connection error.  Cart item was not deleted."
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
    console.log("At cartItems.js resetError");
    dispatch(returnResetErrorActionType());
  };
};
