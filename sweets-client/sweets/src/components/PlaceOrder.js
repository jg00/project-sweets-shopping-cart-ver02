import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
const CHECKOUT_CHARGE_URL = "http://localhost:3001/api/checkout/charge";

class PlaceOrder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chargeResponse: ""
    };
  }

  onToken = token => {
    axios
      .post(CHECKOUT_CHARGE_URL, {
        token: token,
        totalAmount: this.props.totalAmount
      })
      .then(response => {
        console.log("Charge added: ", response.data);
        if (response) this.setState({ chargeResponse: response.data.status });
        // if (response.ok) this.setState({ complete: true });
      })
      .catch(rejected => {
        console.log("Add product connection error: ", rejected);
      });
  };

  // original
  //   onToken = token => {
  //     fetch(CHECKOUT_CHARGE_URL, {
  //       method: "POST",
  //       body: JSON.stringify(token)
  //     }).then(response => {
  //       response.json().then(data => {
  //         alert(`We are in business, ${data.email}`);
  //       });
  //     });
  //   };

  render() {
    console.log("TOTAL AMOUNT FROM CartPlaceOrder.js ", this.props.totalAmount);
    console.log("CHARGE RESPONSE - ", this.state.chargeResponse);
    return (
      <div>
        <StripeCheckout
          token={this.onToken}
          stripeKey="pk_test_NkLO112Bwl84YkPVZzIUOwYh"
          name="Royce Nama Chocolates" // the pop-in header title
          description="If there's one chcolate to try.." // the pop-in header subtitle
          // image="http://localhost:3001/images/marketplace.png" // the pop-in header image (default none)
          ComponentClass="div"
          panelLabel="Place Order"
          amount={this.props.totalAmount} // cents
          currency="USD"
          locale="en"
          email="chocolates@mail.com"
          // Note: Enabling either address option will give the user the ability to
          // fill out both. Addresses are sent as a second parameter in the token callback.
          shippingAddress
          billingAddress={false}
          // Note: enabling both zipCode checks and billing or shipping address will
          // cause zipCheck to be pulled from billing address (set to shipping if none provided).
          zipCode={false}
          //   alipay // accept Alipay (default false)
          //   bitcoin // accept Bitcoins (default false)
          allowRememberMe // "Remember Me" option (default true)
          //   token={this.onToken} // submit callback
          opened={this.onOpened} // called when the checkout popin is opened (no IE6/7)
          closed={this.onClosed} // called when the checkout popin is closed (no IE6/7)
          // Note: `reconfigureOnUpdate` should be set to true IFF, for some reason
          // you are using multiple stripe keys
          reconfigureOnUpdate={false}
          // Note: you can change the event to `onTouchTap`, `onClick`, `onTouchStart`
          // useful if you're using React-Tap-Event-Plugin
          //   triggerEvent="onTouchTap"
        />
        <div>{this.state.chargeResponse}</div>
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

export default connect(mapStateToProps)(PlaceOrder);
