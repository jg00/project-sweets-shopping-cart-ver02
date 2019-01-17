import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import axios from "axios";
const CHARGE_URL = "http://localhost:3001/api/donations/charge";

class Donate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalAmount: 500
    };

    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    let totalAmount = this.state.totalAmount;

    let { token } = await this.props.stripe.createToken({
      address_city: "ddddd"
    });
    console.log("tokenss - ", token);

    axios
      .post(CHARGE_URL, { token: token, totalAmount: totalAmount })
      .then(response => {
        console.log("Charge added: ", response.data);
      })
      .catch(rejected => {
        console.log("Add product connection error: ", rejected);
      });
  }

  handleTextBoxOnChange = e => {
    let user = { ...this.state.user };
    user[e.target.name] = e.target.value;
    this.setState({ user });
  };

  render() {
    return (
      <div className="checkout">
        <p>Donate $5 to World Vison</p>
        <CardElement />

        <button onClick={this.submit}>Send</button>
      </div>
    );
  }
}

export default injectStripe(Donate);
