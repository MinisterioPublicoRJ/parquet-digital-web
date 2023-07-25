import React, { createContext, useContext, useState } from 'react';
import ApiCreator from '../api/Api';
// eslint-disable-next-line import/no-cycle
import { AlertsContext } from '../../web/views/dashboard/sections/Alerts/alertsContext';

const AppContext = createContext();

export function AppProvider({ alertsStore, store, children }) {
  return <AlertsContext.Provider value={alertsStore}> <AppContext.Provider value={store}>{children}</AppContext.Provider></AlertsContext.Provider>
}

export const useAppContext = () => useContext(AppContext);


export function AppStoreInitializer() {
  const [Api, setApi] = useState(ApiCreator());
  const [user, setUser] = useState(null);
  const [autoLoginFailed, setAutoLoginFailed] = useState(false);
  const [appHasCrashed, setAppHasCrashed] = useState(false);
  const [scaLoginFailed, setScaLoginFailed] = useState(false);
  const [userExpired, setUserExpired] = useState(false);
  const [isServerDown, setIsServerDown] = useState(false);
  const [currentOffice, setCurrentOffice] = useState(null);

  const loginWithToken = (jwtToken, storedUser, storedOffice) => {
    if (jwtToken) {
      setApi(ApiCreator(jwtToken));
      loginWithJwtToken(jwtToken);      
    } else if (storedUser) {
      //check if user is valid
      loginWithStoredUser(storedUser, storedOffice);
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
      const {loggedUser, orgaoSelecionado} = await Api.loginWithJwtCredentials(token);
      setUser(loggedUser);
      setCurrentOffice(orgaoSelecionado);
      setApi(ApiCreator(loggedUser.token));
    } catch (e) {
      if (!e.response) {
        setIsServerDown(true);
      } else {
        //setUserError(true);
      }
    }
  };

  const loginWithStoredUser = (storedUser, storedOffice) => {
    if (isStoredUserValid(storedUser)) {
      const { userObj } = JSON.parse(storedUser);
      const currOffice = JSON.parse(storedOffice);
      setApi(ApiCreator(userObj.token));
      setUser(userObj);
      setCurrentOffice(currOffice);
     // Api.addHeaders(userObj.token);
    } else {
      setUserExpired(true);
      window.localStorage.removeItem('sca_token');
      window.localStorage.removeItem('current_office');
    }

  };

  const loginWithSCACredentials = async (username, password) => {    
    try {        
      const {loggedUser, orgaoSelecionado} = await Api.loginWithSCACredentials(username, password);
      setUser(loggedUser);
      setCurrentOffice(orgaoSelecionado);
      const storageUser = { timestamp: new Date(), userObj: loggedUser};
      window.localStorage.setItem('sca_token', JSON.stringify(storageUser));
      window.localStorage.setItem('current_office', JSON.stringify(orgaoSelecionado));
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
    window.localStorage.removeItem('current_office');
    // forces loading screen to login page
    setAutoLoginFailed(true);
  };


  const buildRequestParams = () => ({
    token: user.token,
    orgao: currentOffice.codigo,
    cpf: currentOffice.cpf,
  });


  const updateOffice = (newOffice) => {
    setCurrentOffice(newOffice);
    window.localStorage.setItem('current_office', JSON.stringify(newOffice));
  };

  return {
    Api,
    appHasCrashed,
    setAppHasCrashed,
    isServerDown,
    user,
    userExpired,
    autoLoginFailed,
    setScaLoginFailed,
    scaLoginFailed,
    loginWithToken,
    loginWithSCACredentials,
    logout,
    buildRequestParams,
    currentOffice,
    updateOffice
  };
}
