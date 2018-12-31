import axios from "axios";

const initialState = {
  user: {},
  isAuth: false,
  products: []
};

const reducer = (state = initialState, action) => {
  if (action.type === "SET_AUTHENTICATE") {
    return {
      ...state,
      // isAuth: true
      user: action.responseData.userData, // {userData: {email, name, isAdmin}}
      isAuth: !state.isAuth
    };
  }
  if (action.type === "SET_AUTHENTICATE_MANUALLY") {
    return {
      ...state,
      // isAuth: true
      user: action.tokenInfo,
      isAuth: action.boolValue
    };
  }
  if (action.type === "SET_PRODUCTS_LIST") {
    // To avoid duplicating products array list populated during componentDidMount() in AllProducts.js
    const initialArrayLenght = state.products.length;
    // console.log(initialArrayLenght);

    let initializedArray = "";
    if (initialArrayLenght === 0) {
      initializedArray = state.products.concat(action.allProducts);
      console.log("a", initializedArray);
    } else {
      initializedArray = state.products;
      console.log("b", initializedArray);
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

  if (action.type === "ADD_TO_PRODUCT_LIST") {
    return {
      ...state,
      products: state.products.concat(action.product)
      // isAuth: true
      // user: action.tokenInfo,
      // isAuth: action.boolValue
    };
  }

  if (action.type === "DELETE_PRODUCT") {
    console.log(action.productId);
    // console.log("in del", state.products);
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
        console.log(result.message);
      })
      .catch(rejected => {
        console.log("Delete product connection error: ", rejected);
      });

    return {
      ...state,
      products: newArray
    };
  }

  return state;
};

export default reducer;
