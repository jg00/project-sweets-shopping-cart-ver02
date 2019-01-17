import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../store/actions/products";
import * as cartActionCreators from "../store/actions/cartItems";
import AddItem from "./AddItem";

class AllProducts extends Component {
  componentDidMount() {
    this.props.onResetError();
  }

  render() {
    let productItems = this.props.products.map(product => {
      return (
        // Place each item in a card
        <div key={product._id} className="col-md-6 col-lg-4 col-xl-4">
          <div className="card border-0 px-sm-3 py-sm-3 mb-4">
            <div>
              <img className="card-img-top" src={product.product.image} />
            </div>
            <div className="card-body">
              <h5 className="card-title">{product.product.name} </h5>
              <p className="card-text">
                Store at 10℃. Each box comes with 20pcs.
              </p>
              <div className="card-text">Type: {product.product.types} </div>
              <div className="card-text">Price: {product.product.price} </div>

              {this.props.isAuth && this.props.userData.isAdmin ? (
                <button onClick={() => this.props.onProductDelete(product._id)}>
                  Delete Product
                </button>
              ) : (
                <AddItem productItem={product} />
              )}
            </div>
          </div>
        </div>
      );
    });

    return (
      <div>
        <section className="container ">
          <h3 className="mt-2 text-muted">Welcome!</h3>
          <div>{this.props.error.message}</div>
          <div className="row">{productItems}</div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products.products, // array
    isAuth: state.auth.isAuth,
    userData: state.auth.user,
    error: state.cart.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onProductDelete: id => dispatch(actionCreators.deleteProduct(id)),

    onResetError: () => dispatch(cartActionCreators.resetError())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllProducts);
