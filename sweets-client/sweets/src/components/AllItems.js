import React, { Component } from "react";
import { connect } from "react-redux";
import UpdateCartItem from "./UpdateCartItem";
import Checkout from "./Checkout";
import * as cartActionCreators from "../store/actions/cartItems";

class AllItems extends Component {
  componentDidMount() {
    this.props.onResetError();
  }

  displayItems() {
    const { cartItems } = this.props.cart; // array

    const displayItems = (
      <div className="row">
        {cartItems.map(product => {
          return (
            <div
              key={product.productItem._id}
              className="col-md-6 col-lg-4 col-xl-4"
            >
              <div className="card border-0 px-sm-3 py-sm-3 mb-4">
                <img
                  className="card-img-top"
                  src={product.productItem.product.image}
                />

                <div className="card-body">
                  <div className="card-title">
                    {product.productItem.product.name}
                  </div>
                  <p className="card-text">
                    Store at 10℃. Each box comes with 20pcs.
                  </p>
                  <div className="card-title">
                    Type: {product.productItem.product.types}
                  </div>
                  <div className="card-title">
                    Price: {product.productItem.product.price} *
                    {product.counter}
                  </div>
                  <UpdateCartItem product={product} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );

    return displayItems;
  }

  render() {
    return (
      <div>
        <section className="container">
          <h3 className="mt-2 text-muted">Your Cart Items</h3>

          <div>{this.props.error.message}</div>
          {this.displayItems()}

          <hr />
          <Checkout />
        </section>
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

const mapDispatchToProps = dispatch => {
  return {
    onResetError: () => dispatch(cartActionCreators.resetError())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllItems);
