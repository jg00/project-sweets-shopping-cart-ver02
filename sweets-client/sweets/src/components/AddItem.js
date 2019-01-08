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
    /* MAY USE LATER
    const disableButtonTest =
      this.state.counter < 0 ? (
        <button
          //   onClick={this.handleDecrement}
          disabled="true"
          style={{ color: "gray" }}
        >
          test
        </button>
      ) : (
        <button
          onClick={this.handleDecrement}
          disabled="false"
          style={{ color: "blue" }}
        >
          test
        </button>
      );
      */

    const cartItem = {
      counter: this.state.counter,
      productItem: this.state.productItem
    };

    return (
      <div>
        <div>Quantity: {this.state.counter}</div>
        <div>Associated Product Id: {this.props.productItem._id}</div>
        <button onClick={() => this.handleIncrement(this.props.productItem)}>
          +
        </button>
        <button onClick={() => this.handleDecrement(this.props.productItem)}>
          -
        </button>
        {/* {disableButtonTest} */}

        <button
          onClick={() =>
            // this.props.onCartItemAdd(this.state.counter, this.state.productItem)
            this.props.onCartItemAdd(cartItem)
          }
        >
          Add to cart22
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCartItemAdd: cartItem => dispatch(actionCreators.addItemToCart(cartItem))
    // dispatch(actionCreators.addItemToCart(counter, productItem))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(AddItem);
