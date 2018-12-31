import React, { Component } from "react";
import { connect } from "react-redux";
import jwtDecode from "jwt-decode";

class AllItems extends Component {
  componentDidMount() {
    // If page "Refreshed" manually override redux property isAuth: true|false accordingly
    // console.log(this.props.isAuth);  // on refresh redux state is reset so do not use
    const token = localStorage.getItem("jsonwebtoken");
    // console.log("test");
    if (!token || token === "undefined") {
      console.log("Not Authorized"); // just display all Items
    } else {
      console.log("Authorized - from AllItems");

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

    // Load all items section
  }

  // componentDidMount() {
  //   const token = localStorage.getItem("jsonwebtoken");
  //   // console.log("test");
  //   if (!token || token === "undefined") {
  //     console.log("Not Authorized");
  //   } else {
  //     console.log("Authorized");
  //     this.props.onAuthenticate();
  //   }
  // }

  render() {
    return <div>Display All Items Page</div>;
  }
}

// const mapStateToProps = state => {
//   return {
//     isAuth: state.isAuth
//   };
// };

const mapDispatchToProps = dispatch => {
  return {
    onAuthenticateManuallySet: (boolValue, tokenInfo) =>
      dispatch({
        type: "SET_AUTHENTICATE_MANUALLY",
        boolValue: boolValue,
        tokenInfo: tokenInfo
      })
  };
};

export default connect(
  // mapStateToProps,
  null,
  mapDispatchToProps
)(AllItems);

// export default AllItems;
