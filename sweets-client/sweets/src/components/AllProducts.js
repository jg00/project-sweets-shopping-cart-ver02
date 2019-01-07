import React, { Component } from "react";
import { connect } from "react-redux";
// import jwtDecode from "jwt-decode";
// import axios from "axios";
import * as actionCreators from "../store/actions/products";
import Quantity from "./Quantity";
// const ALL_PRODUCTS_URL = "http://localhost:3001/api/products/display";
// const DELETE_PRODUCT_URL = "http://localhost:3001/api/products/delete";

class AllProducts extends Component {
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
            <Quantity associatedItemProductId={product._id} />
          </div> */}

          {this.props.isAuth && this.props.userData.isAdmin ? (
            <button onClick={() => this.props.onProductDelete(product._id)}>
              Delete Product
            </button>
          ) : (
            // <Quantity associatedItemProductId={product._id} />
            <Quantity productItem={product} />

            /*  BEFORE MOVING BUTTO TO QUANTITY COMPONENET
            <button
            // onClick={() =>
            //   this.props.onProductDelete(product._id, DELETE_PRODUCT_URL)
            // }
            // onClick={() => this.handleDeleteProductButtonClick(product._id)} // for state
            >
              Add to cart
            </button>
            */
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
}

const mapStateToProps = state => {
  return {
    products: state.products.products, // array
    isAuth: state.auth.isAuth,
    userData: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onProductDelete: id => dispatch(actionCreators.deleteProduct(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllProducts);
