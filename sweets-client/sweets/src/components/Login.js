import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import jwtDecode from "jwt-decode";
// import axios from "axios";
// import { setAuthenticationToken } from "../utils";
import * as actionCreators from "../store/actions/auth";
// const LOGIN_URL = "http://localhost:3001/api/auth/";

class Login extends Component {
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
  };

  render() {
    return (
      <div>
        <div>Login</div>
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

            {/* <button onClick={this.handleLoginButtonClick}>Login</button> */}
            <button
              onClick={() =>
                this.props.onAuthenticate(this.state.user, this.props.history)
              }
            >
              Login
            </button>

            <div>{this.props.error.message}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.auth.error // object
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuthenticate: (user, historyProps) =>
      dispatch(actionCreators.setAuthenticate(user, historyProps))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Login));
