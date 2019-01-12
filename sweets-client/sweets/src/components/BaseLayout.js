import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route, withRouter } from "react-router-dom";
import { Elements, StripeProvider } from "react-stripe-elements";
// import jwtDecode from "jwt-decode";
import * as authActionCreators from "../store/actions/auth";
import * as productsActionCreators from "../store/actions/products";
import * as cartItemsActionCreators from "../store/actions/cartItems";
import Menu from "./Menu";
import AllItems from "./AllItems";
// import AddItem from "./AddItem";
import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";
import AddProduct from "./AddProduct";
import AllProducts from "./AllProducts";
import CartCounter from "./CartCounter";
// import Checkout from "./Checkout";
import Donate from "./Donate";

class BaseLayout extends Component {
  componentDidMount() {
    this.props.onSiteReload(this.props.history);
    this.props.onLoadProductList();
    this.props.onloadCartItems();
  }

  render() {
    return (
      <StripeProvider apiKey="pk_test_Zd781mNaLE5XM1ReSpgpOhI7">
        <Elements>
          <div>
            <Menu />
            <Switch>
              <Route exact path="/" component={AllProducts} />
              {/* <Route exact path="/" component={AllItems} /> */}
              {/* <Route path="/AddItem" component={AddItem} /> */}
              <Route path="/Login" component={Login} />
              <Route path="/Logout" component={Logout} />
              <Route path="/Register" component={Register} />
              <Route path="/AddProduct" component={AddProduct} />
              <Route path="/CartCounter" component={CartCounter} />
              <Route path="/AllItems" component={AllItems} />
              {/* <Route path="/Checkout" component={Checkout} /> */}
              {/* <Route path="/AllProducts" component={AllProducts} /> */}
              {/* <Elements> */}
              <Route path="/Donate" component={Donate} />
              {/* </Elements> */}
            </Switch>
          </div>
        </Elements>
      </StripeProvider>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSiteReload: historyProps =>
      dispatch(authActionCreators.checkAuthenticateOnSiteReload(historyProps)),

    onLoadProductList: () => dispatch(productsActionCreators.loadProductList()),

    onloadCartItems: () => dispatch(cartItemsActionCreators.loadCartItems())
  };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(BaseLayout)
);
