import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./styles/Menu.css";
import CartCounter from "./CartCounter";

class Menu extends Component {
  render() {
    return (
      <div>
        <div className="div-menu jumbotron jumbotron-fluid bg-yellow pb-2 pt-3 mb-0">
          <div className="container">
            <div className="display-4">Nama Chocolates</div>
            <p className="lead">
              These you have to try!
              <span className="text-capitalize font-weight-bold text-muted">
                {" "}
                {this.props.userData.name}
              </span>
            </p>
          </div>
        </div>

        <div>
          <div className="container custom-font mb-10">
            <ul className="nav pt-0">
              <li className="nav-item">
                <Link to="/" className="nav-link pl-0">
                  Products
                </Link>
              </li>

              {this.props.isAuth ? (
                <li className="nav-item">
                  <Link
                    to="/Logout"
                    className="nav-link"
                    onClick={this.props.onAuthenticate}
                  >
                    Logout
                  </Link>
                </li>
              ) : (
                <li className="nav-item">
                  <Link to="/Login" className="nav-link">
                    Login
                  </Link>
                </li>
              )}

              {this.props.isAuth ? null : (
                <li className="nav-item">
                  <Link to="/Register" className="nav-link">
                    Register
                  </Link>
                </li>
              )}

              {this.props.isAuth && this.props.userData.isAdmin && (
                <li className="nav-item">
                  <Link to="/AddProduct" className="nav-link">
                    Add Product
                  </Link>
                </li>
              )}

              {this.props.isAuth && this.props.userData.isAdmin ? null : (
                <li className="nav-item">
                  <Link to="/AllItems" className="nav-link">
                    <CartCounter />
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuth,
    userData: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuthenticate: () => dispatch({ type: "SET_AUTHENTICATE" })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);
