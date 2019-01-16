import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import jwtDecode from "jwt-decode";
// import axios from "axios";
// import { setAuthenticationToken } from "../utils";
import * as actionCreators from "../store/actions/auth";
import { SET_AUTH_REDIRECT_PATH } from "../store/actions/actionTypes";
// const LOGIN_URL = "http://localhost:3001/api/auth/";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    // console.log("test");
    this.props.onResetError();
  }

  // componentDidMount() {
  //   // if (this.props.authRedirectPath !== "/") {
  //   this.props.onSetAuthRedirectPath(); // reset if not checkout from cart
  //   // }
  // }

  handleTextBoxOnChange = e => {
    let user = { ...this.state.user };
    user[e.target.name] = e.target.value;
    this.setState({ user });
  };

  render() {
    return (
      <div>
        <section className="container">
          <h3 className="mt-2 text-muted">Login</h3>
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
                  this.props.onAuthenticate(
                    this.state.user,
                    this.props.history,
                    this.props.authRedirectPath
                  )
                }
              >
                Login
              </button>

              <div>{this.props.error.message}</div>
              {/* <div>{this.props.authRedirectPath}</div> */}
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.auth.error, // object
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuthenticate: (user, historyProps, authRedirectPath) =>
      dispatch(
        actionCreators.setAuthenticate(user, historyProps, authRedirectPath)
      ),
    // onSetAuthRedirectPath: () =>
    //   dispatch(actionCreators.setAuthRedirectPath("/")) // reset

    onResetError: () => dispatch(actionCreators.resetError())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Login));
