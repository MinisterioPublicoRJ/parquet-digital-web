import React, { useState, useEffect } from 'react';
import './styles.css';
import '../themes/index.css';
import Router from './router';
import AuthContext from './authContext';
import Api from '../api';
import { Spinner } from '../components/layoutPieces';

function AuthContextCreator() {
  const [user, setUser] = useState(null);
  const [currentOffice, setCurrentOffice] = useState(null);
  const [userError, setUserError] = useState(false);
  const [scaUserError, setScaUserError] = useState(false);

  const tokenLogin = async token => {
    if (userError) {
      setUserError(false);
    }
    try {
      const loggedUser = await Api.login(token);
      setUser(loggedUser);
      setCurrentOffice(loggedUser.orgaoSelecionado);
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
      setCurrentOffice(loggedUser.orgaoSelecionado);
      const storageUser = { timestamp: new Date(), userObj: loggedUser };
      window.localStorage.setItem('sca_token', JSON.stringify(storageUser));
    } catch (e) {
      setScaUserError(true);
    }
  };

  const isStoredUserValid = userString => {
    const userJson = JSON.parse(userString);
    const limitDate = new Date() - 24 * 60 * 60 * 1000;
    const storedDate = +new Date(userJson.timestamp);

    return storedDate > limitDate;
  };

  const autoLogin = (jwt, storedUser) => {
    if (jwt) {
      tokenLogin(jwt);
    } else if (storedUser && isStoredUserValid(storedUser)) {
      const { userObj } = JSON.parse(storedUser);
      setUser(userObj);
      setCurrentOffice(userObj.orgaoSelecionado);
    } else {
      if (storedUser) {
        window.localStorage.removeItem('sca_token');
      }
      setUserError(true);
    }
  };

  return {
    user,
    userError,
    autoLogin,
    currentOffice,
    setCurrentOffice,
    scaUserError,
    tokenLogin,
    scaLogin,
  };
}

function App() {
  const authStore = AuthContextCreator();
  const { user, userError, currentOffice } = authStore;
  const loading = !((user && currentOffice) || userError);

  function onMount() {
    const token = window.localStorage.getItem('access_token');
    const scaToken = window.localStorage.getItem('sca_token');
    authStore.autoLogin(token, scaToken);
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
