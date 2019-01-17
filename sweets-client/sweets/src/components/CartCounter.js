import React, { Component } from "react";
import { connect } from "react-redux";

class CartCounter extends Component {
  countCartItems() {
    return this.props.cart.cartItems.length;
  }

  render() {
    return (
      <div>
        <div>Cart ({this.countCartItems()})</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart,
    error: state.cart.error
  };
};

export default connect(mapStateToProps)(CartCounter);
