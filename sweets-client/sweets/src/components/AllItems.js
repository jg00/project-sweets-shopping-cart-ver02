import React, { Component } from "react";
import { connect } from "react-redux";
import UpdateCartItem from "./UpdateCartItem";
import Checkout from "./Checkout";

class AllItems extends Component {
  displayItems() {
    const { cartItems } = this.props.cart; // array
    // let displayItems = <div>cart</div>;

    const displayItems = (
      // <div>{cartItems.map(item => item.productItem._id)}</div>
      <div className="row">
        {/* <div> */}
        {/* <div>{this.props.error.message}</div> */}
        {cartItems.map(product => {
          return (
            <div
              key={product.productItem._id}
              className="col-md-6 col-lg-4 col-xl-4"
            >
              <div className="card border-0 px-sm-3 py-sm-3 mb-4">
                {/* <div key={product.productItem._id}> */}
                <img
                  className="card-img-top"
                  src={product.productItem.product.image}
                />
                {/* </div> */}

                <div className="card-body">
                  {/* <h5 className="card-title">
                    ProductId: {product.productItem._id}
                  </h5> */}
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

    // let displayItems = <div>{cartItems.length}</div>;
    // let displayItems = cartItems.map(item => {
    //   <div>
    //     <div>{item.length}</div>
    //   </div>;
    // });
    return displayItems;
  }

  render() {
    return (
      <div>
        <section className="container">
          <h3 className="mt-2 text-muted">Your Cart Items</h3>
          {/* <div>Display All Items Page</div> */}
          {/* <Checkout /> */}
          {/* <div>{this.props.error.message}</div> */}
          {this.displayItems()}
          {/* <div>Cart: {this.props.cart.cartItems.length}</div> */}
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

export default connect(mapStateToProps)(AllItems);
