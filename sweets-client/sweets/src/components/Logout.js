import React, { Component } from "react";
// import { connect } from "react-redux";

class Logout extends Component {
  componentDidMount() {
    localStorage.removeItem("jsonwebtoken");
    localStorage.removeItem("jsonwebtokenpayload");
    localStorage.removeItem("sweetsLocalStoreCart");
  }

  render() {
    return (
      <div>
        <section className="container">
          <h3 className="mt-2 text-muted">Logged out! Thank you!!</h3>
          {/* <div>Logged out! Thank you!!</div> */}
        </section>
      </div>
    );
  }
}

export default Logout;
