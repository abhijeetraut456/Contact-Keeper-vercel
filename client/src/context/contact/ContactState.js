import contactReducer from './contactReducer';
import ContactContext from './contactContext';
import { useContext, useReducer } from 'react';
import axios from 'axios';
import {
  ADD_CONTACT,
  CLEAR_CONTACTS,
  CLEAR_CURRENT,
  DELETE_CONTACT,
  FILTER_CONTACT,
  SET_CURRENT,
  UPDATE_CONTACT,
  GET_CONTACTS,
  CONTACT_ERROR,
} from '../types';

//create  customs hook to used context
export const useContacts = () => {
  const { state, dispatch } = useContext(ContactContext);
  return [state, dispatch];
};

//Get contacts
export const getContacts = async (dispatch) => {
  try {
    const res = await axios.get('/api/contacts');
    dispatch({
      type: GET_CONTACTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CONTACT_ERROR,
      payload: err.response.data.msg,
    });
  }
};

//Add contacts
export const addContacts = async (dispatch, contact) => {
  try {
    const res = await axios.post('/api/contacts', contact);
    dispatch({
      type: ADD_CONTACT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CONTACT_ERROR,
      payload: err.response.data.msg,
    });
  }
};

//Delete contacts
export const deleteContact = async (dispatch, id) => {
  try {
    await axios.delete(`/api/contacts/${id}`);
    dispatch({
      type: DELETE_CONTACT,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: CONTACT_ERROR,
      payload: err.response.data.msg,
    });
  }
};

//Set current
export const setCurrent = (dispatch, contact) => {
  dispatch({
    type: SET_CURRENT,
    payload: contact,
  });
};

//Clear current
export const clearCurrent = (dispatch) => {
  dispatch({
    type: CLEAR_CURRENT,
  });
};

//Update the contact
export const updateContact = async (dispatch, contact) => {
  try {
    const res = await axios.put(`/api/contacts/${contact._id}`, contact);
    dispatch({
      type: UPDATE_CONTACT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CONTACT_ERROR,
      payload: err.response.data.msg,
    });
  }
  dispatch({
    type: UPDATE_CONTACT,
    payload: contact,
  });
};

//Filter contacts
export const filterContacts = (dispatch, text) => {
  dispatch({
    type: FILTER_CONTACT,
    payload: text,
  });
};

//Clear contacts
export const clearContacts = (dispatch) => {
  dispatch({
    type: CLEAR_CONTACTS,
  });
};

const ContactState = (props) => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null,
  };
  const [state, dispatch] = useReducer(contactReducer, initialState);

  return (
    <ContactContext.Provider value={{ state: state, dispatch }}>
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
