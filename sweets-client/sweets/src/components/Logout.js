import React, { Component } from "react";

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
        </section>
      </div>
    );
  }
}

export default Logout;
