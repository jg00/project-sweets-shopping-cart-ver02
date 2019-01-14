import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./styles/Menu.css";
import CartCounter from "./CartCounter";
// import Checkout from "./Checkout";

class Menu extends Component {
  render() {
    return (
      <div className="div-menu">
        <ul className="div-menu-ul">
          <li className="div-menu-li">
            <Link to="/">Products</Link>
          </li>

          {/* </li>
          <li className="div-menu-li">
            <Link to="/">All Items</Link>
          </li> */}

          {/* <li className="div-menu-li">
            <Link to="/AddItem">Add Item</Link>
          </li> */}

          {/* {this.props.isAuth && (
            <li className="div-menu-li">
              <Link to="/Login">Logoutsss</Link>
            </li>
          )}
          {!this.props.isAuth && (
            <li className="div-menu-li">
              <Link to="/Login">Loginsss</Link>
            </li>
          )} */}

          {this.props.isAuth ? (
            <li className="div-menu-li">
              <Link to="/Logout" onClick={this.props.onAuthenticate}>
                Logout
              </Link>
            </li>
          ) : (
            <li className="div-menu-li">
              <Link to="/Login">Login</Link>
            </li>
          )}

          {this.props.isAuth ? null : (
            <li className="div-menu-li">
              <Link to="/Register">Register</Link>
            </li>
          )}

          {/* <li className="div-menu-li">
            <Link to="/AddProduct">Add Product</Link>
          </li> */}

          {this.props.isAuth && this.props.userData.isAdmin && (
            <li className="div-menu-li">
              <Link to="/AddProduct">Add Product</Link>
            </li>
          )}

          {/* <li className="div-menu-li">
            <Link to="/Donate">Donate</Link>
          </li> */}

          <li className="div-menu-li">
            <Link to="/AllItems">
              <CartCounter />
            </Link>
          </li>

          {/* <li className="div-menu-li">
            <Link to="/Checkout">Checkout</Link>
          </li> */}
          {/* <li className="div-menu-li">
            <Link to="/Checkout">
              <Checkout />
            </Link>
          </li> */}

          {/* <div>{this.props.isAuth ? "true" : "false"}</div> */}
        </ul>
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
