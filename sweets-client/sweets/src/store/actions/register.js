import * as actionTypes from "./actionTypes";
import axios from "axios";
const REGISTER_URL = "http://localhost:3001/api/users/register";

export const saveResult = user => {
  return {
    type: actionTypes.REGISTER,
    user2: user
  };
};

// Action creator
export const register = user => {
  return dispatch => {
    axios
      .post(REGISTER_URL, user)
      .then(response => {
        console.log("responsessss", response);
        dispatch(saveResult(user)); // After registering user we want to return the action in saveResult

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
