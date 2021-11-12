import React, { createContext, useContext, useState } from 'react';
import ApiCreator from '../api/Api';

const AppContext = createContext();

export const AppProvider = ({ store, children }) => (
  <AppContext.Provider value={store}>{children}</AppContext.Provider>
);

export const useAppContext = () => useContext(AppContext);

export function AppStoreInitializer() {
  const Api = ApiCreator();
  const [user, setUser] = useState(null);
  const [autoLoginFailed, setAutoLoginFailed] = useState(false);
  const [appHasCrashed, setAppHasCrashed] = useState(false);
  const [scaLoginFailed, setScaLoginFailed] = useState(false);
  const [userExpired, setUserExpired] = useState(false);
  const [isServerDown, setIsServerDown] = useState(false);


  const loginWithToken = (jwtToken, storedUser) => {
    if (jwtToken) {
      loginWithJwtToken(jwtToken);
    } else if (storedUser) {
      //check if user is valid
      loginWithStoredUser(storedUser);
    } else {
      // no token was available
      setAutoLoginFailed(true);
    }
  };

  const isStoredUserValid = (userString) => {
    const userJson = JSON.parse(userString);
    const limitDate = new Date() - 24 * 60 * 60 * 1000;
    const storedDate = +new Date(userJson.timestamp);

    return storedDate > limitDate;
  };


  const loginWithJwtToken = async (token) => {
    try {
      const loggedUser = await Api.loginWithJwtCredentials(token);
      setUser(loggedUser);
    } catch (e) {
      if (!e.response) {
        setIsServerDown(true);
      } else {
        //setUserError(true);
      }
    }
  };

  const loginWithStoredUser = (storedUser) => {
    if (isStoredUserValid(storedUser)) {
      const { userObj } = JSON.parse(storedUser);
      setUser(userObj);
    } else {
      setUserExpired(true);
      window.localStorage.removeItem('sca_token');
    }

  };

  const loginWithSCACredentials = async (username, password) => {    
    try {        
      const loggedUser = await Api.loginWithSCACredentials(username, password);
      setUser(loggedUser);
      const storageUser = { timestamp: new Date(), userObj: loggedUser };
      window.localStorage.setItem('sca_token', JSON.stringify(storageUser));
    } catch (e){
      setScaLoginFailed(true);
      /* CORS error in the browser makes response opaque - can't distinguish between network error or status  !=ok in browser
        https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors/CORSDidNotSucceed */
 /*      if (!e.response) {
        setIsServerDown(true);
      } else {
        setScaLoginFailed(true);
      } */
    }
  };

  // add backend integration when available
  const logout = () => {
    setUser(undefined);
    window.localStorage.removeItem('sca_token');
    window.localStorage.removeItem('access_token');
    // forces loading screen to login page
    setAutoLoginFailed(true);
  };


  const buildRequestParams = () => ({
    token: user.token,
    orgao: user.orgaoSelecionado.codigo,
    cpf: user.orgaoSelecionado.cpf,
  });


  const updateOffice = (newOffice) => {
    setUser((prevUser) => ({ ...prevUser, orgaoSelecionado: newOffice }));
  };

  return {
    Api,
    appHasCrashed,
    setAppHasCrashed,
    isServerDown,
    user,
    userExpired,
    autoLoginFailed,
    scaLoginFailed,
    loginWithToken,
    loginWithSCACredentials,
    logout,
    buildRequestParams,
    currentOffice: user ? user.orgaoSelecionado : null,
    updateOffice
  };
}
