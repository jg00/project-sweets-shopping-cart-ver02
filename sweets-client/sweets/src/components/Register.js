import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
// import * as actionTypes from "../store/actions/actionTypes";
import * as actionCreators from "../store/actions/register";
const REGISTER_URL = "http://localhost:3001/api/users/register";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {}
    };
  }

  handleTextBoxOnChange = e => {
    let user = { ...this.state.user };
    user[e.target.name] = e.target.value;
    this.setState({ user });
    // console.log(user);
  };

  handleRegisterButtonClick = () => {
    let user = this.state.user;

    axios
      .post(REGISTER_URL, user)
      .then(response => {
        // console.log(response.data);
        this.props.history.push(`/Login`);
      })
      .catch(rejected => {
        console.log("Register user connection error: ", rejected);
      });
  };

  render() {
    return (
      <div>
        <div>Register</div>
        <div>
          <div>
            <input
              type="text"
              placeholder="Email As Username"
              name="email"
              onChange={this.handleTextBoxOnChange}
            />
            <input
              type="text"
              placeholder="Password"
              name="password"
              onChange={this.handleTextBoxOnChange}
            />
            <input
              type="text"
              placeholder="First Name"
              name="name"
              onChange={this.handleTextBoxOnChange}
            />
            <button onClick={() => this.props.onRegister(this.state.user)}>
              Register User
            </button>
            {/* <button onClick={this.handleRegisterButtonClick}>
              Register User
            </button> */}
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onRegister: user => dispatch(actionCreators.register(user))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Register);
