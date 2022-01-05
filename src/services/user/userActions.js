import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
} from "./userTypes";
import axios from 'axios'

export const fetchUsers = () => {
    return dispatch => {
        dispatch(fetchUserRequest());
        axios.get("https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole")
        .then(respose => {
        
            dispatch(fetchUserSuccess(respose.data))
        })
        .catch(error =>{
            dispatch(fetchUserFailure(error.message))
        })
    }
}

const fetchUserRequest = () => {
  return {
    type: FETCH_USER_REQUEST
  };
};

const fetchUserSuccess = (users) => {
  console.log(users)
  return {
    type: FETCH_USER_SUCCESS,
    payload: users
  };
};

const fetchUserFailure = (error) => {
  return {
    type: FETCH_USER_FAILURE,
    payload: error
  };
};
