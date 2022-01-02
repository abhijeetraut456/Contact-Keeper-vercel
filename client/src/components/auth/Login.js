import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import AlertContext from '../../context/alert/alertContext';
import { useAuth, login, clearErrors } from '../../context/auth/AuthState';

const Login = () => {
  const [authState, authDispatch] = useAuth();
  const { error, isAuthenticated } = authState;

  useEffect(() => {
    if (error === 'Invalid Credentials') {
      setAlert(error, 'danger');
      clearErrors(authDispatch);
    }
  }, [error]);

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Please enter valid address', 'danger');
    } else {
      login(authDispatch, {
        email,
        password,
      });
    }
  };
  if (isAuthenticated) return <Navigate to='/' />;
  return (
    <div className='form-container'>
      <h2>
        Login <span className='text-primary'>Account</span>
      </h2>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input type='email' name='email' value={email} onChange={onChange} />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
          />
        </div>
        <input
          type='submit'
          value='Login'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default Login;
