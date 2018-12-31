import React, { Component } from "react";
// import { connect } from "react-redux";

class Logout extends Component {
  //   constructor(props) {
  //     super(props);

  //     this.state = {
  //       user: {}
  //     };
  //   }

  //   componentDidMount() {
  //     const token = localStorage.getItem("jsonwebtoken");
  //     // console.log("test");
  //     if (!token || token === "undefined") {
  //       console.log("Not Authorized");
  //     } else {
  //       console.log("Authorized");
  //       this.props.onAuthenticate();
  //     }
  //   }

  componentDidMount() {
    //   const token = localStorage.getItem("jsonwebtoken");
    //   console.log(token);
    localStorage.removeItem("jsonwebtoken");
    // this.props.onAuthenticate();
  }

  render() {
    return (
      <div>
        <div>Logged out</div>
        {/* <div>
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

            <button onClick={this.handleLoginButtonClick}>Logout</button>
          </div>
        </div> */}
      </div>
    );
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     onAuthenticate: () => dispatch({ type: "SET_AUTHENTICATE" })
//   };
// };

export default Logout;

// export default connect(
//   null,
//   mapDispatchToProps
// )(Logout);

// const mapStateToProps = state => {
//     return {
//       isAuth: state.isAuth
//     };
//   };

//   export default connect(mapStateToProps)(Logout);
