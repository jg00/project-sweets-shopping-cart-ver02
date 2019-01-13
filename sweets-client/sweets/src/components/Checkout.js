import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as cartActionCreators from "../store/actions/cartItems";
import * as authActionCreators from "../store/actions/auth";

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

  render() {
    return (
      <div>
        <button
          onClick={() =>
            this.onHandleCheckout(this.props.history, this.props.cart)
          }
        >
          Checkout
        </button>
        {/* <button onClick={() => this.props.onCheckout(this.props.history)}>
          Checkout
        </button> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart,
    auth: state.auth.user
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
