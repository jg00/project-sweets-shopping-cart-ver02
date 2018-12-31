import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import axios from "axios";
const CHARGE_URL = "http://localhost:3001/api/donations/charge";

class Donate extends Component {
  constructor(props) {
    super(props);
    // this.state = { complete: false };

    this.state = {
      totalAmount: 500
    };

    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    let totalAmount = this.state.totalAmount;

    // let { token } = await this.props.stripe.createToken({ name: "Name" });
    let { token } = await this.props.stripe.createToken({
      address_city: "ddddd"
    });
    console.log("tokenss - ", token);

    // issue**************
    axios
      .post(CHARGE_URL, { token: token, totalAmount: totalAmount })
      .then(response => {
        console.log("Charge added: ", response.data);
        // if (response.ok) this.setState({ complete: true });
      })
      .catch(rejected => {
        console.log("Add product connection error: ", rejected);
      });

    /*  original
    // let response = await fetch("/charge", {
    let response = await fetch(CHARGE_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: token.id
    });

    if (response.ok) console.log("Purchase Complete!");
    */
  }

  handleTextBoxOnChange = e => {
    let user = { ...this.state.user };
    user[e.target.name] = e.target.value;
    this.setState({ user });
    // console.log(user);
  };

  render() {
    // if (this.state.complete) return <h1>Purchase Complete</h1>;

    return (
      <div className="checkout">
        <p>Donate $5 to World Vison</p>
        <CardElement />

        {/* <input
          type="text"
          placeholder="Total Amount"
          name="totalAmount"
          onChange={this.handleTextBoxOnChange}
        /> */}

        <button onClick={this.submit}>Send</button>
      </div>
    );
  }
}

export default injectStripe(Donate);
