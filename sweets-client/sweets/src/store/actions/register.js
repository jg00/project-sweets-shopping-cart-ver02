import * as actionTypes from "./actionTypes";
import axios from "axios";
const REGISTER_URL = "http://localhost:3001/api/users/register";

export const saveResult = (user, response) => {
  return {
    type: actionTypes.REGISTER,
    user2: user,
    error: response
  };
};

// Action creator
export const register = (user, historyProps) => {
  return dispatch => {
    axios
      .post(REGISTER_URL, user)
      .then(response => {
        // data: {success: false, message: "Db error - Unable to save/register new user."}
        console.log("responsessss", response);
        dispatch(saveResult(user, response.data)); // After registering user we want to return the action in saveResult

        // console.log(historyProps);
        // console.log(response.data.success);
        if (response.data.success === false) {
          console.log(response.data);
        } else {
          historyProps.push(`/Login`); // new change
        }
        // if (response.data)
        // historyProps.push(`/Login`); // new change
        // console.log(response.data);
        // this.props.history.push(`/Login`);  // error - will not work here b/c props is undefined
      })
      .catch(rejected => {
        console.log("Register user connection error: ", rejected);
      });
  };

  //   // Test below works
  //   // We want now to return a function
  //   return dispatch => {
  //     setTimeout(() => {
  //       // const oldCounter = getState().ctr.counter;
  //       console.log("tesssst", user);
  //       dispatch(saveResult(user)); // This updates the state in the store. Need to execute as a function.
  //     }, 2000);

  // axios
  // .post(REGISTER_URL, user)
  // .then(response => {

  //     dispatch(saveResult(user))  // After registering user we want to return the action in saveResult

  // // console.log(response.data);
  // this.props.history.push(`/Login`);

  // })
  // .catch(rejected => {
  // console.log("Register user connection error: ", rejected);
  // });
  //   };
};
