import React, { useRef } from 'react';
import {
  filterContacts,
  useContacts,
} from '../../context/contact/ContactState';

const ContactFilter = () => {
  //we only need contactDispatch without state
  const contactDispatch = useContacts()[1];

  const text = useRef('');
  const onChange = (e) => {
    if (text.current.value !== '') {
      filterContacts(contactDispatch, e.target.value);
    }
  };
  return (
    <form>
      <input
        type='text'
        ref={text}
        placeholder='Filter contacts...'
        onChange={onChange}
      />
    </form>
  );
};

export default ContactFilter;
