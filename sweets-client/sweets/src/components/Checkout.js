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
    // console.log("here ", this.props.cart);
    // console.log("here ", localCartItems);
    // if (!this.props.auth) {
    if (Object.keys(this.props.auth).length !== 0) {
      console.log("auth ", this.props.auth);
      this.props.onSetUserCartId();
    }
  };

  toggleCheckoutButton() {
    // console.log(this.props.isAuth);
    console.log(this.props.cart.cartItems.length);

    const toggleButton =
      this.props.cart.cartItems.length < 1 ? null : (this.props.isAuth &&
          this.props.cart.cartItems.length) > 0 ? (
        <div>
          {/* <button
            onClick={() =>
              this.onHandleCheckout(this.props.history, this.props.cart)
            }
          >
            Proceed To Checkout
          </button>
          <div> */}
          <CartPlaceOrder />
          {/* </div> */}
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

    // original
    // const toggleButton =
    //   this.props.isAuth && this.props.cart.length !== -1 ? (
    //     <button
    //       onClick={() =>
    //         this.onHandleCheckout(this.props.history, this.props.cart)
    //       }
    //     >
    //       Proceed To Checkout
    //     </button>
    //   ) : (
    //     <button
    //       onClick={() =>
    //         this.onHandleCheckout(this.props.history, this.props.cart)
    //       }
    //     >
    //       Checkout
    //     </button>
    //   );

    return toggleButton;
  }

  render() {
    return (
      <div>
        {/* <button
          onClick={() =>
            this.onHandleCheckout(this.props.history, this.props.cart)
          }
        >
          Checkout
        </button> */}
        {/* <button onClick={() => this.props.onCheckout(this.props.history)}>
          Checkout
        </button> */}

        {this.toggleCheckoutButton()}
      </div>
    );
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
