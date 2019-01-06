import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route, withRouter } from "react-router-dom";
import { Elements, StripeProvider } from "react-stripe-elements";
import jwtDecode from "jwt-decode";
import * as authActionCreators from "../store/actions/auth";
import * as productsActionCreators from "../store/actions/products";
import Menu from "./Menu";
import AllItems from "./AllItems";
import AddItem from "./AddItem";
import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";
import AddProduct from "./AddProduct";
import AllProducts from "./AllProducts";
import Donate from "./Donate";

class BaseLayout extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    // const token = localStorage.getItem("jsonwebtoken");
    // const tokenInfo = jwtDecode(token);
    // console.log("mounting", tokenInfo);

    this.props.onSiteReload(this.props.history);
    // this.props.onSiteReload();

    this.props.onLoadProductList();
  }

  /*
  componentDidMount() {
    const token = localStorage.getItem("jsonwebtoken");
    // console.log("test");
    if (!token || token === "undefined") {
      console.log("Not Authorized - BaseLayout");
    } else {
      console.log("Authorized - BaseLayout");
      // this.props.onAuthenticate();  // was causing error when no token available

      // Need to get payload userData from the token in localstore
      const tokenInfo = jwtDecode(token);
      console.log("tokeninfo - ", tokenInfo); // {email: "sam@mail.com", name: "Sam", isAdmin: true, iat: 1545188894 }

      const formattedTokenInfo = {
        email: tokenInfo.email,
        name: tokenInfo.name,
        isAdmin: tokenInfo.isAdmin
      };

      // If page "Refreshed" manually override redux property isAuth: true
      // this.props.onAuthenticate();
      // this.props.onAuthenticateManuallySet(true);  // before adding decode
      // this.props.onAuthenticateManuallySet(true, formattedTokenInfo); //(commented for now)
      // this.props.onAuthenticate()
    }
  }
*/

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

    onLoadProductList: () => dispatch(productsActionCreators.loadProductList())
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     onSiteReload: historyProps =>
//       dispatch(actionCreators.checkAuthenticateOnSiteReload(historyProps))
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     onAuthenticate: (user, historyProps) =>
//       dispatch(actionCreators.setAuthenticate(user, historyProps))
//   };
// };

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(BaseLayout)
);
