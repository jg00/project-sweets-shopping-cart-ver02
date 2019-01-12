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
    cart: state.cart
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCheckout: (historyProps, localCartItems) =>
      dispatch(cartActionCreators.checkoutCart(historyProps, localCartItems)),

    onSetAuthRedirectPath: path =>
      dispatch(authActionCreators.setAuthRedirectPath(path))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Checkout));
