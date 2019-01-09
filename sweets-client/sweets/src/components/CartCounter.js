import React, { Component } from "react";
import { connect } from "react-redux";

class CartCounter extends Component {
  // componentDidMount() {
  //   this.countCartItems();
  // }

  countCartItems() {
    // let cartItemsCount = this.props.cart.cartItems.length;
    return this.props.cart.cartItems.length;
  }

  render() {
    // console.log(this.props.cartItems[0]); // works
    // console.log(this.props.cart.cartItems.length); // works
    // console.log(this.props.cart.cartItems[0]); // works
    return (
      <div>
        <div>Cart {this.countCartItems()}</div>
        {/* <div>Cart: {this.props.cart.cartItems.length}</div> */}
        {/* <div>Cart: {this.props.error.message}</div> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart,
    error: state.cart.error

    // error: state.products.error
  };
};

export default connect(mapStateToProps)(CartCounter);
