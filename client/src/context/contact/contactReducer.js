import {
  ADD_CONTACT,
  CLEAR_CONTACTS,
  CLEAR_CURRENT,
  DELETE_CONTACT,
  FILTER_CONTACT,
  GET_CONTACTS,
  SET_CURRENT,
  UPDATE_CONTACT,
} from '../types';

const contactReducer = (state, action) => {
  switch (action.type) {
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
      };
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
      };
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact._id !== action.payload
        ),
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact._id === action.payload._id ? action.payload : contact
        ),
      };
    case FILTER_CONTACT:
      return {
        ...state,
        filtered: state.contacts.filter((contact) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return contact.name.match(regex) || contact.email.match(regex);
        }),
      };
    case CLEAR_CONTACTS:
      return {
        ...state,
        contacts: null,
        current: null,
        filtered: null,
        error: null,
      };
    default:
      return state;
  }
};

export default contactReducer;
