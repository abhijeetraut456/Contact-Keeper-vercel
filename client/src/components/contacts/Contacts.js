import React, { Fragment, useEffect } from 'react';
import { useContacts, getContacts } from '../../context/contact/ContactState';
import ContactItem from './ContactItem';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Spinner from '../layout/Spinner';
const Contacts = () => {
  const [contactState, contactDispatch] = useContacts();
  const { contacts, filtered } = contactState;

  useEffect(() => {
    getContacts(contactDispatch);
  }, [contactDispatch]);

  if (contacts !== null && contacts.length === 0) {
    return <h2>Please add contact</h2>;
  }
  return (
    <Fragment>
      {contacts != null ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map((contact) => (
                <CSSTransition
                  key={contact._id}
                  classNames='item'
                  timeout={500}
                >
                  <ContactItem contact={contact} />
                </CSSTransition>
              ))
            : contacts.map((contact) => (
                <CSSTransition
                  key={contact._id}
                  classNames='item'
                  timeout={500}
                >
                  <ContactItem contact={contact} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Contacts;
