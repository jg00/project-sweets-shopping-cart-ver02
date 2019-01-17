import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../store/actions/cartItems";

class AddItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      productItem: {}
    };
  }

  handleIncrement = productItem => {
    this.setState({
      counter: this.state.counter + 1,
      productItem: productItem
    });
  };

  handleDecrement = productItem => {
    this.setState({
      counter: this.state.counter - 1,
      productItem: productItem
    });
  };

  render() {
    const cartItem = {
      counter: this.state.counter,
      productItem: this.state.productItem
    };

    return (
      <div>
        <div>Quantity: {this.state.counter}</div>

        <button onClick={() => this.handleIncrement(this.props.productItem)}>
          +
        </button>
        <button onClick={() => this.handleDecrement(this.props.productItem)}>
          -
        </button>

        <button onClick={() => this.props.onCartItemAdd(cartItem)}>
          Add to cart
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
    onCartItemAdd: cartItem => dispatch(actionCreators.addItemToCart(cartItem))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddItem);
