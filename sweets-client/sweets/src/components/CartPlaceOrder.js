import React, { Component } from "react";
import { connect } from "react-redux";
import PlaceOrder from "./PlaceOrder";

class CartPlaceOrder extends Component {
  countCartItems() {
    let cartItemsCount = this.props.cart.cartItems.length;
    return this.props.cart.cartItems.length;
  }

  displayCartItems() {
    console.log(this.props.cart);

    const cartItems = this.props.cart.cartItems;

    let cartItemTotal = cartItems.reduce((sum, item) => {
      return sum + item.productItem.product.price * item.counter;
    }, 0);

    let cartItemTotalConverted = cartItems.reduce((sum, item) => {
      return sum + item.productItem.product.price * item.counter * 100;
    }, 0);
    console.log(cartItemTotalConverted);

    let displayItems = (
      <div>
        {cartItems.map(item => {
          return (
            <div key={item.productItem._id}>
              <div>
                {item.productItem.product.name} ($
                {item.productItem.product.price} * {item.counter})
              </div>
            </div>
          );
        })}
        <div>Total: {cartItemTotal} </div>
        <PlaceOrder totalAmount={cartItemTotalConverted} />
      </div>
    );

    return displayItems;
  }

  render() {
    this.displayCartItems();

    return (
      <div>
        <div>Cart ({this.countCartItems()}) </div>
        <div>{this.displayCartItems()}</div>
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

export default connect(mapStateToProps)(CartPlaceOrder);
