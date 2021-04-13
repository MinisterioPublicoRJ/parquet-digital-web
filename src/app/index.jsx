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
  const [userExpired, setUserExpired] = useState(false);
  const [isServerDown, setIsServerDown] = useState(false);

  const tokenLogin = async (token) => {
    if (userError) {
      setUserError(false);
    }
    try {
      const loggedUser = await Api.login(token);
      setUser(loggedUser);
    } catch (e) {
      if (!e.response) {
        setIsServerDown(true);
      } else {
        setUserError(true);
      }
    }
  };

  const scaLogin = async (username, password) => {
    if (scaUserError) {
      setScaUserError(false);
    }
    if (userExpired) {
      setUserExpired(false);
    }
    try {
      const loggedUser = await Api.scaLogin(username, password);
      setUser(loggedUser);
      const storageUser = { timestamp: new Date(), userObj: loggedUser };
      window.localStorage.setItem('sca_token', JSON.stringify(storageUser));
    } catch (e) {
      setScaUserError(true);
      // if(!e.response) {
      //   setIsServerDown(true);
      // }
      // else {
      //   setScaUserError(true);
      // }
    }
  };

  const isStoredUserValid = (userString) => {
    const userJson = JSON.parse(userString);
    const limitDate = new Date() - 24 * 60 * 60 * 1000;
    // REMOVE ON NEXT DEPLOY, THIS IS SUPPOSED TO BE A ONE TIME HOTFIX
    const resetDate = new Date(2021, 2, 5);
    const storedDate = +new Date(userJson.timestamp);

    return storedDate > limitDate && storedDate > resetDate;
  };

  const autoLogin = (jwt, storedUser) => {
    if (jwt) {
      tokenLogin(jwt);
    } else if (storedUser && isStoredUserValid(storedUser)) {
      const { userObj } = JSON.parse(storedUser);
      setUser(userObj);
    } else {
      if (storedUser) {
        setUserExpired(true);
        window.localStorage.removeItem('sca_token');
      }
      setUserError(true);
    }
  };

  const updateOffice = (newOffice) => {
    setUser((prevUser) => ({ ...prevUser, orgaoSelecionado: newOffice }));
  };

  const buildRequestParams = () => ({
    token: user.token,
    orgao: user.orgaoSelecionado.codigo,
    cpf: user.orgaoSelecionado.cpf,
  });

  // add backend integration when available
  const logout = () => {
    setUser(undefined);
    setUserError(true);
    window.localStorage.removeItem('sca_token');
    window.localStorage.removeItem('access_token');
  };

  return {
    user,
    userError,
    userExpired,
    autoLogin,
    currentOffice: user ? user.orgaoSelecionado : null,
    updateOffice,
    scaUserError,
    tokenLogin,
    scaLogin,
    buildRequestParams,
    logout,
    isServerDown,
  };
}

function App() {
  const authStore = AuthContextCreator();
  const { user, userError, isServerDown } = authStore;

  function onMount() {
    const token = window.localStorage.getItem('access_token');
    const scaToken = window.localStorage.getItem('sca_token');
    authStore.autoLogin(token, scaToken);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(onMount, []);

  if (!isServerDown && !user && !userError) {
    return <Spinner size="large" />;
  }

  return (
    <AuthContext.Provider value={authStore}>
      <Router />
    </AuthContext.Provider>
  );
}

export default App;
