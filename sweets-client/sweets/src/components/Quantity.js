import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../store/actions/cartItems";

class Quantity extends Component {
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
          onClick={() => this.props.onCartItemsAdd(this.state.productItem)}
        >
          Add to cart22
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCartItemsAdd: product => dispatch(actionCreators.addItemToCart(product))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Quantity);
