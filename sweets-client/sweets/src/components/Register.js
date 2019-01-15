import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// import axios from "axios";
// import * as actionTypes from "../store/actions/actionTypes";
import * as actionCreators from "../store/actions/register";
// const REGISTER_URL = "http://localhost:3001/api/users/register";

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

  render() {
    return (
      <div>
        <section className="container">
          {/* <div>Register</div> */}
          <h3 className="mt-2 text-muted">Register</h3>
          <div>
            <div>
              <input
                type="text"
                placeholder="Email As Username*"
                name="email"
                onChange={this.handleTextBoxOnChange}
              />
              <input
                type="text"
                placeholder="Password*"
                name="password"
                onChange={this.handleTextBoxOnChange}
              />
              <input
                type="text"
                placeholder="First Name*"
                name="name"
                onChange={this.handleTextBoxOnChange}
              />
              <button
                onClick={() =>
                  this.props.onRegister(this.state.user, this.props.history)
                }
              >
                Register User
              </button>
              {/* <button onClick={this.handleRegisterButtonClick}>
              Register User
            </button> */}

              <div>{this.props.error.message}</div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.register.error // object
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRegister: (user, historyProps) =>
      dispatch(actionCreators.register(user, historyProps))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Register));
