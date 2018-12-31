import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { Elements, StripeProvider } from "react-stripe-elements";
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

export default BaseLayout;
