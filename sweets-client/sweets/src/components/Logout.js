import React, { Component } from "react";
// import { connect } from "react-redux";

class Logout extends Component {
  componentDidMount() {
    localStorage.removeItem("jsonwebtoken");
  }

  render() {
    return (
      <div>
        <div>Logged out</div>
      </div>
    );
  }
}

export default Logout;
