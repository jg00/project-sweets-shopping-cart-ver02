import React, { Component } from "react";
import { connect } from "react-redux";
// import jwtDecode from "jwt-decode";
// import axios from "axios";
import * as actionCreators from "../store/actions/products";
// const ADD_PRODUCT_URL = "http://localhost:3001/api/products/add";
// const ALL_PRODUCTS_URL = "http://localhost:3001/api/products/display";

class AddProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: {}
    };
  }

  handleTextBoxOnChange = e => {
    this.setState({
      product: {
        ...this.state.product,
        [e.target.name]: e.target.value
      }
    });
  };

  render() {
    return (
      <div>
        <div>App Product - Admin Page Only</div>
        <input
          type="text"
          placeholder="Product Name*"
          name="name"
          onChange={this.handleTextBoxOnChange}
        />
        <input
          type="text"
          placeholder="Price*"
          name="price"
          onChange={this.handleTextBoxOnChange}
        />
        <input
          type="text"
          placeholder="Types"
          name="types"
          onChange={this.handleTextBoxOnChange}
        />
        <input
          type="text"
          placeholder="Image Url*"
          name="image"
          onChange={this.handleTextBoxOnChange}
        />

        <button onClick={() => this.props.onProductAdd(this.state.product)}>
          Add Product
        </button>

        <div>{this.props.error.message}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.products.error // array
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onProductsChange: allProducts =>
      dispatch({
        type: "SET_PRODUCTS_LIST",
        allProducts: allProducts
      }),

    onProductAdd: product => dispatch(actionCreators.addToProductList(product))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddProduct);
