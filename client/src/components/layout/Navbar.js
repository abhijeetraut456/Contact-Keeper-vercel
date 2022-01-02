import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useAuth, logout } from '../../context/auth/AuthState';
import { useContacts, clearContacts } from '../../context/contact/ContactState';

const Navbar = ({ title, icons }) => {
  const [authState, authDispatch] = useAuth();
  const { user, isAuthenticated } = authState;

  //we need contactDispatch without state
  const [contactState, contactDispatch] = useContacts();

  //logout
  const onLogout = () => {
    logout(authDispatch);
    clearContacts(contactDispatch);
  };

  const guestLink = (
    <Fragment>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </Fragment>
  );

  const authLink = (
    <Fragment>
      <li>{user && user.name}</li>
      <li>
        <Link to='/login' onClick={onLogout}>
          <i className='fas fa-sign-out-alt'></i>
          {''} <span className='hide-sm'>Logout</span>
        </Link>
      </li>
    </Fragment>
  );

  return (
    <div className='navbar bg-primary'>
      <h1>
        {title} <i className={icons} />
      </h1>
      <ul>{isAuthenticated ? authLink : guestLink}</ul>
    </div>
  );
};

Navbar.defaultProps = {
  title: 'Contact Keeper',
  icons: 'fas fa-id-card-alt',
};

export default Navbar;
