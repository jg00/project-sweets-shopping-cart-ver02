import React, { Component } from "react";
import { connect } from "react-redux";

class AllItems extends Component {
  displayItems() {
    const { cartItems } = this.props.cart; // array
    // let displayItems = <div>cart</div>;

    const displayItems = (
      // <div>{cartItems.map(item => item.productItem._id)}</div>
      <div>
        {cartItems.map(product => {
          return (
            <div key={product.productItem._id}>
              <div>
                <img src={product.productItem.product.image} />
              </div>
              <div>ProductId: {product.productItem._id} </div>
              <div>{product.productItem.product.name} </div>
              <div>Type: {product.productItem.product.types} </div>
              <div>
                Price: {product.productItem.product.price} * {product.counter}{" "}
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
        <div>Display All Items Page</div>
        {this.displayItems()}
        {/* <div>Cart: {this.props.cart.cartItems.length}</div> */}
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
