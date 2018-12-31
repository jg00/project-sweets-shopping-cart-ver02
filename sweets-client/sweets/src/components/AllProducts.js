import React, { Component } from "react";
import { connect } from "react-redux";
import jwtDecode from "jwt-decode";
import axios from "axios";
const ALL_PRODUCTS_URL = "http://localhost:3001/api/products/display";
const DELETE_PRODUCT_URL = "http://localhost:3001/api/products/delete";

class AllProducts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      result: ""
    };
  }

  componentDidMount() {
    // If page "Refreshed" manually override redux property isAuth: true|false accordingly
    // console.log(this.props.isAuth);  // on refresh redux state is reset so do not use
    const token = localStorage.getItem("jsonwebtoken");
    // console.log("test");
    if (!token || token === "undefined") {
      console.log("Not Authorized"); // just display all Items
    } else {
      console.log("Authorized - from AllProducts");

      // Need to get payload userData from the token in localstore
      const tokenInfo = jwtDecode(token);
      console.log("tokeninfo - ", tokenInfo); // {email: "sam@mail.com", name: "Sam", isAdmin: true, iat: 1545188894 }

      const formattedTokenInfo = {
        email: tokenInfo.email,
        name: tokenInfo.name,
        isAdmin: tokenInfo.isAdmin
      };

      // If page "Refreshed" manually override redux property isAuth: true
      // this.props.onAuthenticate();
      // this.props.onAuthenticateManuallySet(true);  // before adding decode
      this.props.onAuthenticateManuallySet(true, formattedTokenInfo);
    }

    // Load all items section
    axios(ALL_PRODUCTS_URL)
      .then(response => {
        const allProducts = response.data; // array
        // this.setState({ products: allProducts });
        // this.props.onProductsChange({ products: allProducts }); // array old
        this.props.onProductsChange(allProducts); // array

        console.log(response.data);
      })
      .catch(rejected => {
        console.log("Unable to get all orders: ", rejected);
      });
  }

  handleDeleteProductButtonClick = ProductId => {
    console.log(ProductId);

    const URL_WITH_ID_TO_DELETE = `${DELETE_PRODUCT_URL}/${ProductId}`;
    // console.log(urlWithId);

    // this now will need tp be handled in reducer
    axios
      .post(URL_WITH_ID_TO_DELETE)
      .then(response => {
        // console.log(response);
        console.log("Product deleted: ", response.data);
        // this.props.history.push("/");

        const result = response.data;
        console.log(result);
        console.log(result.message);

        // if (result.success) {
        // console.log("t");

        this.setState({
          ...this.state,
          // product: result
          result: result.message
        });
      })
      .catch(rejected => {
        console.log("Delete product connection error: ", rejected);
      });
  };

  render() {
    // console.log(this.props.products);

    let productItems = this.props.products.map(product => {
      return (
        <div key={product._id}>
          <div>
            <img src={product.product.image} />
          </div>
          <div>ProductId: {product._id} </div>
          <div>{product.product.name} </div>
          <div>{product.product.type} </div>
          <div>{product.product.price} </div>
          {/* <div>
            {this.props.isAuth && this.props.userData.isAdmin && (
              <div>admin show</div>
            )}
          </div> */}

          {/* <button
            onClick={() =>
              this.props.onProductDelete(product._id, DELETE_PRODUCT_URL)
            }
            // onClick={() => this.handleDeleteProductButtonClick(product._id)} // for state
          >
            Delete Product
          </button> */}

          {/* {this.props.isAuth && this.props.userData.isAdmin && (
            <button
              onClick={() =>
                this.props.onProductDelete(product._id, DELETE_PRODUCT_URL)
              }
              // onClick={() => this.handleDeleteProductButtonClick(product._id)} // for state
            >
              Delete Product
            </button>
          )} */}

          {this.props.isAuth && this.props.userData.isAdmin ? (
            <button
              onClick={() =>
                this.props.onProductDelete(product._id, DELETE_PRODUCT_URL)
              }
              // onClick={() => this.handleDeleteProductButtonClick(product._id)} // for state
            >
              Delete Product
            </button>
          ) : (
            <button
            // onClick={() =>
            //   this.props.onProductDelete(product._id, DELETE_PRODUCT_URL)
            // }
            // onClick={() => this.handleDeleteProductButtonClick(product._id)} // for state
            >
              Add to cart
            </button>
          )}
        </div>
      );
    });

    return (
      <div>
        <div>Display All Products Page</div>
        {productItems}
      </div>
    );
  }

  /*  below was working for this.state.products but did not update as productlist updated
  render() {
    // console.log(this.state.products);

    let productItems = this.state.products.map(product => {
      return (
        <div key={product._id}>
          <div>
            <img src={product.product.image} />
          </div>
          <div>ProductId: {product._id} </div>
          <div>{product.product.name} </div>
          <div>{product.product.type} </div>
          <div>{product.product.price} </div>
          <button
            onClick={() => this.handleDeleteProductButtonClick(product._id)}
          >
            Delete Product
          </button>
        </div>
      );
    });

    return (
      <div>
        <div>Display All Products Page</div>
        {productItems}
      </div>
    );
  }
  */
} // i need this

const mapStateToProps = state => {
  return {
    products: state.products, // array

    isAuth: state.isAuth,
    userData: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuthenticateManuallySet: (boolValue, tokenInfo) =>
      dispatch({
        type: "SET_AUTHENTICATE_MANUALLY",
        boolValue: boolValue,
        tokenInfo: tokenInfo
      }),

    onProductsChange: allProducts =>
      dispatch({
        type: "SET_PRODUCTS_LIST",
        allProducts: allProducts
      }),

    // onProductDelete: id => dispatch({ type: "DELETE_PRODUCT", productId: id }) // workes before adding url to delete
    onProductDelete: (id, DELETE_PRODUCT_URL) =>
      dispatch({
        type: "DELETE_PRODUCT",
        productId: id,
        DELETE_PRODUCT_URL: DELETE_PRODUCT_URL
      })
  };
};

export default connect(
  mapStateToProps,
  // null,
  mapDispatchToProps
)(AllProducts);

// export default AllItems;
