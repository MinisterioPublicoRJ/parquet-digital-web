import React, { createContext, useContext, useState } from 'react';
import ApiCreator from '../api/Api';

const AppContext = createContext();

export const AppProvider = ({ store, children }) => (
  <AppContext.Provider value={store}>{children}</AppContext.Provider>
);

export const useAppContext = () => useContext(AppContext);

export function AppStoreInitializer() {
  const Api = ApiCreator();
  const [user, setUser] = useState(false);
  const [autoLoginFailed, setAutoLoginFailed] = useState(false);
  const [appHasCrashed, setAppHasCrashed] = useState(false);
  const [scaLoginFailed, setScaLoginFailed] = useState(false);
  const [userExpired, setUserExpired] = useState(false);


  const loginWithToken = (jwtToken, storedUser) => {
    console.log("loginwithtoken, jwt: ", jwtToken, "storeduser: ", storedUser);
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
        //setIsServerDown(true);
      } else {
        //setUserError(true);
      }
    }
  };

  const loginWithStoredUser = (storedUser) => {
    console.log('loggin in with stored user \n\n\n\n\n');
    if (isStoredUserValid(storedUser)) {
      console.log('storeduser is valid: ', storedUser);
      const { userObj } = JSON.parse(storedUser);
      setUser(userObj);
    } else {
      setUserExpired(true);
      window.localStorage.removeItem('sca_token');
    }

  };

  const loginWithSCACredentials = async (username, password) => {    
    const loggedUser = await Api.loginWithSCACredentials(username, password);
    console.log('\n\n\n\nlogged user: ', loggedUser, '\n\n\n\n\n\n\n\n\n\n');
    setUser(loggedUser);
    const storageUser = { timestamp: new Date(), userObj: loggedUser };
    window.localStorage.setItem('sca_token', JSON.stringify(storageUser));
    //setScaLoginFailed(true);
  };

  return {
    Api,
    appHasCrashed,
    setAppHasCrashed,

    user,
    userExpired,

    autoLoginFailed,
    scaLoginFailed,
    loginWithToken,
    loginWithSCACredentials,
  };
}
