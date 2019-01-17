import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../store/actions/products";

class AddProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: {}
    };
  }

  componentDidMount() {
    // console.log("test");
    this.props.onResetError();
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
        <section className="container">
          <h3 className="mt-2 text-muted">Add Product - Admin Only</h3>
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
        </section>
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

    onProductAdd: product => dispatch(actionCreators.addToProductList(product)),

    onResetError: () => dispatch(actionCreators.resetError())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddProduct);
