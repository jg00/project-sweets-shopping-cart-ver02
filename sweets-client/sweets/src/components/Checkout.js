import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actionCreators from "../store/actions/cartItems";

class Checkout extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   user: {}
    // };
  }

  // componentDidMount() {
  //   if (true) {
  //     this.props.onCheckout(this.props.history);
  //   } else {
  //     console.log("testing");
  //   }
  //   console.log("well well");
  // }

  //   countCartItems() {
  //     // let cartItemsCount = this.props.cart.cartItems.length;
  //     return this.props.cart.cartItems.length;
  //   }

  render() {
    // console.log(this.props.cartItems[0]); // works
    // console.log(this.props.cart.cartItems.length); // works
    // console.log(this.props.cart.cartItems[0]); // works
    return (
      <div>
        {/* <div>Checkout</div> */}
        {/* <button onClick={() => this.props.onCheckout()}>Check Out</button> */}
        <button onClick={() => this.props.onCheckout(this.props.history)}>
          Checkout
        </button>
        {/* <div onClick={() => this.props.onCheckout(this.props.history)}>
          Checkout */}
        {/* <a href="">Checkout</a> */}
        {/* </div> */}
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     cart: state.cart,
//     error: state.cart.error

//     // error: state.products.error
//   };
// };

const mapDispatchToProps = dispatch => {
  return {
    onCheckout: historyProps =>
      dispatch(actionCreators.checkoutCart(historyProps))
  };
};

// export default connect(
//   null,
//   mapDispatchToProps
// )(Checkout);

export default connect(
  null,
  mapDispatchToProps
)(withRouter(Checkout));

// export default Checkout;
