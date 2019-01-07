import axios from "axios";
import * as actionTypes from "../store/actions/actionTypes";

const initialState = {
  // user: {},
  // isAuth: false,
  products: [],
  error: {}
};

const reducer = (state = initialState, action) => {
  /* previous version before root reducer
  if (action.type === actionTypes.SET_AUTHENTICATE) {
    return {
      ...state,
      // isAuth: true
      user: action.responseData.userData, // {userData: {email, name, isAdmin}}
      isAuth: !state.isAuth
    };
  }
  if (action.type === actionTypes.SET_AUTHENTICATE_MANUALLY) {
    return {
      ...state,
      // isAuth: true
      user: action.tokenInfo,
      isAuth: action.boolValue
    };
  }
*/

  if (action.type === actionTypes.SET_PRODUCTS_LIST) {
    // To avoid duplicating products array list populated during componentDidMount() in AllProducts.js
    const initialArrayLenght = state.products.length;
    // console.log(initialArrayLenght);

    let initializedArray = "";
    if (initialArrayLenght === 0) {
      initializedArray = state.products.concat(action.allProducts);
      // console.log("a", initializedArray);
    } else {
      initializedArray = state.products;
      // console.log("b", initializedArray);
    }

    return {
      ...state,
      // isAuth: true
      // user: action.tokenInfo,
      // isAuth: action.boolValue
      // products: state.products.concat(action.allProducts) // causing dups
      // products: state.products
      products: initializedArray
    };
  }

  /* Already moved to productReducer
  if (action.type === actionTypes.ADD_TO_PRODUCT_LIST) {
    return {
      ...state,
      products: state.products.concat(action.product)
      // isAuth: true
      // user: action.tokenInfo,
      // isAuth: action.boolValue
    };
  }
  */

  /* THIS WAS ORIGINAL DELETE_PRODUCT from reducer.js.  We are replacing with redux dispatching
  if (action.type === actionTypes.DELETE_PRODUCT) {
    console.log(action.productId);
    console.log("redux products array", state.products.length);
    // console.log("in del2", state.product);

    const newArray = state.products.filter(
      product => product._id !== action.productId
      // product => console.log(product._id)
    );

    // console.log("new", newArray);

    // This section is to delete from the database
    // console.log(action.DELETE_PRODUCT_URL);
    const URL_WITH_ID_TO_DELETE = `${action.DELETE_PRODUCT_URL}/${
      action.productId
    }`;
    console.log(URL_WITH_ID_TO_DELETE);

    axios
      .post(URL_WITH_ID_TO_DELETE)
      .then(response => {
        // console.log(response);
        console.log("Product deleted: ", response.data);
        // this.props.history.push("/");

        const result = response.data;
        console.log(result);
        console.log(result.error.message);
      })
      .catch(rejected => {
        console.log("Delete product connection error: ", rejected);
      });

    return {
      ...state,
      products: newArray
    };
  }
*/
  /*
  if (action.type === actionTypes.REGISTER) {
    console.log("finally at reducer - REGISTER action", action.user2);
    console.log("finally at reducer - REGISTER action", action.error);

    return {
      ...state,
      error: action.error
    };
  }
*/

  return state;
};

export default reducer;
