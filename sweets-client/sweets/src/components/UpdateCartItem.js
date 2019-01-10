import React, { Component } from "react";
import { connect } from "react-redux";
// import * as actionCreators from "../store/actions/updateCartItems";
import * as actionCreators from "../store/actions/cartItems";

class UpdateCartItem extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   counter: 0,
    //   productItem: {}
    // };
  }

  //   handleIncrement = productItem => {
  //     this.setState({
  //       counter: this.state.counter + 1,
  //       productItem: productItem
  //     });
  //   };

  //   handleDecrement = productItem => {
  //     this.setState({
  //       counter: this.state.counter - 1,
  //       productItem: productItem
  //     });
  //   };

  render() {
    return (
      <div>
        {/* <div> {this.props.product.productItem._id}</div>
        <div> {this.props.product.counter}</div> */}

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
        {/* <div>{this.props.error.message}</div> */}
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     error: state.cart.error // array
//   };
// };

const mapDispatchToProps = dispatch => {
  return {
    onIncrementCartItemQty: productObj =>
      dispatch(actionCreators.incrementCartItemQty(productObj)),

    onDecrementCartItemQty: productObj =>
      dispatch(actionCreators.decrementCartItemQty(productObj)),

    onUpdateCartItem: productObj =>
      dispatch(actionCreators.updateCartItem(productObj))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(UpdateCartItem);
