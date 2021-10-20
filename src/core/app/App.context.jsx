import React, { createContext, useContext, useState } from 'react';
import ApiCreator from '../api/Api';

const AppContext = createContext();

export const AppProvider = ({ store, children }) => (
  <AppContext.Provider value={store}>{children}</AppContext.Provider>
);

export const useAppContext = () => useContext(AppContext);

export function AppStoreInitializer() {
  const Api = ApiCreator();
  const [user, setUser] = useState(true);
  const [autoLoginFailed, setAutoLoginFailed] = useState(false);
  const [appHasCrashed, setAppHasCrashed] = useState(false);
  const [scaLoginFailed, setScaLoginFailed] = useState(false);

  const loginWithToken = (jwtToken, storedUser) => {
    if (jwtToken) {
      loginWithJtwToken(jwtToken);
    } else if (storedUser) {
      //check if user is valid
      loginWithStoredUser(storedUser);
    } else {
      // no token was available
      setAutoLoginFailed(true);
    }
  };

  const loginWithJtwToken = () => {};

  const loginWithStoredUser = () => {};

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

    autoLoginFailed,
    scaLoginFailed,
    loginWithToken,
    loginWithSCACredentials,
  };
}
