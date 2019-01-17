import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actionCreators from "../store/actions/register";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    this.props.onResetError();
  }

  handleTextBoxOnChange = e => {
    let user = { ...this.state.user };
    user[e.target.name] = e.target.value;
    this.setState({ user });
  };

  render() {
    return (
      <div>
        <section className="container">
          <h3 className="mt-2 text-muted">Register</h3>
          <div>
            <div>
              <input
                type="text"
                placeholder="Email As Username*"
                name="email"
                onChange={this.handleTextBoxOnChange}
              />
              <input
                type="text"
                placeholder="Password*"
                name="password"
                onChange={this.handleTextBoxOnChange}
              />
              <input
                type="text"
                placeholder="First Name*"
                name="name"
                onChange={this.handleTextBoxOnChange}
              />
              <button
                onClick={() =>
                  this.props.onRegister(this.state.user, this.props.history)
                }
              >
                Register User
              </button>

              <div>{this.props.error.message}</div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.register.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRegister: (user, historyProps) =>
      dispatch(actionCreators.register(user, historyProps)),

    onResetError: () => dispatch(actionCreators.resetError())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Register));
