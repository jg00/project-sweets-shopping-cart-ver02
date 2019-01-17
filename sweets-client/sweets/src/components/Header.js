import React, { Component } from "react";

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="div-menu jumbotron jumbotron-fluid bg-yellow pb-2 pt-3 mb-0">
        <div className="container">
          <div className="display-4">Nama Chocolates</div>
          <p className="lead">These you have to try!</p>
        </div>
      </div>
    );
  }
}

export default Header;
