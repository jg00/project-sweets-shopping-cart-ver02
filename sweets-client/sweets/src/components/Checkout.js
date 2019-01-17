import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as cartActionCreators from "../store/actions/cartItems";
import * as authActionCreators from "../store/actions/auth";
import CartPlaceOrder from "./CartPlaceOrder";

class Checkout extends Component {
  constructor(props) {
    super(props);
  }

  onHandleCheckout = (historyProps, localCartItems) => {
    this.props.onSetAuthRedirectPath("/AllItems");
    this.props.onCheckout(historyProps, localCartItems); // localCartItems - current local cart items

    if (Object.keys(this.props.auth).length !== 0) {
      console.log("auth ", this.props.auth);
      this.props.onSetUserCartId();
    }
  };

  toggleCheckoutButton() {
    const toggleButton =
      this.props.cart.cartItems.length < 1 ? null : (this.props.isAuth &&
          this.props.cart.cartItems.length) > 0 ? (
        <div>
          <CartPlaceOrder />
        </div>
      ) : (
        <button
          onClick={() =>
            this.onHandleCheckout(this.props.history, this.props.cart)
          }
        >
          Checkout
        </button>
      );

    return toggleButton;
  }

  render() {
    return <div>{this.toggleCheckoutButton()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart,
    auth: state.auth.user,
    isAuth: state.auth.isAuth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCheckout: (historyProps, localCartItems) =>
      dispatch(cartActionCreators.checkoutCart(historyProps, localCartItems)),

    onSetAuthRedirectPath: path =>
      dispatch(authActionCreators.setAuthRedirectPath(path)),

    onSetUserCartId: () => dispatch(authActionCreators.setUserCartId())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Checkout));
