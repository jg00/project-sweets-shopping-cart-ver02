import React, { Component } from "react";
import { connect } from "react-redux";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { setAuthenticationToken } from "../utils";
const LOGIN_URL = "http://localhost:3001/api/auth/";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("jsonwebtoken");
    // console.log("test");
    if (!token || token === "undefined") {
      console.log("Not Authorized");
    } else {
      console.log("Authorized");
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
      this.props.onAuthenticateManuallySet(true, formattedTokenInfo);
    }
  }

  handleTextBoxOnChange = e => {
    let user = { ...this.state.user };
    user[e.target.name] = e.target.value;
    this.setState({ user });
  };

  handleLoginButtonClick = () => {
    let user = this.state.user;
    // console.log(user);

    axios
      .post(LOGIN_URL, user)
      .then(response => {
        // console.log(response.data);

        if (response.data.success === false) {
          console.log("Login.js > handleLoginButtonClick - false");
        } else {
          console.log("Login.js > handleLoginButtonClick - true");

          // save the token to localStorage so we can access it later on
          localStorage.setItem("jsonwebtoken", response.data.token);
          // put the token in the request header
          setAuthenticationToken(response.data.token);
          console.log(response.data); // response.data
          // this.props.onAuthenticate()  // before sendin param;
          this.props.onAuthenticate(response.data);
          this.props.history.push("/");
        }

        // window.location = "/";
        // this.props.history.push("/");
      })
      .catch(rejected => {
        console.log("Login user connection error: ", rejected);
      });
  };

  render() {
    return (
      <div>
        <div>Login</div>
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

            <button onClick={this.handleLoginButtonClick}>Login</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuthenticate: responseData =>
      dispatch({ type: "SET_AUTHENTICATE", responseData: responseData }),

    onAuthenticateManuallySet: (boolValue, tokenInfo) =>
      dispatch({
        type: "SET_AUTHENTICATE_MANUALLY",
        boolValue: boolValue,
        tokenInfo: tokenInfo
      })
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Login);
