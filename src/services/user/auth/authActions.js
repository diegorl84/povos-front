import axios from "axios";
import * as AT from "./authTypes";

export const autheticateUser = (email, passowrd) => {
  const credentials = {
    email: email,
    password: passowrd,
  };
  return (dispatch) => {
    dispatch({
      type: AT.LOGIN_REQUEST,
    });

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    
    axios.post("http://localhost:5000/user/authenticate", credentials)
      .then((response) => {
        localStorage.setItem("jwtToken", response.data.token);
        dispatch(success(true));
      })
      .catch((error) => {
        dispatch(failure(error));
      });
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    dispatch({
      type: AT.LOGIN_REQUEST,
    });
    localStorage.removeItem("jwtToken")
    dispatch(success(false));
  };
};

const success = (isLoggedIn) => {
  return {
    type: AT.SUCCESS,
    payload: isLoggedIn,
  };
};

const failure = () => {
  return {
    type: AT.FAILURE,
    payload: false,
  };
};
