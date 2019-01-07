import axios from "axios";
import * as actionTypes from "../actions/actionTypes";
// import * as actionTypes from "../store/actions/actionTypes";

const initialState = {
  // user: {},
  // isAuth: false,
  products: [],
  error: {}
};

const reducer = (state = initialState, action) => {
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

  if (action.type === actionTypes.ADD_TO_PRODUCT_LIST) {
    // console.log("finally at productReducer.js", action.product);  // no longer passing in just the product.  passing in responseData
    // console.log(action);
    console.log("finally at productReducer.js", action.responseData);
    // console.log(action);

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

    /*
    return {
      //   ...state

      // below was previous working two lines before changes include error handling above
      //   ...state,
      //   products: state.products.concat(action.product)

      ...state,
      products: state.products.concat(product),
      error: error

      //   products: action.products
      // isAuth: true
      // user: action.tokenInfo,
      // isAuth: action.boolValue
      //   error: action.error.error
    };
*/
  }

  if (action.type === actionTypes.ADD_TO_PRODUCT_LIST_FETCH_ERROR) {
    // console.log("finally at productReducer.js", action.product);  // no longer passing in just the product.  passing in responseData
    // console.log(action);
    console.log(
      "finally at productReducer.js ADD_TO_PRODUCT_LIST_FETCH_ERROR",
      action.error
    );

    return {
      ...state,
      // products: [],
      error: action.error
    };
  }

  if (action.type === actionTypes.LOAD_PRODUCTS_LIST) {
    // console.log("finally at productReducer.js", action.product);  // no longer passing in just the product.  passing in responseData
    // console.log(action);
    console.log(
      "finally at productReducer.js LOAD_PRODUCTS_LIST",
      action.responseData
    );
    // console.log(action);

    // let product = {},
    //   error = {};

    if (!action.responseData.error.success) {
      // product = {};
      // error = action.responseData.error;

      // On errors do not update products redux state
      return {
        ...state,
        error: action.responseData.error
      };
    } else {
      // product = action.responseData.product;
      // error = action.responseData.error;

      // Update products redux state if no errors
      return {
        ...state,
        products: action.responseData.products,
        error: action.responseData.error
      };
    }
  }

  if (action.type === actionTypes.LOAD_PRODUCTS_LIST_FETCH_ERROR) {
    // console.log("finally at productReducer.js", action.product);  // no longer passing in just the product.  passing in responseData
    // console.log(action);
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
    // console.log(action.productId);
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

    /*
      can we access products array state from productReducer.js?
      productReducer.js:175 
      (2) [{…}, {…}]
      0: {product: {…}, _id: "5c2a86e06b3be906c3c90071", __v: 0}
      1:
      product: {types: "t", name: "aaaa", price: 25, image: "https://www.royce.com/images/pc/english/product/namachocolate/white_m.jpg", entryDate: "2019-01-07T01:57:35.035Z"}
      __v: 0
      _id: "5c32b20f96285309ab32eeab"
      __proto__: Object
      length: 2
      __proto__: Array(0)

    */

    if (!action.responseData.error.success) {
      return {
        ...state,
        error: action.responseData.error
      };
    } else {
      const newArray = state.products.filter(
        // product => product._id !== action.productId
        product => product._id !== action.responseData.product._id
        // product => console.log(product._id)
      );

      console.log("newArray without deleted product ", newArray);
      return {
        ...state,
        products: newArray,
        error: action.responseData.error
      };
    }

    // console.log("in del", state.products);
    // console.log("in del2", state.product);

    /* NEXT HANDLE PRODUCT LIST AFTER FILTERING OUT THE DELETED PRODUCT
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
        console.log(result.message);
      })
      .catch(rejected => {
        console.log("Delete product connection error: ", rejected);
      });

    return {
      ...state,
      products: newArray
    };
*/
  }

  return state;
};

export default reducer;
