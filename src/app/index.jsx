import React, { useState, useEffect } from 'react';
import './styles.css';
import '../themes/index.css';
import Router from './router';
import AuthContext from './authContext';
import Api from '../api';
import { Spinner } from '../components/layoutPieces';

function AuthContextCreator() {
  const [user, setUser] = useState(null);
  const [userError, setUserError] = useState(false);
  const [scaUserError, setScaUserError] = useState(false);

  const tokenLogin = async token => {
    if (userError) {
      setUserError(false);
    }
    try {
      const loggedUser = await Api.login(token);
      setUser(loggedUser);
    } catch (e) {
      setUserError(true);
    }
  };

  const scaLogin = async (username, password) => {
    if (scaUserError) {
      setScaUserError(false);
    }
    try {
      const loggedUser = await Api.scaLogin(username, password);
      setUser(loggedUser);
    } catch (e) {
      setScaUserError(true);
    }
  };

  return {
    user,
    userError,
    scaUserError,
    tokenLogin,
    scaLogin,
  };
}

function App() {
  const authStore = AuthContextCreator();
  const { user, userError } = authStore;
  const loading = !(user || userError);

  function onMount() {
    try {
      const token = window.localStorage.getItem('access_token');
      authStore.tokenLogin(token);
    } catch (e) {}
  }

  useEffect(onMount, []);

  if (loading) {
    return <Spinner size="large" />;
  }

  return (
    <AuthContext.Provider value={authStore}>
      <Router />
    </AuthContext.Provider>
  );
}

export default App;
