import React, { useContext, useEffect, useReducer } from 'react';
import authReducer from './authReducer';
import AuthContext from './authContext';
import setAuthToken from '../../utils/setAuthToken';
import axios from 'axios';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_ERRORS,
  LOGOUT,
} from '../types';

//Create custom hook to use context
export const useAuth = () => {
  const { state, dispatch } = useContext(AuthContext);
  return [state, dispatch];
};

//load user
export const loadUser = async (dispatch) => {
  try {
    const res = await axios.get('/api/auth');
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: err.response.data.msg,
    });
  }
};
//Register  users
export const register = async (dispatch, formData) => {
  try {
    const res = await axios.post('/api/users', formData);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    loadUser(dispatch);
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
      payload: err.response.data.msg,
    });
  }
};

//login user
export const login = async (dispatch, formData) => {
  try {
    const res = await axios.post('/api/auth', formData);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    loadUser(dispatch);
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response.data.msg,
    });
  }
};

//Clear errors
export const clearErrors = (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

//logout
export const logout = (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
  };
  const [state, dispatch] = useReducer(authReducer, initialState);

  //set token when initialize app load
  setAuthToken(state.token);

  //load user on refresh
  if (state.loading) {
    loadUser(dispatch);
  }

  //watch state.token and set headers or any changes in localStorage
  useEffect(() => {
    setAuthToken(state.token);
  }, [state.token]);

  return (
    <AuthContext.Provider value={{ state: state, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
