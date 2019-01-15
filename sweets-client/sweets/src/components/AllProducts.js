import React, { Component } from "react";
import { connect } from "react-redux";
// import jwtDecode from "jwt-decode";
// import axios from "axios";
import * as actionCreators from "../store/actions/products";
import AddItem from "./AddItem";
// const ALL_PRODUCTS_URL = "http://localhost:3001/api/products/display";
// const DELETE_PRODUCT_URL = "http://localhost:3001/api/products/delete";

class AllProducts extends Component {
  // styles = {
  // width: 200
  // height: 100
  // resizeMode: "cover"
  // };

  render() {
    // console.log(this.props.products);

    let productItems = this.props.products.map(product => {
      return (
        // <div className="col-lg-3">
        // Place each item in a card
        <div key={product._id} className="col-md-6 col-lg-4 col-xl-4">
          <div className="card border-0 px-sm-3 py-sm-3 mb-4">
            <div>
              <img
                className="card-img-top"
                src={product.product.image}
                // style={this.styles}
              />
            </div>
            <div className="card-body">
              {/* <div>ProductId: {product._id} </div> */}
              <h5 className="card-title">{product.product.name} </h5>
              {/* <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p> */}
              <div className="card-text">Type: {product.product.types} </div>
              <div className="card-text">Price: {product.product.price} </div>

              {/* <div>
            <Quantity associatedItemProductId={product._id} />
          </div> */}

              {this.props.isAuth && this.props.userData.isAdmin ? (
                <button onClick={() => this.props.onProductDelete(product._id)}>
                  Delete Product
                </button>
              ) : (
                // <Quantity associatedItemProductId={product._id} />
                <AddItem productItem={product} />

                /*  BEFORE MOVING BUTTO TO QUANTITY COMPONENET
            <button
            // onClick={() =>
            //   this.props.onProductDelete(product._id, DELETE_PRODUCT_URL)
            // }
            // onClick={() => this.handleDeleteProductButtonClick(product._id)} // for state
            >
              Add to cart
            </button>
            */
              )}
            </div>
          </div>
        </div>
      );
    });

    return (
      <div>
        <section className="container">
          <h3 className="mt-2 text-muted">Welcome!</h3>
          {/* <div className="display-4 text-muted">Display All Products Page</div> */}
          {/* <h3 className="text-muted">Welcome</h3> */}
          {/* <div>{this.props.error.message}</div> */}
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
    error: state.cart.error //
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onProductDelete: id => dispatch(actionCreators.deleteProduct(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllProducts);
