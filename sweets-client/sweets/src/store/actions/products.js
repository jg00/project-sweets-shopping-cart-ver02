import axios from "axios";
import * as actionTypes from "./actionTypes";
// import { setAuthenticationToken } from "../../utils";
// import jwtDecode from "jwt-decode";
// const LOGIN_URL = "http://localhost:3001/api/auth/";
const ADD_PRODUCT_URL = "http://localhost:3001/api/products/add";
const ALL_PRODUCTS_URL = "http://localhost:3001/api/products/display";
const DELETE_PRODUCT_URL = "http://localhost:3001/api/products/delete";

/* Add product to database and add to product list */
export const returnAddToProductListActionType = responseData => {
  return {
    type: actionTypes.ADD_TO_PRODUCT_LIST,
    // products: state.products.concat(action.product)
    // product: responseData  // before new change to return responseData to reducer and handle error handling before reducer updated
    responseData: responseData
    // error: responseData
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
        // console.log(response);
        // console.log("Product added responsesss: ", response.data);
        console.log("Product added responsesss: ", response.data); // just use response.data.  Will also get error payload from the database.

        /*
Product added responsesss:  
{data: {…}, status: 200, statusText: "OK", headers: {…}, config: {…}, …}
config: {adapter: ƒ, transformRequest: {…}, transformResponse: {…}, timeout: 0, xsrfCookieName: "XSRF-TOKEN", …}
data:
product: {types: "t", name: "aaaa", price: 25, image: "https://www.royce.com/images/pc/english/product/namachocolate/ole_m.jpg", entryDate: "2019-01-05T11:07:36.551Z"}
__v: 0
_id: "5c308ff87cbaf6021d77a3f1"
__proto__: Object
headers: {content-type: "application/json; charset=utf-8"}
request: XMLHttpRequest {onreadystatechange: ƒ, readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, …}
status: 200
statusText: "OK"
__proto__: Object
      */

        // console.log("product.js action", response.data.error.success); // if not error this is undefined
        // if (!response.data.error.success) {
        //   console.log("test");
        // }

        dispatch(returnAddToProductListActionType(response.data));

        /*
data:
product:
entryDate: "2019-01-05T11:07:36.551Z"
image: "https://www.royce.com/images/pc/english/product/namachocolate/ole_m.jpg"
name: "aaaa"
price: 25
types: "t"
__proto__: Object
__v: 0
_id: "5c308ff87cbaf6021d77a3f1"
__proto__: Object

or 

data:
error: {success: false, message: "Product name already exits."}

*/
      })
      .catch(rejected => {
        // console.log("Add product connection error: ", rejected);

        dispatch(
          returnAddToProductListActionTypeFetchError({
            success: false,
            message: "Connection error.  Product was not added."
          })
        );
      });
  }; // end of dispatch

  /* COPY OF ABOVE BEFORE MORE CHANGES
  // Persist product to database prior to updating redux state
  axios
    .post(ADD_PRODUCT_URL, product)
    .then(response => {
      // console.log(response);
      // console.log("Product added responsesss: ", response.data);
      console.log("Product added responsesss: ", response);
      // this.props.history.push("/");

      let result = response.data._id;
      console.log("result ", result);
      // console.log(result.message);
      // console.log("result.success ", result.success);  // undefined

      // if (result.success) {
      // console.log("t");
      /*  NOT SURE IF I NEED BELOW ANY LONGER      
    /// continue here  **********************  need to check if product returned and then add to global state
    // Only append to redux products list if no issues adding to the database
    if (result.success !== false) {
      // If redux list was refreshed and current list of products becomes zero check the db and reload
      // console.log(this.props.products.length);
      if (this.props.products.length === 0) {
        // Load all items section from the database including the new one just added
        axios(ALL_PRODUCTS_URL)
          .then(response => {
            const allProducts = response.data; // array
            // this.setState({ products: allProducts });
            // this.props.onProductsChange({ products: allProducts }); // array old
            this.props.onProductsChange(allProducts); // array

            // console.log(response.data);
          })
          .catch(rejected => {
            console.log("Unable to get all orders: ", rejected);
          });
      } else {
        // then add new item to redux stat
        this.props.onProductAdd(response.data);
      }
    }

    this.setState({
      ...this.state,
      // product: result
      // result: result.message
      result: result.message
    });
    
    })
    .catch(rejected => {
      console.log("Add product connection error: ", rejected);
    });



*/

  /*
  // below is before persist to db above
  return {
    type: actionTypes.ADD_TO_PRODUCT_LIST,
    // products: state.products.concat(action.product)
    product: product
  };
*/
}; // end of product

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

export const returnDeleteProductActionType = responseData => {
  return {
    type: actionTypes.DELETE_PRODUCT,
    // error: error
    responseData: responseData
  };
};

export const returnDeleteProductActionTypeFetchError = error => {
  return {
    type: actionTypes.DELETE_PRODUCT_FETCH_ERROR,
    // error: error
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
