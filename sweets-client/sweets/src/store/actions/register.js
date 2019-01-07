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
        console.log("responsessss", response);
        dispatch(saveResult(user, response.data));

        if (response.data.error.success === false) {
          console.log(response.data);
        } else {
          historyProps.push(`/Login`); // new change
        }
      })
      .catch(rejected => {
        console.log("Register user connection error: ", rejected);
      });
  };
};
