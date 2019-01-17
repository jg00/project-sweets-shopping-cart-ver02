import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../store/actions/cartItems";

class UpdateCartItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <button
          onClick={() => this.props.onIncrementCartItemQty(this.props.product)}
        >
          +
        </button>
        <button
          onClick={() => this.props.onDecrementCartItemQty(this.props.product)}
        >
          -
        </button>
        <button onClick={() => this.props.onUpdateCartItem(this.props.product)}>
          Update Cart Item
        </button>
        <button onClick={() => this.props.onDeleteCartItem(this.props.product)}>
          Remove Cart Item
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.cart.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIncrementCartItemQty: productObj =>
      dispatch(actionCreators.incrementCartItemQty(productObj)),

    onDecrementCartItemQty: productObj =>
      dispatch(actionCreators.decrementCartItemQty(productObj)),

    onUpdateCartItem: productObj =>
      dispatch(actionCreators.updateCartItem(productObj)),

    onDeleteCartItem: productObj =>
      dispatch(actionCreators.deleteCartItem(productObj))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateCartItem);
