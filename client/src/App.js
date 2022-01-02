import React, { Fragment } from 'react';
import Navbar from './components/layout/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import './App.css';
import ContactState from './context/contact/ContactState';
import AlertState from './context/alert/AlertState';
import AuthState from './context/auth/AuthState';
import PrivateRoutes from './components/routing/PrivateRoutes';
import Alerts from './components/layout/Alerts';

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <BrowserRouter>
            <Fragment>
              <Navbar />
              <div className='container'>
                <Alerts />
                <Routes>
                  <Route
                    path='/'
                    element={<PrivateRoutes component={Home} />}
                  />
                  <Route path='/about' element={<About />} />
                  <Route path='/register' element={<Register />} />
                  <Route path='/login' element={<Login />} />
                </Routes>
              </div>
            </Fragment>
          </BrowserRouter>
        </AlertState>
      </ContactState>
    </AuthState>
  );
};

export default App;
