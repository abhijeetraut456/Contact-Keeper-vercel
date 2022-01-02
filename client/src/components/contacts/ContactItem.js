import React from 'react';
import PropTypes from 'prop-types';
import {
  useContacts,
  deleteContact,
  setCurrent,
  clearCurrent,
} from '../../context/contact/ContactState';

const ContactItem = ({ contact }) => {
  const { _id, name, email, phone, type } = contact;

  const [contactState, contactDispatch] = useContacts();

  const onDelete = () => {
    deleteContact(contactDispatch, _id);
    clearCurrent(contactDispatch);
  };
  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {name}
        <span
          className={
            'badge ' +
            `${type === 'professional' ? 'badge-success' : 'badge-primary'}`
          }
          style={{ float: 'right' }}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul>
        {email && (
          <li>
            <i className='fas fa-envelope'></i> {email}
          </li>
        )}
        {phone && (
          <li>
            <i className='fas fa-phone'></i> {phone}
          </li>
        )}
      </ul>
      <p>
        <button
          className='btn btn-sm btn-dark'
          onClick={() => setCurrent(contactDispatch, contact)}
        >
          Edit
        </button>
        <button className='btn btn-sm btn-danger' onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object,
};
export default ContactItem;
