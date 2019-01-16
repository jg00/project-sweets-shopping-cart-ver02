import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./styles/Menu.css";
import CartCounter from "./CartCounter";
// import Checkout from "./Checkout";

class Menu extends Component {
  render() {
    // ORIGINAL
    // return (
    //   <div className="div-menu">
    //     <ul className="div-menu-ul">
    //       <li className="div-menu-li">
    //         <Link to="/">Products</Link>
    //       </li>

    //       {/* </li>
    //       <li className="div-menu-li">
    //         <Link to="/">All Items</Link>
    //       </li> */}

    //       {/* <li className="div-menu-li">
    //         <Link to="/AddItem">Add Item</Link>
    //       </li> */}

    //       {/* {this.props.isAuth && (
    //         <li className="div-menu-li">
    //           <Link to="/Login">Logoutsss</Link>
    //         </li>
    //       )}
    //       {!this.props.isAuth && (
    //         <li className="div-menu-li">
    //           <Link to="/Login">Loginsss</Link>
    //         </li>
    //       )} */}

    //       {this.props.isAuth ? (
    //         <li className="div-menu-li">
    //           <Link to="/Logout" onClick={this.props.onAuthenticate}>
    //             Logout
    //           </Link>
    //         </li>
    //       ) : (
    //         <li className="div-menu-li">
    //           <Link to="/Login">Login</Link>
    //         </li>
    //       )}

    //       {this.props.isAuth ? null : (
    //         <li className="div-menu-li">
    //           <Link to="/Register">Register</Link>
    //         </li>
    //       )}

    //       {/* <li className="div-menu-li">
    //         <Link to="/AddProduct">Add Product</Link>
    //       </li> */}

    //       {this.props.isAuth && this.props.userData.isAdmin && (
    //         <li className="div-menu-li">
    //           <Link to="/AddProduct">Add Product</Link>
    //         </li>
    //       )}

    //       {/* <li className="div-menu-li">
    //         <Link to="/Donate">Donate</Link>
    //       </li> */}

    //       <li className="div-menu-li">
    //         <Link to="/AllItems">
    //           <CartCounter />
    //         </Link>
    //       </li>

    //       {/* <li className="div-menu-li">
    //         <Link to="/Checkout">Checkout</Link>
    //       </li> */}
    //       {/* <li className="div-menu-li">
    //         <Link to="/Checkout">
    //           <Checkout />
    //         </Link>
    //       </li> */}

    //       {/* <div>{this.props.isAuth ? "true" : "false"}</div> */}
    //     </ul>
    //   </div>
    // );

    // NEW
    return (
      <div>
        {/* <div className="container">
          <h3 className="display-1">Nama Chocolates</h3>
          <p class="lead">Something you just have to try!</p>
        </div> */}

        <div
          // id="div-menu"
          className="div-menu jumbotron jumbotron-fluid bg-yellow pb-2 pt-3 mb-0"
        >
          <div className="container">
            <div className="display-4">Nama Chocolates</div>
            <p className="lead">These you have to try!</p>
          </div>
        </div>

        <div>
          {/* <div className="div-menu"> */}
          <div className="container custom-font mb-10">
            {/* <div className="container custom-font mb-10"> */}
            <ul className="nav pt-0">
              <li className="nav-item">
                <Link to="/" className="nav-link pl-0">
                  Products
                </Link>
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

              {/* <li className="div-menu-li">
            <Link to="/AddProduct">Add Product</Link>
          </li> */}

              {this.props.isAuth && this.props.userData.isAdmin && (
                <li className="nav-item">
                  <Link to="/AddProduct" className="nav-link">
                    Add Product
                  </Link>
                </li>
              )}

              {/* <li className="div-menu-li">
            <Link to="/Donate">Donate</Link>
          </li> */}

              <li className="nav-item">
                <Link to="/AllItems" className="nav-link">
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
